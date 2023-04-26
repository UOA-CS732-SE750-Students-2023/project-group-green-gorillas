import { UUID } from '../../../types/uuid.type';
import { BoardNote } from './board-note';

export class BoardNoteFactory {
  static create(
    boardSectionId: UUID,
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    note: string,
    createdBy: UUID,
  ): BoardNote {
    return new BoardNote(
      boardSectionId,
      boardId,
      organisationId,
      teamId,
      note,
      createdBy,
    );
  }
}
