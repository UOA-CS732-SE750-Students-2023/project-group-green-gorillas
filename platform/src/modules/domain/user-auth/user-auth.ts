import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';

export class UserAuth {
  public readonly userId: UUID;

  public readonly organisationId: UUID;

  public password: string;

  public passwordSalt: string;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  constructor(
    userId: UUID,
    organisationId: UUID,
    encryptedPassword: string,
    passwordSalt: string,
  ) {
    this.userId = userId;
    this.organisationId = organisationId;
    this.password = encryptedPassword;
    this.passwordSalt = passwordSalt;
    this.createdAt = DateTime.now();
    this.updatedAt = DateTime.now();
  }
}
