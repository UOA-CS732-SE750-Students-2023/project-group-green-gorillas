import { ActionItemRepository } from './action-item.repository';
import { UUID } from '../../../types/uuid.type';
import { ActionItem, ActionItemStatus } from './action-item';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ActionItemFactory } from './action-item.factory';
import { InternalException } from '../../../exceptions/internal-exception';

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

  public delete(id: UUID): Promise<void> {
    return this.actionItemRepository.delete(id);
  }

  public getById(id: UUID): Promise<ActionItem | undefined> {
    return this.actionItemRepository.getById(id);
  }

  public async getByIdOrThrow(id: UUID): Promise<ActionItem> {
    const actionItem = await this.getById(id);

    if (!actionItem) {
      throw new InternalException(
        'ACTION_ITEM.NOT_FOUND',
        'action action is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return actionItem;
  }

  public async updateNote(
    id: UUID,
    note: string,
    updatedBy: UUID,
  ): Promise<ActionItem> {
    const actionItem = await this.getByIdOrThrow(id);

    actionItem.updateNote(note, updatedBy);

    return this.actionItemRepository.save(actionItem);
  }

  public async updateStatus(
    id: UUID,
    status: ActionItemStatus,
    updatedBy: UUID,
  ): Promise<ActionItem> {
    const actionItem = await this.getByIdOrThrow(id);

    actionItem.updateStatus(status, updatedBy);

    return this.actionItemRepository.save(actionItem);
  }
}
