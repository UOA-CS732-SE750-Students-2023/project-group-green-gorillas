import { UUID } from '../../../types/uuid.type';
import { Type } from 'class-transformer';
import { DynamoTimestampTransformer } from '../../../utils/decorators/dynamo-date-transformer';
import { DateTime } from 'luxon';

export enum UserTeamRole {
  MEMBER = 'MEMBER',
  LEADER = 'LEADER',
  TEMPORARY_LEADER = 'TEMPORARY_LEADER',
}

export class UserTeam {
  public readonly userId: UUID;

  public readonly teamId: UUID;

  public readonly organisationId: UUID;

  public role: UserTeamRole;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public readonly createdAt: DateTime;

  @Type(() => Number)
  @DynamoTimestampTransformer()
  public updatedAt: DateTime;

  constructor(
    userId: UUID,
    teamId: UUID,
    organisationId: UUID,
    role: UserTeamRole,
  ) {
    this.userId = userId;
    this.teamId = teamId;
    this.organisationId = organisationId;
    this.role = role;
    this.createdAt = DateTime.now();
    this.updatedAt = DateTime.now();
  }
}
