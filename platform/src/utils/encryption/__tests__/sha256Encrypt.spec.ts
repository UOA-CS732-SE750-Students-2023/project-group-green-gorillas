import * as crypto from 'crypto';
import { sha256Encrypt } from '../sha256Encrypt';

describe('sha256Encrypt', () => {
  test('returns a string', () => {
    const result = sha256Encrypt('password', 'salt');
    expect(typeof result).toBe('string');
  });

  test('returns a different string when called with different values', () => {
    const result1 = sha256Encrypt('password', 'salt');
    const result2 = sha256Encrypt('password', 'pepper');
    expect(result1).not.toBe(result2);
  });

  test('returns the same string when called with the same values', () => {
    const result1 = sha256Encrypt('password', 'salt');
    const result2 = sha256Encrypt('password', 'salt');
    expect(result1).toBe(result2);
  });

  test('uses the SHA-256 algorithm', () => {
    const spy = jest.spyOn(crypto, 'createHash');
    sha256Encrypt('password', 'salt');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toBe('sha256');
  });

  test('iterates 50 times', () => {
    const spy = jest.spyOn(crypto.Hash.prototype, 'update');
    sha256Encrypt('password', 'salt');
    expect(spy).toHaveBeenCalledTimes(50);
  });
});
