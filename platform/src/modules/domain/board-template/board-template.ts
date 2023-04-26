import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export type BoardTemplateSection = {
  name: string;
  description: string;
  order: number;
  // TODO: color
};

export class BoardTemplate {
  public readonly id: UUID;

  public readonly organisationId: UUID;

  public name: string;

  public description: string;

  public descriptionLong: string;

  public boardTemplateSections: BoardTemplateSection[];

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  public readonly createdBy: UUID;

  constructor(
    organisationId: UUID,
    name: string,
    description: string,
    descriptionLong: string,
    boardTemplateSections: BoardTemplateSection[],
    createdBy: UUID,
  ) {
    this.id = uuid();
    this.organisationId = organisationId;
    this.name = name;
    this.description = description;
    this.descriptionLong = descriptionLong;
    this.boardTemplateSections = boardTemplateSections;
    this.createdAt = DateTime.now();
    this.updatedAt = DateTime.now();
    this.createdBy = createdBy;
  }
}
