import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
  RefreshTokenRequest,
  RevokeTokenRequest,
  SignInRequest,
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

  @Post('sign-in')
  public async signIn(
    @Body() { email, password }: SignInRequest,
  ): Promise<SignInResponse> {
    return this.authService.signIn(email, password);
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
