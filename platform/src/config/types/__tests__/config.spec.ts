import { Config } from '../config';

describe('Config enum', () => {
  it('should have a key called BASE', () => {
    expect(Config.BASE).toEqual('base');
  });

  it('should have a key called DATABASE', () => {
    expect(Config.DATABASE).toEqual('database');
  });

  it('should have a key called TOKEN', () => {
    expect(Config.TOKEN).toEqual('token');
  });

  it('should have a key called KEY', () => {
    expect(Config.KEY).toEqual('key');
  });

  it('should have a key called REDIS', () => {
    expect(Config.REDIS).toEqual('redis');
  });
});
