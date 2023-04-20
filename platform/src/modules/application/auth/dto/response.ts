import { Token } from '../../../domain/token/token';

export class SignInResponse {
  accessToken!: Token;
  refreshToken!: Token;
}

export class RefreshTokenResponse extends SignInResponse {}
