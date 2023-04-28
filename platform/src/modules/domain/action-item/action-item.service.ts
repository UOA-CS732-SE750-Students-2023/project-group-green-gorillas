import { ActionItemRepository } from './action-item.repository';
import { UUID } from '../../../types/uuid.type';
import { ActionItem, ActionItemStatus } from './action-item';
import { Injectable } from '@nestjs/common';
import { ActionItemFactory } from './action-item.factory';

@Injectable()
export class ActionItemService {
  constructor(private readonly actionItemRepository: ActionItemRepository) {}

  public listByStatus(
    teamId: UUID,
    status: ActionItemStatus,
  ): Promise<ActionItem[]> {
    return this.actionItemRepository.listByStatus(teamId, status);
  }

  public listByBoardId(boardId: UUID, teamId: UUID): Promise<ActionItem[]> {
    return this.actionItemRepository.listByBoardId(teamId, boardId);
  }

  public save(actionItem: ActionItem): Promise<ActionItem> {
    return this.actionItemRepository.save(actionItem);
  }

  public create(
    teamId: UUID,
    organisationId: UUID,
    boardId: UUID,
    note: string,
    createdBy: UUID,
  ) {
    return this.actionItemRepository.save(
      ActionItemFactory.create(
        teamId,
        organisationId,
        boardId,
        note,
        createdBy,
      ),
    );
  }
}
