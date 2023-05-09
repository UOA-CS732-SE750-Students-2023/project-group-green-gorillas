import { Environment } from '../environment';

describe('Environment', () => {
  it('should have three values', () => {
    expect(Object.keys(Environment).length).toEqual(3);
  });

  it('should have a value for LOCAL', () => {
    expect(Environment.LOCAL).toEqual('local');
  });

  it('should have a value for STAGING', () => {
    expect(Environment.STAGING).toEqual('staging');
  });

  it('should have a value for PRODUCTION', () => {
    expect(Environment.PRODUCTION).toEqual('production');
  });
});
