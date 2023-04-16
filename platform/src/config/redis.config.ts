import { IsNumber, IsString } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { validateConfig } from './validation/config-validator';
import { Config } from './types/config';

export class RedisConfig {
  @IsString()
  host!: string;

  @IsNumber()
  port!: number;
}

export default registerAs(Config.REDIS, () =>
  validateConfig(RedisConfig, {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }),
);
