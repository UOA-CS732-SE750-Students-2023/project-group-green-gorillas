import { Injectable } from '@nestjs/common';
import { UserTeamService } from '../../domain/user-team/user-team.service';
import { TeamService } from '../../domain/team/team.service';
import { UUID } from '../../../types/uuid.type';
import { Team } from '../../domain/team/team';

@Injectable()
export class UserService {
  constructor(
    private readonly userTeamService: UserTeamService,
    private readonly teamService: TeamService,
  ) {}

  public async getActiveUserTeams(userId: UUID): Promise<Team[]> {
    const userTeams = await this.userTeamService.listByUserId(userId);

    const teams = await Promise.all(
      userTeams.map((userTeam) =>
        this.teamService.getById(userTeam.teamId, userTeam.organisationId),
      ),
    );

    return teams.filter((team) => !!team && team.active);
  }
}
