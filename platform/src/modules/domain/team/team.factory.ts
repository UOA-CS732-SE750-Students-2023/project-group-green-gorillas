import { Team } from './team';
import { UUID } from '../../../types/uuid.type';

export class TeamFactory {
  static create(organisationId: UUID, name: string): Team {
    return new Team(organisationId, name);
  }
}
