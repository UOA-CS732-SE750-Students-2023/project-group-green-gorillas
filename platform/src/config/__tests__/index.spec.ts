import config from '..';

describe('config', () => {
  it('should have envFilePath set to [".env"]', () => {
    expect(config.envFilePath).toEqual(['.env']);
  });

  it('should have a validate function that returns true', () => {
    expect(config.validate).not.toBeNull();
  });

  it('should have load set to an array of config factories', () => {
    expect(Array.isArray(config.load)).toBe(true);
    expect(config.load.length).toBe(5);
    expect(config.load[0]).toBeInstanceOf(Function);
    expect(config.load[1]).toBeInstanceOf(Function);
    expect(config.load[2]).toBeInstanceOf(Function);
    expect(config.load[3]).toBeInstanceOf(Function);
    expect(config.load[4]).toBeInstanceOf(Function);
  });
});
