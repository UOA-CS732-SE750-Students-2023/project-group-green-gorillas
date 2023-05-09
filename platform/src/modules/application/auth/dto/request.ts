import {
  IsBoolean,
  IsEmail,
  IsString,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRequest {
  @ApiProperty({
    type: String,
    description: 'This is a Email (String) property',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  password!: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a boolean property',
  })
  @IsBoolean()
  @IsOptional()
  isRememberMe?: boolean;
}

export class RefreshTokenRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  refreshToken!: string;
}

export class RequestResetPasswordRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsEmail()
  email!: string;
}

export class RevokeTokenRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  token!: string;
}

export class ResetPasswordRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  token!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  newPassword!: string;
}

export class VerifyResetPasswordTokenParams {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  token!: string;
}

export class ChangePasswordRequest {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  oldPassword!: string;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  @Length(8)
  newPassword!: string;
}
