import {IsEnum, IsNumber, IsString, ValidateIf} from 'class-validator';
import {Environment} from '../types/environment';

export class EnvironmentVariables {
    // Base
    @IsEnum(Environment)
    NODE_ENV!: Environment;

    @IsNumber({ maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false })
    PORT!: number;

    // AWS Config
    @IsString()
    AWS_ACCESS_KEY_ID!: string;

    @IsString()
    AWS_SECRET_ACCESS_KEY!: string;

    // Database
    @ValidateIf((o) => o.NODE_ENV === Environment.LOCAL)
    @IsString()
    DATABASE_CONNECTION_STRING?: string;

    @ValidateIf((o) => o.NODE_ENV === Environment.LOCAL)
    @IsString()
    DATABASE_REGION?: string;



    // TOKEN
    @IsString()
    TOKEN_SECRET!: string;

    @IsNumber({ maxDecimalPlaces: 0 })
    TOKEN_ACCESS_TTL!: number;

    @IsNumber({ maxDecimalPlaces: 0 })
    TOKEN_REFRESH_TTL!: number;

    // KEY
    @IsString()
    KEY_API!: string;

    // REDIS
    @IsString()
    REDIS_HOST!: string;

    @IsNumber({ maxDecimalPlaces: 0 })
    REDIS_PORT!: number;
}
