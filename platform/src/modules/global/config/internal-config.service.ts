import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../../../config/types/config';
import { InternalException } from '../../../exceptions/internal-exception';
import { BaseConfig } from '../../../config/base.config';
import { DatabaseConfig } from '../../../config/database.config';
import { TokenConfig } from '../../../config/token.config';
import { KeyConfig } from '../../../config/key.config';
import { RedisConfig } from '../../../config/redis.config';

@Injectable()
export class InternalConfigService {
  constructor(private readonly configService: ConfigService) {}

  getBaseConfig(): BaseConfig {
    return this.get<BaseConfig>(Config.BASE);
  }

  getDatabaseConfig(): DatabaseConfig {
    return this.get<DatabaseConfig>(Config.DATABASE);
  }

  getTokenConfig(): TokenConfig {
    return this.get<TokenConfig>(Config.TOKEN);
  }

  getKeyConfig(): KeyConfig {
    return this.get<KeyConfig>(Config.KEY);
  }

  getRedisConfig(): RedisConfig {
    return this.get<RedisConfig>(Config.REDIS);
  }

  get<T>(configName: Config): T {
    const value = this.configService.get<T>(configName);

    if (!value) {
      throw new InternalException(
        'INTERNAL.MISSING_CONFIG',
        `Could not find config. (name: ${configName})`,
      );
    }

    return value;
  }
}
