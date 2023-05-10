import { TokenConfig } from '../token.config';

describe('TokenConfig', () => {
  describe('default export', () => {
    it('should export a default configuration object', () => {
      const tokenConfig = new TokenConfig();

      expect(tokenConfig).toBeDefined();
    });
  });
});
