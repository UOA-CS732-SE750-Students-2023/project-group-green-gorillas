import { Injectable } from '@nestjs/common';
import { ActionItemService as ActionItemDomainService } from '../../domain/action-item/action-item.service';
import { UUID } from '../../../types/uuid.type';
import {
  ActionItem,
  ActionItemStatus,
} from '../../domain/action-item/action-item';
import { BoardService } from '../../domain/board/board.service';
import * as Bluebird from 'bluebird';
import { ActionItemAssigneeService } from '../../domain/action-item-assignee/action-item-assignee.service';
import { UserService } from '../../domain/user/user.service';

@Injectable()
export class ActionItemService {
  constructor(
    private readonly actionItemDomainService: ActionItemDomainService,
    private readonly boardService: BoardService,
    private readonly actionItemAssigneeService: ActionItemAssigneeService,
    private readonly userService: UserService,
  ) {}

  private async aggregateActionItem(actionItem: ActionItem) {
    const [board, actionItemAssignees] = await Promise.all([
      this.boardService.getById(actionItem.boardId, actionItem.teamId),
      this.actionItemAssigneeService.listByActionItemId(actionItem.id),
    ]);

    const assignees = await Bluebird.map(
      actionItemAssignees,
      async (actionItemAssignee) => {
        return this.userService.getById(
          actionItemAssignee.userId,
          actionItem.organisationId,
        );
      },
    );

    return {
      ...actionItem,
      retro: board ?? null,
      assignees: assignees.filter((assignee) => !!assignee && assignee.active),
    };
  }

  private aggregateActionItems(actionItems: ActionItem[]) {
    return Bluebird.map(actionItems, async (actionItem) => {
      return this.aggregateActionItem(actionItem);
    });
  }

  public async createActionItem(
    teamId: UUID,
    organisationId: UUID,
    boardId: UUID,
    createdBy: UUID,
  ) {
    const actionItem = await this.actionItemDomainService.create(
      teamId,
      organisationId,
      boardId,
      '',
      createdBy,
    );

    return this.aggregateActionItem(actionItem);
  }

  public async listRetroActionItems(teamId: UUID, retroId: UUID) {
    const actionItems = await this.actionItemDomainService.listByBoardId(
      retroId,
      teamId,
    );

    return this.aggregateActionItems(actionItems);
  }

  public async listOutstandingActionItems(teamId: UUID) {
    const actionItems = await this.actionItemDomainService.listByStatus(
      teamId,
      ActionItemStatus.IN_PROGRESS,
    );

    return this.aggregateActionItems(actionItems);
  }
}
