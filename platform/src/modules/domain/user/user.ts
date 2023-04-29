import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';
import { uuid } from '../../../utils/uuid/uuid';
import { DynamoNullableTransformer } from '../../../utils/decorators/dynamo-nullable-transformer';

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

  public gender: boolean;

  public phone: string;

  public address: string;

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
    phone: string,
    address: string,
    gender: boolean,
    role: UserRole,
  ) {
    this.id = uuid();
    this.email = email;
    this.organisationId = organisationId;
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.gender = gender;
    this.role = role;
    this.active = true;
    this.createdAt = DateTime.now();
    this.updatedAt = DateTime.now();
  }

  public activate(): void {
    this.active = true;
    this.updatedAt = DateTime.now();
  }

  public disable(): void {
    this.active = false;
    this.updatedAt = DateTime.now();
  }

  public update(
    displayName: string,
    firstName: string,
    lastName: string,
    active: boolean,
    phone: string,
    gender: boolean,
    address: string,
    role: UserRole,
  ): void {
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.active = active;
    this.updatedAt = DateTime.now();
    this.phone = phone;
    this.gender = gender;
    this.address = address;

    this.updatedAt = DateTime.now();
  }
}
