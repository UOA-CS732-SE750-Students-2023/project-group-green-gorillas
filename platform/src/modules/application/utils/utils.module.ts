import { Module } from '@nestjs/common';
import { BoardModule } from '../../domain/board/board.module';
import { ActionItemAssigneeModule } from '../../domain/action-item-assignee/action-item-assignee.module';
import { UtilsService } from './utils.service';
import { UserModule } from '../../domain/user/user.module';

@Module({
  imports: [BoardModule, ActionItemAssigneeModule, UserModule],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
