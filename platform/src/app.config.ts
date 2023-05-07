import { INestApplication, ValidationPipe } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { InternalExceptionFilter } from './middlewares/filters/internal-exception.filter';
import { RedisIoAdapter } from './modules/global/socket-adaptor/redis-io.adapter';

export const configureApp = (app: INestApplication) => {
  configureValidation(app);
  configureExceptionFilters(app);
  configSocketRedisAdaptor(app);
  configCors(app);
};

const configSocketRedisAdaptor = (app: INestApplication) => {
  app.useWebSocketAdapter(new RedisIoAdapter(app));
};

const configCors = (app: INestApplication) => {
  app.enableCors();
};

const configureExceptionFilters = (app: INestApplication) => {
  const i18nService = app.get<I18nService>(I18nService);

  app.useGlobalFilters(new InternalExceptionFilter(i18nService));
};

const configureValidation = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};
