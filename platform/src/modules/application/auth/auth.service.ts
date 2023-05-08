import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { UserAuthService } from '../../domain/user-auth/user-auth.service';
import { InternalException } from '../../../exceptions/internal-exception';
import { sha256Encrypt } from '../../../utils/encryption/sha256Encrypt';
import { TokenService } from '../../domain/token/token.service';
import { TokenType } from '../../domain/token/token';
import { InternalConfigService } from '../../global/config/internal-config.service';
import { RefreshTokenResponse, SignInResponse } from './dto/response';
import { OrganisationService } from '../../domain/organisation/organisation.service';
import { User } from '../../domain/user/user';
import { EmailService } from '../../common/email/email.service';
import { RequestUserType } from '../../../utils/decorators/request-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly organisationService: OrganisationService,
    private readonly tokenService: TokenService,
    private readonly internalConfigService: InternalConfigService,
    private readonly emailService: EmailService,
  ) {}

  public async verifyResetPasswordToken(token: string): Promise<User> {
    return this.tokenService.verify(token, TokenType.RESET_PASSWORD_TOKEN);
  }

  public async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.verifyResetPasswordToken(token);

    await this.userAuthService.create(
      user.id,
      user.organisationId,
      newPassword,
    );

    await this.tokenService.delete(user.id, token);
  }

  public async changeCurrentUserPassword(
    user: RequestUserType,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const existingUserAuth = await this.userAuthService.getByUserId(
      user.id,
      user.organisationId,
    );

    if (!existingUserAuth) {
      await this.userAuthService.create(
        user.id,
        user.organisationId,
        newPassword,
      );
      return;
    }

    if (
      existingUserAuth.password !==
      sha256Encrypt(oldPassword, existingUserAuth.passwordSalt)
    ) {
      throw new InternalException(
        'AUTH.INCORRECT_OLD_PASSWORD',
        'Old password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userAuthService.create(
      user.id,
      user.organisationId,
      newPassword,
    );
  }

  public async requestResetPassword(email: string): Promise<void> {
    const user = await this.userService.getByEmailOrThrow(email);

    const { value } = await this.tokenService.create(
      user.id,
      user.organisationId,
      TokenType.RESET_PASSWORD_TOKEN,
      this.internalConfigService.getTokenConfig().resetPasswordTokenTTL,
    );

    const resetPasswordLink = `${
      this.internalConfigService.getBaseConfig().clientHost
    }/reset-password?token=${value}`;

    await this.emailService.sendResetPasswordEmail(user, resetPasswordLink);
  }

  public async signIn(
    email: string,
    password: string,
    isRememberMe?: boolean,
  ): Promise<SignInResponse> {
    try {
      const user = await this.userService.getByEmailOrThrow(email);

      if (!user.active) {
        throw new InternalException(
          'AUTH.SIGN_IN',
          'User is inactive',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const organisation = await this.organisationService.getByIdOrThrow(
        user.organisationId,
      );

      if (!organisation.active) {
        throw new InternalException(
          'AUTH.SIGN_IN',
          'Organisation is inactive',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const userAuth = await this.userAuthService.getByUserIdOrThrow(
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
        isRememberMe
          ? this.internalConfigService.getTokenConfig().longRefreshTokenTTL
          : this.internalConfigService.getTokenConfig().refreshTokenTTL,
      );

      return {
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

  public async refreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenResponse> {
    const user = await this.tokenService.verify(
      refreshToken,
      TokenType.REFRESH_TOKEN,
    );

    if (!user.active) {
      throw new InternalException(
        'TOKEN.FAILED_TO_REFRESH_TOKEN',
        'user is inactive',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const organisation = await this.organisationService.getByIdOrThrow(
      user.organisationId,
    );

    if (!organisation.active) {
      throw new InternalException(
        'TOKEN.FAILED_TO_REFRESH_TOKEN',
        'Organisation is inactive',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newAccessToken = await this.tokenService.create(
      user.id,
      user.organisationId,
      TokenType.ACCESS_TOKEN,
      this.internalConfigService.getTokenConfig().accessTokenTTL,
    );

    const newRefreshToken = await this.tokenService.create(
      user.id,
      user.organisationId,
      TokenType.REFRESH_TOKEN,
      this.internalConfigService.getTokenConfig().refreshTokenTTL,
    );

    await this.tokenService.delete(user.id, refreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  public async revokeToken(userId: string, token: string): Promise<void> {
    await this.tokenService.delete(userId, token);
  }
}
