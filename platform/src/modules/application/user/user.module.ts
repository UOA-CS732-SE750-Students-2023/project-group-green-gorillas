import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TokenModule } from '../../domain/token/token.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { UserModule as UserDomainModule } from '../../domain/user/user.module';

@Module({
  imports: [TokenModule, OrganisationModule, UserDomainModule],
  controllers: [UserController],
})
export class UserModule {}
