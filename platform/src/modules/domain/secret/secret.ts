import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';

export enum SecretType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export class Secret {
  public readonly userId: UUID;

  public readonly value: string;

  public type: SecretType;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly expiryDate: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  constructor(
    userId: UUID,
    value: string,
    type: SecretType,
    expiryDate: DateTime,
  ) {
    this.userId = userId;
    this.value = value;
    this.expiryDate = expiryDate;
    this.type = type;
    this.createdAt = DateTime.now();
  }
}
