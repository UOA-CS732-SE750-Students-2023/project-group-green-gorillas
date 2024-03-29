import { Module } from '@nestjs/common';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { DataSeederService } from './data-seeder.service';
import { UserModule } from '../../domain/user/user.module';
import { UserAuthModule } from '../../domain/user-auth/user-auth.module';
import { DataSeederController } from './data-seeder.controller';
import { TeamModule } from '../../domain/team/team.module';
import { UserTeamModule } from '../../domain/user-team/user-team.module';
import { BoardTemplateModule } from '../../domain/board-template/board-template.module';
import { BoardModule } from '../../domain/board/board.module';
import { ActionItemModule } from '../../domain/action-item/action-item.module';
import { ActionItemAssigneeModule } from '../../domain/action-item-assignee/action-item-assignee.module';
import { TeamDashboardModule } from '../../domain/team-dashboard/team-dashboard.module';
import { BoardSection } from '../../domain/board-section/board-section';
import { BoardNoteModule } from '../../domain/board-note/board-note.module';
import { BoardSectionModule } from '../../domain/board-section/board-section.module';

@Module({
  imports: [
    OrganisationModule,
    UserModule,
    UserAuthModule,
    TeamModule,
    UserTeamModule,
    BoardTemplateModule,
    BoardModule,
    ActionItemModule,
    ActionItemAssigneeModule,
    TeamDashboardModule,
    BoardSectionModule,
    BoardNoteModule,
  ],
  providers: [DataSeederService],
  controllers: [DataSeederController],
})
export class DataSeederModule {}
