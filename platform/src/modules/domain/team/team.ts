import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export class Team {
  public readonly id: UUID;

  public readonly organisationId: UUID;

  public name: string;

  public active: boolean;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  constructor(organisationId: UUID, name: string) {
    this.id = uuid();
    this.organisationId = organisationId;
    this.name = name;
    this.active = true;
    this.createdAt = DateTime.now();
    this.updatedAt = DateTime.now();
  }

  public update(name: string, active: boolean): void {
    this.name = name;
    this.active = active;
  }

  public activate(): void {
    this.active = true;
  }

  public disable(): void {
    this.active = false;
  }
}
