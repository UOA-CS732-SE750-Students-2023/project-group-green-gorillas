import { ConfigService } from '@nestjs/config';
import { InternalConfigService } from '../internal-config.service';
import { BaseConfig } from '../../../../config/base.config';
import { InternalException } from '../../../../exceptions/internal-exception';

describe('InternalConfigService', () => {
  let configService: ConfigService;
  let internalConfigService: InternalConfigService;

  beforeEach(() => {
    configService = {
      get: jest.fn(),
    } as unknown as ConfigService;
    internalConfigService = new InternalConfigService(configService);
  });

  it('should return the base config', () => {
    const baseConfig: any = {};
    jest.spyOn(configService, 'get').mockReturnValue(baseConfig);
    expect(internalConfigService.getBaseConfig()).toEqual(baseConfig);
    expect(configService.get).toHaveBeenCalledWith('base');
  });

  it('should return the base config', () => {
    const baseConfig: any = {};
    jest.spyOn(configService, 'get').mockReturnValue(baseConfig);
    expect(internalConfigService.getBaseConfig()).toEqual(baseConfig);
    expect(configService.get).toHaveBeenCalledWith('base');
  });

  it('should return the database config', () => {
    const databaseConfig: any = {};
    jest.spyOn(configService, 'get').mockReturnValue(databaseConfig);
    expect(internalConfigService.getDatabaseConfig()).toEqual(databaseConfig);
    expect(configService.get).toHaveBeenCalledWith('database');
  });

  it('should return the token config', () => {
    const tokenConfig: any = {};
    jest.spyOn(configService, 'get').mockReturnValue(tokenConfig);
    expect(internalConfigService.getTokenConfig()).toEqual(tokenConfig);
    expect(configService.get).toHaveBeenCalledWith('token');
  });

  it('should return the key config', () => {
    const redisConfig: any = {};
    jest.spyOn(configService, 'get').mockReturnValue(redisConfig);
    expect(internalConfigService.getRedisConfig()).toEqual(redisConfig);
    expect(configService.get).toHaveBeenCalledWith('redis');
  });

  it('should throw an InternalException if the config is missing', () => {
    jest.spyOn(configService, 'get').mockReturnValue(undefined);
    expect(() => internalConfigService.getBaseConfig()).toThrowError(
      new InternalException(
        'INTERNAL.MISSING_CONFIG',
        `Could not find config. (name: BASE)`,
      ),
    );
  });
});
