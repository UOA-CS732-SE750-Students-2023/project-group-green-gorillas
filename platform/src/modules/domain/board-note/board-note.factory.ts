import { UUID } from '../../../types/uuid.type';
import { BoardNote, BoardNoteType } from './board-note';

export class BoardNoteFactory {
  static create(
    boardSectionId: UUID,
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    note: string,
    createdBy: UUID,
    type: BoardNoteType,
    parentId: UUID | null,
  ): BoardNote {
    return new BoardNote(
      boardSectionId,
      boardId,
      organisationId,
      teamId,
      note,
      createdBy,
      type,
      parentId,
    );
  }
}
