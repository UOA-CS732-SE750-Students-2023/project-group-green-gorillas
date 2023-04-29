import { HttpStatus, Injectable } from '@nestjs/common';
import { BoardNoteRepository } from './board-note.repository';
import { BoardNote } from './board-note';
import { UUID } from '../../../types/uuid.type';
import { BoardNoteFactory } from './board-note.factory';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class BoardNoteService {
  constructor(private readonly boardNoteRepository: BoardNoteRepository) {}

  public listByBoardId(boardId: UUID): Promise<BoardNote[]> {
    return this.boardNoteRepository.listByBoardId(boardId);
  }

  public create(
    boardSectionId: UUID,
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    note: string,
    createdBy: UUID,
  ): Promise<BoardNote> {
    return this.boardNoteRepository.save(
      BoardNoteFactory.create(
        boardSectionId,
        boardId,
        organisationId,
        teamId,
        note,
        createdBy,
      ),
    );
  }

  public delete(id: UUID, boardSectionId: UUID): Promise<void> {
    return this.boardNoteRepository.delete(id, boardSectionId);
  }

  public getById(
    id: UUID,
    boardSectionId: UUID,
  ): Promise<BoardNote | undefined> {
    return this.boardNoteRepository.getById(id, boardSectionId);
  }

  public async getByIdOrThrow(
    id: UUID,
    boardSectionId: UUID,
  ): Promise<BoardNote> {
    const boardNote = await this.getById(id, boardSectionId);

    if (!boardNote) {
      throw new InternalException(
        'BOARD_NOTE.NOT_FOUND',
        'board note is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return boardNote;
  }

  public async updateNote(
    id: UUID,
    boardSectionId: UUID,
    note: string,
  ): Promise<BoardNote> {
    const boardNote = await this.getByIdOrThrow(id, boardSectionId);

    boardNote.updateNote(note);

    return this.boardNoteRepository.save(boardNote);
  }
}
