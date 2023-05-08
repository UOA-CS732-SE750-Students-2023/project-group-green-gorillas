import { Token } from '../../../domain/token/token';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({
    type: String,
  })
  accessToken!: Token;

  @ApiProperty({
    type: String,
  })
  refreshToken!: Token;
}

export class RefreshTokenResponse extends SignInResponse {}
