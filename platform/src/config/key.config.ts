import { IsString } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { validateConfig } from './validation/config-validator';
import { Config } from './types/config';

export class KeyConfig {
  @IsString()
  apiKey!: string;

  @IsString()
  sendGridApiKey!: string;
}

export default registerAs(Config.KEY, () =>
  validateConfig(KeyConfig, {
    apiKey: process.env.KEY_API,
    sendGridApiKey: process.env.KEY_SEND_GRID_API,
  }),
);
