import { UserTeam, UserTeamRole } from './user-team';
import { UUID } from '../../../types/uuid.type';

export class UserTeamFactory {
  static create(
    userId: UUID,
    teamId: UUID,
    organisationId: UUID,
    role: UserTeamRole,
  ): UserTeam {
    return new UserTeam(userId, teamId, organisationId, role);
  }
}
