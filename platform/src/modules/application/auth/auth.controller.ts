import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ChangePasswordRequest,
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller({
  path: ['api/auth'],
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'API to request to reset the user password',
  })
  @Post('request-reset-password')
  public async requestResetPassword(
    @Body() { email }: RequestResetPasswordRequest,
  ): Promise<void> {
    return this.authService.requestResetPassword(email);
  }

  @ApiOkResponse({
    description: 'API to verify the reset password token',
  })
  @Get('verify-reset-password-token/:token')
  public async verifyResetPasswordToken(
    @Param() { token }: VerifyResetPasswordTokenParams,
  ): Promise<void> {
    await this.authService.verifyResetPasswordToken(token);
  }

  @ApiOkResponse({
    description: 'API to reset the user password',
  })
  @Post('reset-password')
  public async resetPassword(
    @Body() { token, newPassword }: ResetPasswordRequest,
  ): Promise<void> {
    return this.authService.resetPassword(token, newPassword);
  }

  @ApiOkResponse({
    description: 'API to reset the user password',
    type: SignInResponse,
  })
  @Post('sign-in')
  public async signIn(
    @Body() { email, password, isRememberMe }: SignInRequest,
  ): Promise<SignInResponse> {
    return this.authService.signIn(email, password, isRememberMe);
  }

  @ApiOkResponse({
    description: 'API to refresh the token',
    type: RefreshTokenResponse,
  })
  @Post('refresh-token')
  public async refreshToken(
    @Body() { refreshToken }: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(refreshToken);
  }

  @ApiOkResponse({
    description: 'API to revoke the token',
  })
  @Delete('revoke-token')
  @UseAuthGuard()
  public async revokeToken(
    @Body() { token }: RevokeTokenRequest,
    @RequestUser() user: RequestUserType,
  ): Promise<void> {
    return this.authService.revokeToken(user.id, token);
  }

  @ApiOkResponse({
    description: 'API to change the user password',
  })
  @Put('current/change-password')
  @UseAuthGuard()
  public async changeCurrentUserPassword(
    @RequestUser() user: RequestUserType,
    @Body() { newPassword, oldPassword }: ChangePasswordRequest,
  ): Promise<void> {
    return this.authService.changeCurrentUserPassword(
      user,
      oldPassword,
      newPassword,
    );
  }
}
