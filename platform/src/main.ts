import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { WinstonLoggerService } from './logger/winston-logger.service';
import { configureApp } from './app.config';

const bootstrap = async (port: string | number | undefined) => {
  const logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService(),
  });

  configureApp(app);

  await startApp(app, port, logger);
};

const startApp = async (
  app: INestApplication,
  port: string | number | undefined,
  logger: Logger,
) => {
  if (!port) {
    throw new Error('Port is undefined. It is hard to start a web server now.');
  }

  await app.listen(port);
  logger.log(`Retrospective Monster is listening to port: ${port}`);
};

(async () => {
  await bootstrap(process.env.PORT);
})();
