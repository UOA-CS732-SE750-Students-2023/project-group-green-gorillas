import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TokenModule } from '../../domain/token/token.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { UserModule as UserDomainModule } from '../../domain/user/user.module';
import { TeamModule } from '../../domain/team/team.module';
import { UserTeamModule } from '../../domain/user-team/user-team.module';
import { UserService } from './user.service';

@Module({
  imports: [
    TokenModule,
    OrganisationModule,
    UserDomainModule,
    TeamModule,
    UserTeamModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
