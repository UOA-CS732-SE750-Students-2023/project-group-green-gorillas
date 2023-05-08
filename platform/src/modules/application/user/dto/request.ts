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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCurrentUser {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  displayName!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  firstName!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  lastName!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a Boolean property',
  })
  @IsBoolean()
  gender: boolean;
}

export class UpdateUserRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  displayName!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  firstName!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  lastName!: string;

  @ApiProperty({
    type: String,
    description: 'This should be ADMIN or USER',
  })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiProperty({
    type: Boolean,
    description: 'This is a Boolean property',
  })
  @IsBoolean()
  active!: boolean;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a Boolean property',
  })
  @IsBoolean()
  gender: boolean;
}

export class UpdateUserRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  userId!: UUID;
}

export class CreateUserRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  displayName!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  firstName!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  lastName!: string;

  @ApiProperty({
    type: String,
    description: 'This should be ADMIN or USER',
  })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  @Length(8)
  temporaryPassword: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a Boolean property',
  })
  @IsBoolean()
  gender: boolean;
}

export class UpdateUserActiveRequest {
  @ApiProperty({
    type: Boolean,
    description: 'This is a Boolean property',
  })
  @IsBoolean()
  active!: boolean;
}

export class UpdateUserActiveRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  userId!: UUID;
}
