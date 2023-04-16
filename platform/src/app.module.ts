import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {GlobalModule} from "./modules/global/global.module";

@Module({
  imports: [GlobalModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
