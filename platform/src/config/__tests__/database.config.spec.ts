import { DatabaseConfig } from '../database.config';

describe('DatabaseConfig', () => {
  describe('default export', () => {
    it('should export a default configuration object', () => {
      const databaseConfig = new DatabaseConfig();

      expect(databaseConfig).toBeDefined();
    });
  });
});
