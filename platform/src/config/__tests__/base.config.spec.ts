import { BaseConfig } from '../base.config';

describe('BaseConfig', () => {
  describe('default export', () => {
    it('should export a default configuration object', () => {
      const baseConfig = new BaseConfig();

      expect(baseConfig).toBeDefined();
    });
  });
});
