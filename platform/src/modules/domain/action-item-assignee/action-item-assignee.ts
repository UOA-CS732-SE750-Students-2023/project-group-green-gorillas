import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';

export class ActionItemAssignee {
  public readonly userId: UUID;

  public readonly actionItemId: UUID;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  constructor(userId: UUID, actionItemId: UUID) {
    this.userId = userId;
    this.actionItemId = actionItemId;
    this.createdAt = DateTime.now();
  }
}
