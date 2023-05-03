import { UUID } from '../../../types/uuid.type';
import { DateTime } from 'luxon';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { uuid } from '../../../utils/uuid/uuid';

export class BoardNoteVote {
  public readonly id: UUID;

  public readonly userId: UUID;

  public readonly boardNoteId: UUID;

  public readonly boardId: UUID;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  constructor(userId: UUID, boardNoteId: UUID, boardId: UUID) {
    this.id = uuid();
    this.userId = userId;
    this.boardNoteId = boardNoteId;
    this.boardId = boardId;
    this.createdAt = DateTime.now();
  }
}
