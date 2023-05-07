import { BoardTimeInvest, BoardTimeInvestRate } from './board-time-invest';
import { UUID } from '../../../types/uuid.type';

export class BoardTimeInvestFactory {
  static create(
    boardId: UUID,
    userId: UUID,
    organisationId: UUID,
    rate: BoardTimeInvestRate,
  ) {
    return new BoardTimeInvest(boardId, userId, organisationId, rate);
  }
}
