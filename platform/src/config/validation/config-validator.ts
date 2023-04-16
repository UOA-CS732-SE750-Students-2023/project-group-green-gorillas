import {
    plainToClass,
    classToPlain,
    ClassConstructor,
} from 'class-transformer';
import { validateSync } from 'class-validator';

export const validateConfig = <T>(
    classConstructor: ClassConstructor<T>,
    config: Record<string, unknown>,
) => {
    const convertedConfig = plainToClass(classConstructor, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(<Record<string, unknown>>convertedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return classToPlain(convertedConfig);
};
