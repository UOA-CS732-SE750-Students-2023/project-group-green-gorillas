import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export enum BoardStage {
  THINK = 'Think',
  GROUP = 'Group',
  VOTE = 'Vote',
  DISCUSS = 'Discuss',
  REVIEW = 'Review',
  FINALIZE = 'FINALIZE',
}

export class Board {
  public readonly id: UUID;

  public readonly organisationId: UUID;

  public readonly teamId: UUID;

  public name: string;

  public stage: BoardStage;

  public readonly createdBy: UUID;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  constructor(
    name: string,
    organisationId: UUID,
    teamId: UUID,
    createdBy: UUID,
  ) {
    this.id = uuid();
    this.organisationId = organisationId;
    this.teamId = teamId;
    this.name = name;
    this.stage = BoardStage.THINK;
    this.updatedAt = DateTime.now();
    this.createdAt = DateTime.now();
    this.createdBy = createdBy;
  }

  public updateName(name: string): void {
    this.name = name;
  }
}
