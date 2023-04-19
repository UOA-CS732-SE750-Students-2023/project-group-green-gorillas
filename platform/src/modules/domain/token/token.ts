import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export class Token {
  public readonly userId: UUID;

  public readonly value: string;

  public type: TokenType;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly expiryDate: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  constructor(
    userId: UUID,
    value: string,
    type: TokenType,
    expiryDate: DateTime,
  ) {
    this.userId = userId;
    this.value = value;
    this.expiryDate = expiryDate;
    this.type = type;
    this.createdAt = DateTime.now();
  }
}
