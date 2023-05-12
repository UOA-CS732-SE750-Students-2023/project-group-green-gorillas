import { HttpStatus, Injectable } from '@nestjs/common';
import { BoardNoteRepository } from './board-note.repository';
import { BoardNote, BoardNoteColor, BoardNoteType } from './board-note';
import { UUID } from '../../../types/uuid.type';
import { BoardNoteFactory } from './board-note.factory';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class BoardNoteService {
  constructor(private readonly boardNoteRepository: BoardNoteRepository) {}

  public listByBoardId(boardId: UUID): Promise<BoardNote[]> {
    return this.boardNoteRepository.listByBoardId(boardId);
  }

  public save(boardNote: BoardNote): Promise<BoardNote> {
    return this.boardNoteRepository.save(boardNote);
  }

  public create(
    boardSectionId: UUID,
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    note: string,
    createdBy: UUID,
    type: BoardNoteType,
    parentId: UUID | null,
    color: BoardNoteColor,
  ): Promise<BoardNote> {
    return this.boardNoteRepository.save(
      BoardNoteFactory.create(
        boardSectionId,
        boardId,
        organisationId,
        teamId,
        note,
        createdBy,
        type,
        parentId,
        color,
      ),
    );
  }

  public delete(id: UUID): Promise<void> {
    return this.boardNoteRepository.delete(id);
  }

  public getById(id: UUID): Promise<BoardNote | undefined> {
    return this.boardNoteRepository.getById(id);
  }

  public async getByIdOrThrow(id: UUID): Promise<BoardNote> {
    const boardNote = await this.getById(id);

    if (!boardNote) {
      throw new InternalException(
        'BOARD_NOTE.NOT_FOUND',
        'board note is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return boardNote;
  }

  public async updateNote(id: UUID, note: string): Promise<BoardNote> {
    const boardNote = await this.getByIdOrThrow(id);

    boardNote.updateNote(note);

    return this.boardNoteRepository.save(boardNote);
  }

  public async assignNoteGroup(
    id: UUID,
    parentId: UUID,
    boardSectionId: UUID,
  ): Promise<BoardNote> {
    const boardNote = await this.getByIdOrThrow(id);

    boardNote.updateParentId(parentId);

    boardNote.updateBoardSectionId(boardSectionId);

    return this.boardNoteRepository.save(boardNote);
  }

  public async unAssignNoteGroup(
    id: UUID,
    boardSectionId: UUID,
  ): Promise<BoardNote> {
    const boardNote = await this.getByIdOrThrow(id);

    boardNote.updateParentId(null);

    boardNote.updateBoardSectionId(boardSectionId);

    return this.boardNoteRepository.save(boardNote);
  }
}
