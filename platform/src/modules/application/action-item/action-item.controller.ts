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
  ListOutstandingActionItemsParams,
  ListRetroActionItemsParams,
  UpdateActionItemNoteRequest,
  UpdateActionStatusRequest,
} from './dto/request';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';

@Controller({
  path: ['api/action-item'],
})
@UseAuthGuard()
export class ActionItemController {
  constructor(private readonly actionItemService: ActionItemService) {}

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
    return this.actionItemService.createActionItem(
      teamId,
      user.organisationId,
      retroId,
      user.id,
    );
  }

  @Delete('/:actionItemId')
  public async deleteActionItem(@Param() { actionItemId }: any) {
    return this.actionItemService.deleteActionItem(actionItemId);
  }

  @Patch('update-note')
  public async updateActionItemNote(
    @Body() { actionItemId, note }: UpdateActionItemNoteRequest,
  ) {
    return this.actionItemService.updateActionItemNote(actionItemId, note);
  }

  @Patch('update-status')
  public async updateActionStatus(
    @Body() { actionItemId, status }: UpdateActionStatusRequest,
  ) {
    return this.actionItemService.updateActionItemStatus(actionItemId, status);
  }
}
