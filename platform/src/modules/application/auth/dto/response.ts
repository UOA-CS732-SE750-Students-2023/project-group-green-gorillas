import { User } from '../../../domain/user/user';
import { Token } from '../../../domain/token/token';

export class SignInResponse {
  user!: User;
  accessToken!: Token;
  refreshToken!: Token;
}

export class RefreshTokenResponse extends SignInResponse {}
