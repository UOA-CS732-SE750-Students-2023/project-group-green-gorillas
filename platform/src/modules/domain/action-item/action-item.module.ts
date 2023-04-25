import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ActionItemRepository } from './action-item.repository';
import { ActionItemService } from './action-item.service';

@Module({
  imports: [DatabaseModule],
  providers: [ActionItemRepository, ActionItemService],
  exports: [ActionItemService],
})
export class ActionItemModule {}
