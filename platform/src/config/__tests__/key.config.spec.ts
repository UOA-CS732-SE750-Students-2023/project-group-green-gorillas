import { KeyConfig } from '../key.config';

describe('KeyConfig', () => {
  describe('default export', () => {
    it('should export a default configuration object', () => {
      const keyConfig = new KeyConfig();

      expect(keyConfig).toBeDefined();
    });
  });
});
