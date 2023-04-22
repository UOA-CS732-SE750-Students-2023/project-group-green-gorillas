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
import * as sgMail from '@sendgrid/mail';
import { SendgridMailClient } from '../../external/sendgrid-mail/sendgrid-mail-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly organisationService: OrganisationService,
    private readonly tokenService: TokenService,
    private readonly internalConfigService: InternalConfigService,
    private readonly sendGridMailClient: SendgridMailClient,
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

  public async requestResetPassword(email: string): Promise<void> {
    const user = await this.userService.getByEmailOrThrow(email);

    const { value } = await this.tokenService.create(
      user.id,
      user.organisationId,
      TokenType.RESET_PASSWORD_TOKEN,
      this.internalConfigService.getTokenConfig().resetPasswordTokenTTL,
    );

    const resetPasswordClientUrl = `http://127.0.0.1:5173/reset-password?token=${value}`;

    await this.sendGridMailClient.sendEmail({
      to: user.email, // Change to your recipient
      from: 'oliverdeng1020@gmail.com', // Change to your verified sender
      subject: 'Retrospective Monster - Reset Password Link',
      html: `<a href="${resetPasswordClientUrl}">${resetPasswordClientUrl}</a>`,
    });
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
