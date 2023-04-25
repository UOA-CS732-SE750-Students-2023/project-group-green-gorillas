import { Injectable } from '@nestjs/common';
import { TeamService as TeamDomainService } from '../../domain/team/team.service';
import { UUID } from '../../../types/uuid.type';
import { UserTeamService } from '../../domain/user-team/user-team.service';
import { UserService } from '../../domain/user/user.service';
import { RequestUserType } from '../../../utils/decorators/request-user';
import { User, UserRole } from '../../domain/user/user';
import * as Bluebird from 'bluebird';

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
}
