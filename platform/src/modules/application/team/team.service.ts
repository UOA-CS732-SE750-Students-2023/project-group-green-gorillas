import { Injectable } from '@nestjs/common';
import { TeamService as TeamDomainService } from '../../domain/team/team.service';
import { UUID } from '../../../types/uuid.type';
import { UserTeamService } from '../../domain/user-team/user-team.service';
import { UserService } from '../../domain/user/user.service';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamService: TeamDomainService,
    private readonly userTeamService: UserTeamService,
    private readonly userService: UserService,
  ) {}

  public async getTeamById(teamId: UUID, organisationId: UUID, userId: UUID) {
    const team = await this.teamService.getByIdOrThrow(teamId, organisationId);

    // validate current user is in the current team or not
    await this.userTeamService.getByIdOrThrow(userId, team.id);

    const userTeams = await this.userTeamService.listByTeamId(
      teamId,
      organisationId,
    );

    const users = await Promise.all(
      userTeams.map((userTeam) =>
        this.userService.getById(userTeam.userId, userTeam.organisationId),
      ),
    );

    return {
      ...team,
      teamMembers: users.filter((user) => !!user),
    };
  }
}
