import { Injectable } from '@nestjs/common';
import { TeamDashboardRepository } from './team-dashboard.repository';
import { UUID } from '../../../types/uuid.type';
import { TeamDashboard } from './team-dashboard';
import { TeamDashboardFactory } from './team-dashboard.factory';

@Injectable()
export class TeamDashboardService {
  constructor(
    private readonly teamDashboardRepository: TeamDashboardRepository,
  ) {}

  public async getByTeamId(
    teamId: UUID,
    organisationId: UUID,
  ): Promise<TeamDashboard> {
    const teamDashboard = await this.teamDashboardRepository.getById(
      teamId,
      organisationId,
    );

    if (!teamDashboard) return this.create(teamId, organisationId);

    return teamDashboard;
  }

  public async create(
    teamId: UUID,
    organisationId: UUID,
  ): Promise<TeamDashboard> {
    return this.teamDashboardRepository.save(
      TeamDashboardFactory.create(teamId, organisationId),
    );
  }
}
