import { INestApplication, ValidationPipe } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { InternalExceptionFilter } from './middlewares/filters/internal-exception.filter';
import { RedisIoAdapter } from './modules/global/socket-adaptor/redis-io.adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from './config/types/environment';

export const configureApp = (app: INestApplication) => {
  configureValidation(app);
  configureExceptionFilters(app);
  configSocketRedisAdaptor(app);
  configCors(app);
  configureAPIDoc(app);
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

const configureAPIDoc = (app: INestApplication) => {
  if (process.env.NODE_ENV !== Environment.LOCAL) return;

  const config = new DocumentBuilder()
    .setTitle('Retrospective Monster')
    .setDescription(
      'Retrospective Monster API Description to list all the APIs within the app',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-doc', app, document);
};
