import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

export class WinstonLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const transports = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.label({ label: `${process.pid}` }),
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.align(),
          winston.format.printf(
            ({ level, message, label, timestamp, context }) => {
              return `${timestamp} [${label}] ${context} ${level}: ${message}`;
            },
          ),
        ),
      }),
    ];

    this.logger = winston.createLogger({
      transports,
    });
  }

  log(message: any, context?: string) {
    return this.logger.info({ ...this.prepareMessage(message), context });
  }
  error(message: any, trace?: string, context?: string) {
    return this.logger.error({
      ...this.prepareMessage(message),
      trace,
      context,
    });
  }
  warn(message: any, context?: string) {
    return this.logger.warn({ ...this.prepareMessage(message), context });
  }
  debug?(message: any, context?: string) {
    return this.logger.debug({ ...this.prepareMessage(message), context });
  }
  verbose?(message: any, context?: string) {
    return this.logger.verbose({ ...this.prepareMessage(message), context });
  }

  private prepareMessage(message: any) {
    if (!(message instanceof Object)) {
      message = { message };
    }
    return message;
  }
}
