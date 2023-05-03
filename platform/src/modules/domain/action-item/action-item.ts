import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export enum ActionItemStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class ActionItem {
  public readonly id: UUID;

  public readonly teamId: UUID;

  public readonly organisationId: UUID;

  public readonly boardId: UUID;

  public note: string;

  public status: ActionItemStatus;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  public readonly createdBy: UUID;

  public updatedBy: UUID;

  constructor(
    teamId: UUID,
    organisationId: UUID,
    boardId: UUID,
    note: string,
    createdBy: UUID,
  ) {
    this.id = uuid();
    this.teamId = teamId;
    this.organisationId = organisationId;
    this.boardId = boardId;
    this.note = note;
    this.status = ActionItemStatus.IN_PROGRESS;
    this.updatedAt = DateTime.now();
    this.createdAt = DateTime.now();
    this.createdBy = createdBy;
    this.updatedBy = createdBy;
  }

  public updateNote(note: string, updatedBy: UUID): void {
    this.note = note;
    this.updatedAt = DateTime.now();
    this.updatedBy = updatedBy;
  }

  public updateStatus(status: ActionItemStatus, updatedBy: UUID): void {
    this.status = status;
    this.updatedAt = DateTime.now();
    this.updatedBy = updatedBy;
  }
}
