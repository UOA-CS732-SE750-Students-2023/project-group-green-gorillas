import { Board } from './board';
import { UUID } from '../../../types/uuid.type';

export class BoardFactory {
  static create(
    name: string,
    organisationId: UUID,
    teamId: UUID,
    createdBy: UUID,
  ): Board {
    return new Board(name, organisationId, teamId, createdBy);
  }
}
