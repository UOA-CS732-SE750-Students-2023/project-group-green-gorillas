import { Injectable } from '@nestjs/common';
import { ActionItemAssigneeRepository } from './action-item-assignee.repository';

@Injectable()
export class ActionItemAssigneeService {
  constructor(
    private readonly actionItemAssignee: ActionItemAssigneeRepository,
  ) {}
}
