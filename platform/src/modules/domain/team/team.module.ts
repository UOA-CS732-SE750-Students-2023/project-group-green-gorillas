import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

@Module({
  imports: [DatabaseModule],
  providers: [TeamRepository, TeamService],
  exports: [TeamService],
})
export class TeamModule {}
