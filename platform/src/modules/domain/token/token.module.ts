import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [TokenRepository, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
