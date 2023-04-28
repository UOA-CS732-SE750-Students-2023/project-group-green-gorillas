import { ActionItemRepository } from './action-item.repository';
import { UUID } from '../../../types/uuid.type';
import { ActionItem, ActionItemStatus } from './action-item';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionItemService {
  constructor(private readonly actionItemRepository: ActionItemRepository) {}

  public listByStatus(
    teamId: UUID,
    status: ActionItemStatus,
  ): Promise<ActionItem[]> {
    return this.actionItemRepository.listByStatus(teamId, status);
  }

  public save(actionItem: ActionItem): Promise<ActionItem> {
    return this.actionItemRepository.save(actionItem);
  }
}
