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
import { SocketModule } from '../../gateway/socket/socket.module';
import { ActionItemModule } from '../../domain/action-item/action-item.module';
import { UtilsModule } from '../utils/utils.module';
import { BoardNoteVoteModule } from '../../domain/board-note-vote/board-note-vote.module';

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
    SocketModule,
    ActionItemModule,
    UtilsModule,
    BoardNoteVoteModule,
  ],
  controllers: [RetrospectiveController],
  providers: [RetrospectiveService],
})
export class RetrospectiveModule {}
