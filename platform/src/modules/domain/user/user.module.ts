import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserAuthRepository } from './user-auth.repository';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, UserService, UserAuthRepository],
  exports: [UserService],
})
export class UserModule {}
