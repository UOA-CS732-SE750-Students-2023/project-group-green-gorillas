import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import { UserRole } from '../../../domain/user/user';

export class UpdateCurrentUser {
  @IsString()
  displayName!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;
}

export class UpdateUserRequest {
  @IsString()
  displayName!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}

export class UpdateUserRequestParams {
  @IsUUID()
  userId!: UUID;
}

export class CreateUserRequest {
  @IsEmail()
  email!: string;

  @IsString()
  displayName!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsString()
  @Length(8)
  temporaryPassword: string;
}

export class UpdateUserActiveRequest {
  @IsBoolean()
  active!: boolean;
}

export class UpdateUserActiveRequestParams {
  @IsUUID()
  userId!: UUID;
}
