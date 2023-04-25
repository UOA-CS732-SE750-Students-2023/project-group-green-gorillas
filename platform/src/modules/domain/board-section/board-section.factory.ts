import { UUID } from '../../../types/uuid.type';
import { BoardSection } from './board-section';

export class BoardSectionFactory {
  static create(
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    name: string,
    description: string,
    order: number,
    createdBy: UUID,
  ): BoardSection {
    return new BoardSection(
      boardId,
      organisationId,
      teamId,
      name,
      description,
      order,
      createdBy,
    );
  }
}
