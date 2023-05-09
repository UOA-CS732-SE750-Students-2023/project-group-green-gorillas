import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UseAuthGuard } from '../../../utils/guards/auth-guard/auth.guard';
import { ActionItemService } from './action-item.service';
import {
  AssignUserToActionItemRequest,
  CreateActionItemRequest,
  DeleteActionItemRequestParams,
  ListOutstandingActionItemsParams,
  ListRetroActionItemsParams,
  UpdateActionItemNoteRequest,
  UpdateActionStatusRequest,
} from './dto/request';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';
import { SocketEventService } from '../../gateway/socket/socket-event.service';
import { ClientSocketMessageEvent } from '../../gateway/socket/socket.gateway';
import {
  buildSocketEvent,
  SocketEventOperation,
} from '../../../utils/builders/buildSocketEvent';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ActionItem } from '../../domain/action-item/action-item';
import { ActionItemResponse } from './dto/response';

@ApiTags('Action Item')
@Controller({
  path: ['api/action-item'],
})
@UseAuthGuard()
export class ActionItemController {
  constructor(
    private readonly actionItemService: ActionItemService,
    private readonly socketEventService: SocketEventService,
  ) {}

  @ApiOkResponse({
    description: 'list all outstanding action items by team id',
    isArray: true,
    type: ActionItemResponse,
  })
  @Get('/list-outstanding/:teamId')
  public async listOutstandingActionItems(
    @Param() { teamId }: ListOutstandingActionItemsParams,
  ) {
    return this.actionItemService.listOutstandingActionItems(teamId);
  }

  @ApiOkResponse({
    description: 'list all action items by retro id and team id',
    isArray: true,
    type: ActionItemResponse,
  })
  @Get('/list/:teamId/retro/:retroId')
  public async listRetroActionItems(
    @Param() { teamId, retroId }: ListRetroActionItemsParams,
  ) {
    return this.actionItemService.listRetroActionItems(teamId, retroId);
  }

  @ApiOkResponse({
    description: 'assign user to action item',
  })
  @Post('/assign-user')
  public async assignUserToActionItem(
    @Body() { userId, actionItemId }: AssignUserToActionItemRequest,
  ) {
    const actionItemAssignee =
      await this.actionItemService.assignUserToActionItem(userId, actionItemId);

    const actionItem = await this.actionItemService.getActionItemById(
      actionItemAssignee.actionItemId,
    );

    this.socketEventService.broadcastRoom(
      actionItem.boardId,
      ClientSocketMessageEvent.BOARD_ACTION_ITEM,
      buildSocketEvent(SocketEventOperation.UPDATE, actionItem),
    );

    return actionItemAssignee;
  }

  @ApiOkResponse({
    description: 'unassign user to action item',
  })
  @Delete('/un-assign-user')
  public async unAssignUserToActionItem(
    @Body() { userId, actionItemId }: AssignUserToActionItemRequest,
  ) {
    await this.actionItemService.unAssignUserToActionItem(userId, actionItemId);

    const actionItem = await this.actionItemService.getActionItemById(
      actionItemId,
    );

    this.socketEventService.broadcastRoom(
      actionItem.boardId,
      ClientSocketMessageEvent.BOARD_ACTION_ITEM,
      buildSocketEvent(SocketEventOperation.UPDATE, actionItem),
    );
  }

  @ApiOkResponse({
    description: 'create action item',
    type: ActionItemResponse,
  })
  @Post('/')
  public async createActionItem(
    @RequestUser() user: RequestUserType,
    @Body() { teamId, retroId }: CreateActionItemRequest,
  ) {
    const actionItem = await this.actionItemService.createActionItem(
      teamId,
      user.organisationId,
      retroId,
      user.id,
    );

    this.socketEventService.broadcastRoom(
      retroId,
      ClientSocketMessageEvent.BOARD_ACTION_ITEM,
      buildSocketEvent(SocketEventOperation.CREATE, actionItem),
    );

    return actionItem;
  }

  @Delete('/:actionItemId')
  @ApiOkResponse({
    description: 'delete action action item',
  })
  public async deleteActionItem(
    @Param() { actionItemId }: DeleteActionItemRequestParams,
  ) {
    const actionItem = await this.actionItemService.getActionItemById(
      actionItemId,
    );

    await this.actionItemService.deleteActionItem(actionItemId);

    this.socketEventService.broadcastRoom(
      actionItem.boardId,
      ClientSocketMessageEvent.BOARD_ACTION_ITEM,
      buildSocketEvent(SocketEventOperation.DELETE, actionItem),
    );
  }

  @ApiOkResponse({
    description: 'update action item note',
    type: ActionItemResponse,
  })
  @Patch('update-note')
  public async updateActionItemNote(
    @RequestUser() user: RequestUserType,
    @Body() { actionItemId, note }: UpdateActionItemNoteRequest,
  ) {
    const actionItem = await this.actionItemService.updateActionItemNote(
      actionItemId,
      note,
      user.id,
    );

    this.socketEventService.broadcastRoom(
      actionItem.boardId,
      ClientSocketMessageEvent.BOARD_ACTION_ITEM,
      buildSocketEvent(SocketEventOperation.UPDATE, actionItem),
    );

    return actionItem;
  }

  @ApiOkResponse({
    description: 'update action item status',
    type: ActionItemResponse,
  })
  @Patch('update-status')
  public async updateActionStatus(
    @RequestUser() user: RequestUserType,
    @Body() { actionItemId, status }: UpdateActionStatusRequest,
  ) {
    const actionItem = await this.actionItemService.updateActionItemStatus(
      actionItemId,
      status,
      user.id,
    );

    this.socketEventService.broadcastRoom(
      actionItem.boardId,
      ClientSocketMessageEvent.BOARD_ACTION_ITEM,
      buildSocketEvent(SocketEventOperation.UPDATE, actionItem),
    );

    return actionItem;
  }
}
