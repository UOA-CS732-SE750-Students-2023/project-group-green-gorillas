import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamModule as TeamDomainModule } from '../../domain/team/team.module';
import { TeamController } from './team.controller';
import { UserModule } from '../../domain/user/user.module';
import { UserTeamModule } from '../../domain/user-team/user-team.module';
import { TokenModule } from '../../domain/token/token.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { TeamDashboardModule } from '../../domain/team-dashboard/team-dashboard.module';
import { BoardModule } from '../../domain/board/board.module';
import { BoardTimeInvestModule } from '../../domain/board-time-invest/board-time-invest.module';

@Module({
  imports: [
    TeamDomainModule,
    UserModule,
    UserTeamModule,
    TokenModule,
    OrganisationModule,
    TeamDashboardModule,
    BoardModule,
    BoardTimeInvestModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
