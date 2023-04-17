import { Module } from '@nestjs/common';
import { InternalConfigModule } from './config/internal-config.module';
import { ConfigModule } from '@nestjs/config';
import config from '../../config';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { Environment } from '../../config/types/environment';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    InternalConfigModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '..', '..', 'i18n'),
        watch: process.env.NODE_ENV === Environment.LOCAL,
      },
    }),
  ],
})
export class GlobalModule {}
