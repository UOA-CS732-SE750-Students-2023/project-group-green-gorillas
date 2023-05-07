import { UUID } from '../../../types/uuid.type';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { Type } from 'class-transformer';
import { DateTime } from 'luxon';

export enum BoardTimeInvestRate {
  LEVEL_ONE = 1,
  LEVEL_TWO,
  LEVEL_THREE,
  LEVEL_FOUR,
  LEVEL_FIVE,
}

export class BoardTimeInvest {
  public readonly userId: UUID;

  public readonly boardId: UUID;

  public readonly organisationId: UUID;

  public readonly rate: BoardTimeInvestRate;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  private readonly createdAt: DateTime;

  constructor(
    boardId: UUID,
    userId: UUID,
    organisationId: UUID,
    rate: BoardTimeInvestRate,
  ) {
    this.boardId = boardId;
    this.userId = userId;
    this.organisationId = organisationId;
    this.rate = rate;
    this.createdAt = DateTime.now();
  }
}
