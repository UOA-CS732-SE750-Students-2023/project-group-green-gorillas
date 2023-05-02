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

@Controller({
  path: ['api/action-item'],
})
@UseAuthGuard()
export class ActionItemController {
  constructor(
    private readonly actionItemService: ActionItemService,
    private readonly socketEventService: SocketEventService,
  ) {}

  @Get('/list-outstanding/:teamId')
  public async listOutstandingActionItems(
    @Param() { teamId }: ListOutstandingActionItemsParams,
  ) {
    return this.actionItemService.listOutstandingActionItems(teamId);
  }

  @Get('/list/:teamId/retro/:retroId')
  public async listRetroActionItems(
    @Param() { teamId, retroId }: ListRetroActionItemsParams,
  ) {
    return this.actionItemService.listRetroActionItems(teamId, retroId);
  }

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
