import { HttpStatus, Injectable } from '@nestjs/common';
import { BoardNoteVoteRepository } from './board-note-vote.repository';
import { UUID } from '../../../types/uuid.type';
import { BoardNoteVote } from './board-note-vote';
import { BoardNoteVoteFactory } from './board-note-vote.factory';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class BoardNoteVoteService {
  constructor(
    private readonly boardNoteVoteRepository: BoardNoteVoteRepository,
  ) {}

  public async listByBoardId(boardId: UUID): Promise<BoardNoteVote[]> {
    return this.boardNoteVoteRepository.listByBoardId(boardId);
  }

  public create(
    userId: UUID,
    boardNoteId: UUID,
    boardId: UUID,
  ): Promise<BoardNoteVote> {
    return this.boardNoteVoteRepository.save(
      BoardNoteVoteFactory.create(userId, boardNoteId, boardId),
    );
  }

  public getById(
    boardNoteId: UUID,
    userId: UUID,
  ): Promise<BoardNoteVote | undefined> {
    return this.boardNoteVoteRepository.getById(boardNoteId, userId);
  }

  public async getByIdOrThrow(
    boardNoteId: UUID,
    userId: UUID,
  ): Promise<BoardNoteVote> {
    const vote = await this.getById(boardNoteId, userId);

    if (!vote) {
      throw new InternalException(
        'BOARD_NOTE_VOTE.NOT_FOUND',
        'board note vote is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return vote;
  }

  public delete(boardNoteId: UUID, userId: UUID): Promise<void> {
    return this.boardNoteVoteRepository.delete(boardNoteId, userId);
  }
}
