import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export class Organisation {
  public readonly id: UUID;

  public name: string;

  public active: boolean;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.createdAt = DateTime.now();
    this.updatedAt = DateTime.now();
    this.active = true;
  }

  public activate(): void {
    this.active = true;
  }

  public disable(): void {
    this.active = false;
  }

  public updateName(name: string): void {
    this.name = name;
    this.updatedAt = DateTime.now();
  }
}
