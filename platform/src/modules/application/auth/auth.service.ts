import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { UserAuthService } from '../../domain/user-auth/user-auth.service';
import { InternalException } from '../../../exceptions/internal-exception';
import { sha256Encrypt } from '../../../utils/encryption/sha256Encrypt';
import { TokenService } from '../../domain/token/token.service';
import { TokenType } from '../../domain/token/token';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { SignInResponse } from './dto/response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly tokenService: TokenService,
    private readonly internalConfigService: InternalConfigService,
  ) {}

  public async signIn(
    email: string,
    password: string,
  ): Promise<SignInResponse> {
    try {
      const user = await this.userService.getByEmailOrThrow(email);

      const userAuth = await this.userAuthService.getByUserId(
        user.id,
        user.organisationId,
      );

      if (
        userAuth.password !== sha256Encrypt(password, userAuth.passwordSalt)
      ) {
        throw new InternalException(
          'AUTH.SIGN_IN',
          'Password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const accessToken = await this.tokenService.create(
        user.id,
        user.organisationId,
        TokenType.ACCESS_TOKEN,
        this.internalConfigService.getTokenConfig().accessTokenTTL,
      );

      const refreshToken = await this.tokenService.create(
        user.id,
        user.organisationId,
        TokenType.REFRESH_TOKEN,
        this.internalConfigService.getTokenConfig().refreshTokenTTL,
      );

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new InternalException(
        'AUTH.SIGN_IN',
        error.message,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
