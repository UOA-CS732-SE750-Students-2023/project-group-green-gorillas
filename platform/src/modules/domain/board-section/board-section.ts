import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export class BoardSection {
  public readonly id: UUID;

  public readonly boardId: UUID;

  public readonly organisationId: UUID;

  public readonly teamId: UUID;

  public name: string;

  // TODO: color

  public description: string;

  public order: number;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  public readonly createdBy: UUID;

  constructor(
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    name: string,
    description: string,
    order: number,
    createdBy: UUID,
  ) {
    this.id = uuid();
    this.boardId = boardId;
    this.organisationId = organisationId;
    this.teamId = teamId;
    this.name = name;
    this.description = description;
    this.order = order;
    this.updatedAt = DateTime.now();
    this.createdAt = DateTime.now();
    this.createdBy = createdBy;
  }

  public updateName(name: string): void {
    this.name = name;
    this.updatedAt = DateTime.now();
  }

  public updateDescription(description: string): void {
    this.description = description;
    this.updatedAt = DateTime.now();
  }
}
