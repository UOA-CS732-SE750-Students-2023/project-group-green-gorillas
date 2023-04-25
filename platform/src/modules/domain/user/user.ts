import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';

export enum UserRole {
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

  public role: UserRole;

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
    role: UserRole,
  ) {
    this.id = uuid();
    this.email = email;
    this.organisationId = organisationId;
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
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

  public update(
    displayName: string,
    firstName: string,
    lastName: string,
    active: boolean,
    role: UserRole,
  ): void {
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.active = active;
    this.updatedAt = DateTime.now();
  }
}
