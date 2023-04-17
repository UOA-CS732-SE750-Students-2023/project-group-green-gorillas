import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  public readonly id: UUID;

  public readonly organisationId: UUID;

  public readonly email: string;

  public displayName: string;

  public firstName: string;

  public lastName: string;

  public type: UserType;

  public active: boolean;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  constructor(
    email: string,
    organisationId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    type: UserType,
  ) {
    this.id = uuid();
    this.email = email;
    this.organisationId = organisationId;
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type;
    this.active = true;
    this.createdAt = DateTime.now();
    this.updatedAt = DateTime.now();
  }

  public activate(): void {
    this.active = true;
  }

  public disable(): void {
    this.active = false;
  }
}
