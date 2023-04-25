import { ActionItemAssignee } from './action-item-assignee';
import { UUID } from '../../../types/uuid.type';

export class ActionItemAssigneeFactory {
  static create(userId: UUID, actionItemId: UUID): ActionItemAssignee {
    return new ActionItemAssignee(userId, actionItemId);
  }
}
