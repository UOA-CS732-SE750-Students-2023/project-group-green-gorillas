import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserTeamRepository } from './user-team.repository';
import { UserTeamService } from './user-team.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserTeamRepository, UserTeamService],
  exports: [UserTeamService],
})
export class UserTeamModule {}
