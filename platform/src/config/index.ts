import baseConfig from './base.config';
import databaseConfig from './database.config';
import tokenConfig from './token.config';
import keyConfig from './key.config';
import redisConfig from './redis.config';
import { validate } from './validation/environment-validator';

export const configFactories = [
    baseConfig,
    databaseConfig,
    tokenConfig,
    keyConfig,
    redisConfig,
];

export default {
    envFilePath: ['.env'],
    validate,
    load: configFactories,
};
