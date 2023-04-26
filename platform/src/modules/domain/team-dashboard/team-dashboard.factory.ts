import { TeamDashboard } from './team-dashboard';
import { UUID } from '../../../types/uuid.type';

export class TeamDashboardFactory {
  static create(teamId: UUID, organisationId: UUID): TeamDashboard {
    return new TeamDashboard(teamId, organisationId);
  }
}
