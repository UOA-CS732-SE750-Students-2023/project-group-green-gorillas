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
import { TeamDashboardService } from '../../domain/team-dashboard/team-dashboard.service';
import { TeamDashboard } from '../../domain/team-dashboard/team-dashboard';
import { BoardService } from '../../domain/board/board.service';
import { BoardStage } from '../../domain/board/board';
import * as _ from 'lodash';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamDomainService: TeamDomainService,
    private readonly userTeamService: UserTeamService,
    private readonly userService: UserService,
    private readonly teamDashboardService: TeamDashboardService,
    private readonly boardService: BoardService,
  ) {}

  private async getTeamRemembers(teamId: UUID, organisationId: UUID) {
    const userTeams = await this.userTeamService.listByTeamId(
      teamId,
      organisationId,
    );

    const users = await Bluebird.map(userTeams, async (userTeam) => {
      const user = await this.userService.getById(
        userTeam.userId,
        userTeam.organisationId,
      );

      if (!user) return null;

      return {
        ...user,
        role: userTeam.role,
      };
    });

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
    const teams = await this.teamDomainService.listByOrganisationId(
      organisationId,
    );

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

  public async addTeam(name: string, organisationId: UUID) {
    return this.teamDomainService.create(organisationId, name);
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

  public getTeamInsight(
    teamId: UUID,
    organisationId: UUID,
  ): Promise<TeamDashboard> {
    return this.teamDashboardService.getByTeamId(teamId, organisationId);
  }

  public async hasInProgressRetro(teamId: UUID): Promise<boolean> {
    const boards = await this.boardService.listByTeamId(teamId);

    return !!boards.find((board) => board.stage !== BoardStage.FINALIZE);
  }

  public async getInProgressRetro(teamId: UUID) {
    const boards = await this.boardService.listByTeamId(teamId);

    const inProgressRetros = boards.filter(
      (board) => board.stage !== BoardStage.FINALIZE,
    );

    const inProgressRetrosWithCreatedByUser = await Bluebird.map(
      inProgressRetros,
      async (retro) => {
        const user = await this.userService.getById(
          retro.createdBy,
          retro.organisationId,
        );

        return {
          ...retro,
          createdByUser: user ?? null,
        };
      },
    );

    return _.first(inProgressRetrosWithCreatedByUser) ?? null;
  }

  public async getTeamRetroHistory(teamId: UUID) {
    const boards = await this.boardService.listByTeamId(teamId);

    return boards.filter((board) => board.stage === BoardStage.FINALIZE);
  }
}
