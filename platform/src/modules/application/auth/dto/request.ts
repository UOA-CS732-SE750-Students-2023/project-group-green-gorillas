import { IsEmail, IsString } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class RefreshTokenRequest {
  @IsString()
  refreshToken!: string;
}

export class RevokeTokenRequest {
  @IsString()
  token!: string;
}
