import { Environment } from '../../types/environment';
import { validateConfig } from '../config-validator';

class Config {
  port: number;
  environment: Environment;
}

describe('Config Utils', () => {
  describe('validateConfig', () => {
    it('should convert and validate config object successfully', () => {
      const config = {
        port: 3000,
        environment: 'local',
      };

      const validatedConfig = validateConfig(Config, config);

      expect(validatedConfig.port).toEqual(3000);
      expect(validatedConfig.environment).toEqual(Environment.LOCAL);
    });
  });
});
