import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserAuthModule } from '../user-auth/user-auth.module';
import { OrganisationModule } from '../organisation/organisation.module';

@Module({
  imports: [DatabaseModule, UserAuthModule, OrganisationModule],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
