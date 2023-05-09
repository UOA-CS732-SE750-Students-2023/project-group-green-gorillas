import { RedisConfig } from '../redis.config';

describe('RedisConfig', () => {
  describe('default export', () => {
    it('should export a default configuration object', () => {
      const redisConfig = new RedisConfig();

      expect(redisConfig).toBeDefined();
    });
  });
});
