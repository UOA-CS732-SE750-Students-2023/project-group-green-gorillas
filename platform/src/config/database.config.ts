import { IsString, IsOptional } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { validateConfig } from './validation/config-validator';
import { Config } from './types/config';

export class DatabaseConfig {
  @IsString()
  @IsOptional()
  connectionString?: string;

  @IsString()
  @IsOptional()
  region?: string;
}

export default registerAs(Config.DATABASE, () =>
  validateConfig(DatabaseConfig, {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    region: process.env.DATABASE_REGION,
  }),
);
