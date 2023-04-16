import { IsString } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { validateConfig } from './validation/config-validator';
import { Config } from './types/config';

export class KeyConfig {
  @IsString()
  apiKey!: string;
}

export default registerAs(Config.KEY, () =>
  validateConfig(KeyConfig, {
    apiKey: process.env.KEY_API,
  }),
);
