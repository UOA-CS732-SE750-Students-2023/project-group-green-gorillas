import { Module } from '@nestjs/common';
import { RetrospectiveController } from './retrospective.controller';
import { RetrospectiveService } from './retrospective.service';
import { TokenModule } from '../../domain/token/token.module';
import { UserModule } from '../../domain/user/user.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { BoardTemplateModule } from '../../domain/board-template/board-template.module';
import { BoardModule } from '../../domain/board/board.module';
import { TeamDashboardModule } from '../../domain/team-dashboard/team-dashboard.module';
import { BoardSectionModule } from '../../domain/board-section/board-section.module';
import { BoardNoteModule } from '../../domain/board-note/board-note.module';

@Module({
  imports: [
    TokenModule,
    UserModule,
    OrganisationModule,
    BoardTemplateModule,
    BoardModule,
    TeamDashboardModule,
    BoardSectionModule,
    BoardNoteModule,
  ],
  controllers: [RetrospectiveController],
  providers: [RetrospectiveService],
})
export class RetrospectiveModule {}
