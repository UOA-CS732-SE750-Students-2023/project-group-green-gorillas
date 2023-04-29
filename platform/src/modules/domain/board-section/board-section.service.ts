import { HttpStatus, Injectable } from '@nestjs/common';
import { BoardSectionRepository } from './board-section.repository';
import { BoardSection } from './board-section';
import { BoardSectionFactory } from './board-section.factory';
import { UUID } from '../../../types/uuid.type';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class BoardSectionService {
  constructor(
    private readonly boardSectionRepository: BoardSectionRepository,
  ) {}

  public listByBoardId(boardId: UUID): Promise<BoardSection[]> {
    return this.boardSectionRepository.listByBoardId(boardId);
  }

  public delete(id: UUID, boardId: UUID): Promise<void> {
    return this.boardSectionRepository.delete(id, boardId);
  }

  public getById(id: UUID, boardId: UUID): Promise<BoardSection | undefined> {
    return this.boardSectionRepository.getById(id, boardId);
  }

  public async getByIdOrThrow(id: UUID, boardId: UUID): Promise<BoardSection> {
    const boardSection = await this.getById(id, boardId);

    if (!boardSection) {
      throw new InternalException(
        'BOARD_SECTION.NOT_FOUND',
        'board section is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return boardSection;
  }

  public async updateName(
    id: UUID,
    boardId: UUID,
    name: string,
  ): Promise<BoardSection> {
    const boardSection = await this.getByIdOrThrow(id, boardId);

    boardSection.updateName(name);

    return this.boardSectionRepository.save(boardSection);
  }

  public async updateDescription(
    id: UUID,
    boardId: UUID,
    description: string,
  ): Promise<BoardSection> {
    const boardSection = await this.getByIdOrThrow(id, boardId);

    boardSection.updateDescription(description);

    return this.boardSectionRepository.save(boardSection);
  }

  public create(
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    name: string,
    description: string,
    order: number,
    createdBy: UUID,
  ): Promise<BoardSection> {
    return this.boardSectionRepository.save(
      BoardSectionFactory.create(
        boardId,
        organisationId,
        teamId,
        name,
        description,
        order,
        createdBy,
      ),
    );
  }
}
