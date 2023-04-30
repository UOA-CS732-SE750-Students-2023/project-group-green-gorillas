import { Module } from '@nestjs/common';
import { ActionItemController } from './action-item.controller';
import { TokenModule } from '../../domain/token/token.module';
import { UserModule } from '../../domain/user/user.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { ActionItemService } from './action-item.service';
import { ActionItemModule as ActionItemDomainModule } from '../../domain/action-item/action-item.module';
import { BoardModule } from '../../domain/board/board.module';
import { ActionItemAssigneeModule } from '../../domain/action-item-assignee/action-item-assignee.module';
import { TeamDashboardModule } from '../../domain/team-dashboard/team-dashboard.module';
import { SocketModule } from '../../gateway/socket/socket.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    TokenModule,
    UserModule,
    OrganisationModule,
    ActionItemDomainModule,
    BoardModule,
    ActionItemAssigneeModule,
    TeamDashboardModule,
    SocketModule,
    UtilsModule,
  ],
  controllers: [ActionItemController],
  providers: [ActionItemService],
})
export class ActionItemModule {}
