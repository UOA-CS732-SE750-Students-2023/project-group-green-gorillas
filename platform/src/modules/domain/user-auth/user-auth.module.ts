import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserAuthRepository } from './user-auth.repository';
import { UserAuthService } from './user-auth.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserAuthRepository, UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
