import { Body, Controller, Post } from '@nestjs/common';
import { SignInRequest } from './dto/request';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/response';

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
}
