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

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsBoolean()
  gender: boolean;
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

  @IsBoolean()
  active!: boolean;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsBoolean()
  gender: boolean;
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

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsBoolean()
  gender: boolean;
}

export class UpdateUserActiveRequest {
  @IsBoolean()
  active!: boolean;
}

export class UpdateUserActiveRequestParams {
  @IsUUID()
  userId!: UUID;
}
