import { IsString, IsNumber } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { validateConfig } from './validation/config-validator';
import { Config } from './types/config';

export class TokenConfig {
  @IsString()
  tokenSecret!: string;

  @IsNumber()
  accessTokenTTL!: number;

  @IsNumber()
  refreshTokenTTL!: number;

  @IsNumber()
  longRefreshTokenTTL!: number;
}

export default registerAs(Config.TOKEN, () =>
  validateConfig(TokenConfig, {
    tokenSecret: process.env.TOKEN_SECRET,
    accessTokenTTL: process.env.TOKEN_ACCESS_TTL,
    refreshTokenTTL: process.env.TOKEN_REFRESH_TTL,
    longRefreshTokenTTL: process.env.TOKEN_REFRESH_LONG_TTL,
  }),
);
