import { Injectable } from '@nestjs/common';
import { ActionItemAssigneeRepository } from './action-item-assignee.repository';
import { ActionItemAssignee } from './action-item-assignee';
import { UUID } from '../../../types/uuid.type';
import { ActionItemAssigneeFactory } from './action-item-assignee.factory';

@Injectable()
export class ActionItemAssigneeService {
  constructor(
    private readonly actionItemAssignee: ActionItemAssigneeRepository,
  ) {}

  public listByActionItemId(actionItemId: UUID): Promise<ActionItemAssignee[]> {
    return this.actionItemAssignee.listByActionItemId(actionItemId);
  }

  public create(userId: UUID, actionItemId: UUID): Promise<ActionItemAssignee> {
    return this.actionItemAssignee.save(
      ActionItemAssigneeFactory.create(userId, actionItemId),
    );
  }

  public delete(userId: UUID, actionItemId: UUID): Promise<void> {
    return this.actionItemAssignee.delete(actionItemId, userId);
  }

  public save(
    actionItemAssignee: ActionItemAssignee,
  ): Promise<ActionItemAssignee> {
    return this.actionItemAssignee.save(actionItemAssignee);
  }
}
