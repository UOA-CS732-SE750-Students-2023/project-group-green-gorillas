import { ActionItem } from './action-item';
import { UUID } from '../../../types/uuid.type';

export class ActionItemFactory {
  static create(
    teamId: UUID,
    organisationId: UUID,
    boardId: UUID,
    note: string,
    createdBy: UUID,
  ): ActionItem {
    return new ActionItem(teamId, organisationId, boardId, note, createdBy);
  }
}
