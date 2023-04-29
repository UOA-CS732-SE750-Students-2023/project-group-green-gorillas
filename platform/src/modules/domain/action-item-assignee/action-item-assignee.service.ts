import { Injectable } from '@nestjs/common';
import { ActionItemAssigneeRepository } from './action-item-assignee.repository';
import { ActionItemAssignee } from './action-item-assignee';
import { UUID } from '../../../types/uuid.type';

@Injectable()
export class ActionItemAssigneeService {
  constructor(
    private readonly actionItemAssignee: ActionItemAssigneeRepository,
  ) {}

  public listByActionItemId(actionItemId: UUID): Promise<ActionItemAssignee[]> {
    return this.actionItemAssignee.listByActionItemId(actionItemId);
  }

  public save(
    actionItemAssignee: ActionItemAssignee,
  ): Promise<ActionItemAssignee> {
    return this.actionItemAssignee.save(actionItemAssignee);
  }
}
