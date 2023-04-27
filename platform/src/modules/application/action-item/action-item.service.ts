import { Injectable } from '@nestjs/common';
import { ActionItemService as ActionItemDomainService } from '../../domain/action-item/action-item.service';
import { UUID } from '../../../types/uuid.type';
import { ActionItemStatus } from '../../domain/action-item/action-item';
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

  public async listOutstandingActionItems(teamId: UUID) {
    const actionItems = await this.actionItemDomainService.listByStatus(
      teamId,
      ActionItemStatus.IN_PROGRESS,
    );

    return Bluebird.map(actionItems, async (actionItem) => {
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
        assignees: assignees.filter(
          (assignee) => !!assignee && assignee.active,
        ),
      };
    });
  }
}
