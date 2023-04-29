import { Controller, Get, Param } from '@nestjs/common';
import { UseAuthGuard } from '../../../utils/guards/auth-guard/auth.guard';
import { ActionItemService } from './action-item.service';
import { ListOutstandingActionItems } from './dto/request';

@Controller({
  path: ['api/action-item'],
})
@UseAuthGuard()
export class ActionItemController {
  constructor(private readonly actionItemService: ActionItemService) {}

  @Get('/list-outstanding/:teamId')
  public async listOutstandingActionItems(
    @Param() { teamId }: ListOutstandingActionItems,
  ) {
    return this.actionItemService.listOutstandingActionItems(teamId);
  }
}
