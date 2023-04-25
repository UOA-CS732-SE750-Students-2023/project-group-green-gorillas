import { Injectable } from '@nestjs/common';
import { TeamService as TeamDomainService } from '../../domain/team/team.service';
import { UUID } from '../../../types/uuid.type';
import { UserTeamService } from '../../domain/user-team/user-team.service';
import { UserService } from '../../domain/user/user.service';
import { RequestUserType } from '../../../utils/decorators/request-user';
import { User, UserRole } from '../../domain/user/user';
import * as Bluebird from 'bluebird';
import { Team } from '../../domain/team/team';
import { UserTeam, UserTeamRole } from '../../domain/user-team/user-team';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamDomainService: TeamDomainService,
    private readonly userTeamService: UserTeamService,
    private readonly userService: UserService,
  ) {}

  private async getTeamRemembers(
    teamId: UUID,
    organisationId: UUID,
  ): Promise<User[]> {
    const userTeams = await this.userTeamService.listByTeamId(
      teamId,
      organisationId,
    );

    const users = await Promise.all(
      userTeams.map((userTeam) =>
        this.userService.getById(userTeam.userId, userTeam.organisationId),
      ),
    );

    return users.filter((user) => !!user);
  }

  public async getUserTeamById(
    teamId: UUID,
    organisationId: UUID,
    user: RequestUserType,
  ) {
    const team = await this.teamDomainService.getByIdOrThrow(
      teamId,
      organisationId,
    );

    if (user.role !== UserRole.ADMIN) {
      // validate current user is in the current team or not
      await this.userTeamService.getByIdOrThrow(user.id, team.id);
    }

    const teamMembers = await this.getTeamRemembers(teamId, organisationId);

    return {
      ...team,
      teamMembers,
    };
  }

  public async getOrganisationTeams(organisationId: UUID) {
    const teams = this.teamDomainService.listByOrganisationId(organisationId);

    return Bluebird.map(teams, async (team) => {
      const teamMembers = await this.getTeamRemembers(
        team.id,
        team.organisationId,
      );

      return {
        ...team,
        teamMembers,
      };
    });
  }

  public async updateTeam(
    teamId: UUID,
    organisationId: UUID,
    name: string,
    active: boolean,
  ) {
    return this.teamDomainService.update(teamId, organisationId, name, active);
  }

  public async updateTeamActive(
    teamId: UUID,
    organisationId: UUID,
    active: boolean,
  ): Promise<Team> {
    if (active) {
      return this.teamDomainService.activate(teamId, organisationId);
    }

    return this.teamDomainService.disable(teamId, organisationId);
  }

  public async addOrUpdateTeamUser(
    teamId: UUID,
    organisationId: UUID,
    newTeamUserId: UUID,
    newTeamUserRole: UserTeamRole,
  ): Promise<void> {
    const [team, user] = await Promise.all([
      this.teamDomainService.getByIdOrThrow(teamId, organisationId),
      this.userService.getByIdOrThrow(newTeamUserId, organisationId),
    ]);

    await this.userTeamService.create(
      user.id,
      team.id,
      team.organisationId,
      newTeamUserRole,
    );
  }

  public removeTeamUser(userId: UUID, teamId: UUID): Promise<void> {
    return this.userTeamService.delete(userId, teamId);
  }

  public getTeamRole(userId: UUID, teamId: UUID): Promise<UserTeam> {
    return this.userTeamService.getByIdOrThrow(userId, teamId);
  }
}
