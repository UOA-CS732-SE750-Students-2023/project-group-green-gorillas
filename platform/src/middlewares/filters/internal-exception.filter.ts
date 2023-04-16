import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { Catch, ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';

import { InternalException } from '../../exceptions/internal-exception';

@Catch(InternalException)
export class InternalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(InternalExceptionFilter.name);

    constructor(private readonly i18nService: I18nService) {}

    async catch(exception: InternalException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { errorCode, statusCode, translationData, innerExceptionMessage } =
            exception;

        this.logger.error(exception.stack || exception.message);

        const message = await this.i18nService.translate(`error.${errorCode}`, {
            args: translationData ?? {},
        });

        response.status(statusCode).json({
            message,
            errorCode,
            statusCode,
            innerExceptionMessage,
        });
    }
}
