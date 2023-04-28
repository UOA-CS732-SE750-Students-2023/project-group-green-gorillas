import { Module } from '@nestjs/common';
import { ActionItemController } from './action-item.controller';
import { TokenModule } from '../../domain/token/token.module';
import { UserModule } from '../../domain/user/user.module';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { ActionItemService } from './action-item.service';
import { ActionItemModule as ActionItemDomainModule } from '../../domain/action-item/action-item.module';
import { BoardModule } from '../../domain/board/board.module';
import { ActionItemAssigneeModule } from '../../domain/action-item-assignee/action-item-assignee.module';

@Module({
  imports: [
    TokenModule,
    UserModule,
    OrganisationModule,
    ActionItemDomainModule,
    BoardModule,
    ActionItemAssigneeModule,
  ],
  controllers: [ActionItemController],
  providers: [ActionItemService],
})
export class ActionItemModule {}
