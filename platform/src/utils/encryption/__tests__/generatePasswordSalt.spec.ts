import * as crypto from 'crypto';
import { generatePwdSalt } from '../generatePasswordSalt';

describe('generatePwdSalt', () => {
  test('returns a base64-encoded string of length 24', () => {
    const result = generatePwdSalt();
    expect(typeof result).toBe('string');
    expect(result.length).toBe(24);
    expect(Buffer.from(result, 'base64').toString('base64')).toBe(result);
  });

  test('uses crypto.randomBytes to generate random bytes', () => {
    const spy = jest.spyOn(crypto, 'randomBytes');
    generatePwdSalt();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toBe(16);
  });
});
