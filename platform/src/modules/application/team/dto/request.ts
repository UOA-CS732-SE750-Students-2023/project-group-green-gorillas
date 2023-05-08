import { IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import { UserTeamRole } from '../../../domain/user-team/user-team';
import { ApiProperty } from '@nestjs/swagger';

export class GetTeamByIdRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class UpdateTeamRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class UpdateTeamRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a Boolean property',
  })
  @IsBoolean()
  active: boolean;
}

export class UpdateTeamActiveRequest {
  @ApiProperty({
    type: Boolean,
    description: 'This is a Boolean property',
  })
  @IsBoolean()
  active: boolean;
}

export class UpdateTeamActiveRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class AddOrUpdateTeamUserRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  userId: UUID;

  @ApiProperty({
    type: String,
    description: 'This should be MEMBER, LEADER or TEMPORARY_LEADER ',
  })
  @IsEnum(UserTeamRole)
  userTeamRole: UserTeamRole;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class RemoveTeamUserRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  userId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class GetTeamRoleRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class GetTeamInsightRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class GetHasInProgressRetro {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class GetTeamRetroHistoryRequestParam {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class AddTeamRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  name: string;
}

export class GetBoardTimeInvestRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}
