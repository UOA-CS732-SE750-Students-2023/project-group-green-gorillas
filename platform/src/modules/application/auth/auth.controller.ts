import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  RefreshTokenRequest,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
  RevokeTokenRequest,
  SignInRequest,
  VerifyResetPasswordTokenParams,
} from './dto/request';
import { AuthService } from './auth.service';
import { RefreshTokenResponse, SignInResponse } from './dto/response';
import { UseAuthGuard } from '../../../utils/guards/auth-guard/auth.guard';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';

@Controller({
  path: ['api/auth'],
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-reset-password')
  public async requestResetPassword(
    @Body() { email }: RequestResetPasswordRequest,
  ): Promise<void> {
    return this.authService.requestResetPassword(email);
  }

  @Get('verify-reset-password-token/:token')
  public async verifyResetPasswordToken(
    @Param() { token }: VerifyResetPasswordTokenParams,
  ): Promise<void> {
    await this.authService.verifyResetPasswordToken(token);
  }

  @Post('reset-password')
  public async resetPassword(
    @Body() { token, newPassword }: ResetPasswordRequest,
  ): Promise<void> {
    return this.authService.resetPassword(token, newPassword);
  }

  @Post('sign-in')
  public async signIn(
    @Body() { email, password, isRememberMe }: SignInRequest,
  ): Promise<SignInResponse> {
    return this.authService.signIn(email, password, isRememberMe);
  }

  @Post('refresh-token')
  public async refreshToken(
    @Body() { refreshToken }: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(refreshToken);
  }

  @Delete('revoke-token')
  @UseAuthGuard()
  public async revokeToken(
    @Body() { token }: RevokeTokenRequest,
    @RequestUser() user: RequestUserType,
  ): Promise<void> {
    return this.authService.revokeToken(user.id, token);
  }
}
