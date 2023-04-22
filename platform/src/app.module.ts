import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GlobalModule } from './modules/global/global.module';
import { AuthModule } from './modules/application/auth/auth.module';
import { DataSeederModule } from './modules/application/data-seeder/data-seeder.module';
import { Environment } from './config/types/environment';
import { UserModule } from './modules/application/user/user.module';
import { TeamModule } from './modules/application/team/team.module';

const modules = [GlobalModule, AuthModule, UserModule, TeamModule];

if (process.env.NODE_ENV === Environment.LOCAL) {
  modules.push(DataSeederModule);
}

@Module({
  imports: modules,
  controllers: [AppController],
})
export class AppModule {}
