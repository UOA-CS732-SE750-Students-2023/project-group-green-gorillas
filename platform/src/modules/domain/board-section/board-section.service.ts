import { Injectable } from '@nestjs/common';
import { BoardSectionRepository } from './board-section.repository';
import { BoardSection } from './board-section';
import { BoardSectionFactory } from './board-section.factory';
import { UUID } from '../../../types/uuid.type';

@Injectable()
export class BoardSectionService {
  constructor(
    private readonly boardSectionRepository: BoardSectionRepository,
  ) {}

  public listByBoardId(boardId: UUID): Promise<BoardSection[]> {
    return this.boardSectionRepository.listByBoardId(boardId);
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
