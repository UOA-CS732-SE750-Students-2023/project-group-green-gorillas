import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export class BoardNote {
  public readonly id: UUID;

  public readonly boardSectionId: UUID;

  public readonly boardId: UUID;

  public readonly organisationId: UUID;

  public readonly teamId: UUID;

  public note: string;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  public readonly createdBy: UUID;

  constructor(
    boardSectionId: UUID,
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    note: string,
    createdBy: UUID,
  ) {
    this.id = uuid();
    this.boardSectionId = boardSectionId;
    this.boardId = boardId;
    this.organisationId = organisationId;
    this.teamId = teamId;
    this.note = note;
    this.createdBy = createdBy;
  }
}
