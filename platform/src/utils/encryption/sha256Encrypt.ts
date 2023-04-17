import * as crypto from 'crypto';

// slow sha256Encrypt (Slow Hash Algorithm)
export const sha256Encrypt = (value: string, salt: string): string => {
  let secrets = value;

  for (let i = 0; i < 50; i++) {
    secrets = crypto
      .createHash('sha256')
      .update(secrets + salt, 'binary')
      .digest('base64');
  }

  return secrets;
};
