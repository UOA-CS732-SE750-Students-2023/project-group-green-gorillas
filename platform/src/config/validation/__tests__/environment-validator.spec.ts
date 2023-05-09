import { validate } from '../environment-validator';
import { EnvironmentVariables } from '../environment-variables';

describe('validate', () => {
  it('should throw an error when required env variables are missing', () => {
    const config = {
      // missing required variables: PORT, DATABASE_URL, JWT_SECRET
      NODE_ENV: 'test',
    };

    expect(() => validate(config)).toThrow(Error);
  });

  it('should throw if something invalid', () => {
    const config = {
      NODE_ENV: 'test',
      PORT: '3000',
      DATABASE_URL: 'postgres://localhost:5432/mydb',
      JWT_SECRET: 'myjwtsecret',
    };

    expect(() => validate(config)).toThrow();
  });
});
