import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GlobalModule } from './modules/global/global.module';
import { AuthModule } from './modules/application/auth/auth.module';

@Module({
  imports: [GlobalModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
