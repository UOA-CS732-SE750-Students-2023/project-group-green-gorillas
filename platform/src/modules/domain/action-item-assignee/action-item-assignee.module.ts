import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ActionItemAssigneeRepository } from './action-item-assignee.repository';
import { ActionItemAssigneeService } from './action-item-assignee.service';

@Module({
  imports: [DatabaseModule],
  providers: [ActionItemAssigneeRepository, ActionItemAssigneeService],
  exports: [ActionItemAssigneeService],
})
export class ActionItemAssigneeModule {}
