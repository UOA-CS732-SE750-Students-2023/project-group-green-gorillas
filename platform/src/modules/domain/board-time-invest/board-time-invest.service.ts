import { Injectable } from '@nestjs/common';
import { BoardTimeInvestRepository } from './board-time-invest.repository';
import { UUID } from '../../../types/uuid.type';
import { BoardTimeInvest, BoardTimeInvestRate } from './board-time-invest';
import { BoardTimeInvestFactory } from './board-time-invest.factory';

@Injectable()
export class BoardTimeInvestService {
  constructor(
    private readonly boardTimeInvestRepository: BoardTimeInvestRepository,
  ) {}

  public create(
    boardId: UUID,
    userId: UUID,
    organisationId: UUID,
    teamId: UUID,
    rate: BoardTimeInvestRate,
  ): Promise<BoardTimeInvest> {
    return this.boardTimeInvestRepository.save(
      BoardTimeInvestFactory.create(
        boardId,
        userId,
        organisationId,
        teamId,
        rate,
      ),
    );
  }

  public listByBoardId(boardId: UUID): Promise<BoardTimeInvest[]> {
    return this.boardTimeInvestRepository.listByBoardId(boardId);
  }

  public listByTeamId(teamId: UUID): Promise<BoardTimeInvest[]> {
    return this.boardTimeInvestRepository.listByTeamId(teamId);
  }
}
