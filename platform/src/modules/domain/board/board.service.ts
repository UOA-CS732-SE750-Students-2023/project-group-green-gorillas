import { HttpStatus, Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { Board } from './board';
import { UUID } from '../../../types/uuid.type';
import { BoardFactory } from './board.factory';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  public save(board: Board): Promise<Board> {
    return this.boardRepository.save(board);
  }

  public create(
    name: string,
    organisationId: UUID,
    teamId: UUID,
    createdBy: UUID,
  ): Promise<Board> {
    return this.boardRepository.save(
      BoardFactory.create(name, organisationId, teamId, createdBy),
    );
  }

  public getById(id: UUID, teamId: UUID): Promise<Board | undefined> {
    return this.boardRepository.getById(id, teamId);
  }

  public async getByIdOrThrow(id: UUID, teamId: UUID): Promise<Board> {
    const board = await this.getById(id, teamId);

    if (!board) {
      throw new InternalException(
        'BOARD.NOT_FOUND',
        'board is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return board;
  }

  public async updateName(
    id: UUID,
    teamId: UUID,
    name: string,
  ): Promise<Board> {
    const board = await this.getByIdOrThrow(id, teamId);

    board.updateName(name);

    return this.save(board);
  }

  public async deleteBoard(id: UUID, teamId: UUID): Promise<Board> {
    const board = await this.getByIdOrThrow(id, teamId);

    board.updateActive(false);

    return this.save(board);
  }
}
