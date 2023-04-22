import { IsBoolean, IsEmail, IsString, IsOptional } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsBoolean()
  @IsOptional()
  isRememberMe?: boolean;
}

export class RefreshTokenRequest {
  @IsString()
  refreshToken!: string;
}

export class RequestResetPasswordRequest {
  @IsEmail()
  email!: string;
}

export class RevokeTokenRequest {
  @IsString()
  token!: string;
}

export class ResetPasswordRequest {
  @IsString()
  token!: string;

  @IsString()
  newPassword!: string;
}

export class VerifyResetPasswordTokenParams {
  @IsString()
  token!: string;
}
