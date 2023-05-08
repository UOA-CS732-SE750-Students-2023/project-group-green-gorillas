import { Module } from '@nestjs/common';
import { GlobalModule } from './modules/global/global.module';
import { AuthModule } from './modules/application/auth/auth.module';
import { DataSeederModule } from './modules/application/data-seeder/data-seeder.module';
import { Environment } from './config/types/environment';
import { UserModule } from './modules/application/user/user.module';
import { TeamModule } from './modules/application/team/team.module';
import { RetrospectiveModule } from './modules/application/retrospective/retrospective.module';
import { ActionItemModule } from './modules/application/action-item/action-item.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { OrganisationModule } from './modules/application/organisation/organisation.module';

const modules = [
  GlobalModule,
  AuthModule,
  UserModule,
  TeamModule,
  RetrospectiveModule,
  ActionItemModule,
  GatewayModule,
  OrganisationModule,
];

if (process.env.NODE_ENV === Environment.LOCAL) {
  modules.push(DataSeederModule);
}

@Module({
  imports: modules,
})
export class AppModule {}
