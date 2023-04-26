import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TeamDashboardRepository } from './team-dashboard.repository';
import { TeamDashboardService } from './team-dashboard.service';

@Module({
  imports: [DatabaseModule],
  providers: [TeamDashboardRepository, TeamDashboardService],
  exports: [TeamDashboardService],
})
export class TeamDashboardModule {}
