import * as crypto from 'crypto';

export const generatePwdSalt = (): string => {
  return crypto.randomBytes(16).toString('base64');
};
