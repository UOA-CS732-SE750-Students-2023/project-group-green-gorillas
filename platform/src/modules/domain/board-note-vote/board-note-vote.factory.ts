import { UUID } from '../../../types/uuid.type';
import { BoardNoteVote } from './board-note-vote';

export class BoardNoteVoteFactory {
  static create(userId: UUID, boardNoteId: UUID, boardId: UUID): BoardNoteVote {
    return new BoardNoteVote(userId, boardNoteId, boardId);
  }
}
