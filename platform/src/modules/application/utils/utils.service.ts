import { Injectable } from '@nestjs/common';
import { ActionItem } from '../../domain/action-item/action-item';
import * as Bluebird from 'bluebird';
import { BoardService } from '../../domain/board/board.service';
import { ActionItemAssigneeService } from '../../domain/action-item-assignee/action-item-assignee.service';
import { UserService } from '../../domain/user/user.service';

@Injectable()
export class UtilsService {
  constructor(
    private readonly boardService: BoardService,
    private readonly actionItemAssigneeService: ActionItemAssigneeService,
    private readonly userService: UserService,
  ) {}

  public async aggregateActionItem(actionItem: ActionItem) {
    const [board, actionItemAssignees] = await Promise.all([
      this.boardService.getById(actionItem.boardId, actionItem.teamId),
      this.actionItemAssigneeService.listByActionItemId(actionItem.id),
    ]);

    console.log(actionItem.boardId, actionItem.teamId);

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

  public aggregateActionItems(actionItems: ActionItem[]) {
    return Bluebird.map(actionItems, async (actionItem) => {
      return this.aggregateActionItem(actionItem);
    });
  }
}
