import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalException extends HttpException {
    constructor(
        public readonly errorCode: string,
        public readonly innerExceptionMessage: string,
        public readonly statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
        public readonly translationData?: Record<string, unknown>,
    ) {
        super(errorCode, statusCode);
        this.name = 'InternalException';
    }
}
