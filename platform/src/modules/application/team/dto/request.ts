import { IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import { UserTeamRole } from '../../../domain/user-team/user-team';

export class GetTeamByIdRequestParams {
  @IsUUID()
  teamId: UUID;
}

export class UpdateTeamRequestParams {
  @IsUUID()
  teamId: UUID;
}

export class UpdateTeamRequest {
  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;
}

export class UpdateTeamActiveRequest {
  @IsBoolean()
  active: boolean;
}

export class UpdateTeamActiveRequestParams {
  @IsUUID()
  teamId: UUID;
}

export class AddOrUpdateTeamUserRequest {
  @IsUUID()
  userId: UUID;

  @IsEnum(UserTeamRole)
  userTeamRole: UserTeamRole;

  @IsUUID()
  teamId: UUID;
}

export class RemoveTeamUserRequest {
  @IsUUID()
  userId: UUID;

  @IsUUID()
  teamId: UUID;
}

export class GetTeamRoleRequestParams {
  @IsUUID()
  teamId: UUID;
}

export class GetTeamInsightRequestParams {
  @IsUUID()
  teamId: UUID;
}

export class GetHasInProgressRetro {
  @IsUUID()
  teamId: UUID;
}

export class GetTeamRetroHistoryRequestParam {
  @IsUUID()
  teamId: UUID;
}
