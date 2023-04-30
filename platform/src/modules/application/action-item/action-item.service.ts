import { Injectable } from '@nestjs/common';
import { ActionItemService as ActionItemDomainService } from '../../domain/action-item/action-item.service';
import { UUID } from '../../../types/uuid.type';
import { ActionItemStatus } from '../../domain/action-item/action-item';
import { BoardService } from '../../domain/board/board.service';
import { TeamDashboardService } from '../../domain/team-dashboard/team-dashboard.service';
import { TeamDashboardCountKey } from '../../domain/team-dashboard/team-dashboard';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ActionItemService {
  constructor(
    private readonly actionItemDomainService: ActionItemDomainService,
    private readonly boardService: BoardService,
    private readonly teamDashboardService: TeamDashboardService,
    private readonly utilsService: UtilsService,
  ) {}

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

    await this.teamDashboardService.increase(
      teamId,
      organisationId,
      TeamDashboardCountKey.CompletedActionItemCount,
    );

    return this.utilsService.aggregateActionItem(actionItem);
  }

  public async deleteActionItem(actionItemId: UUID): Promise<void> {
    const actionItem = await this.actionItemDomainService.getByIdOrThrow(
      actionItemId,
    );

    await this.actionItemDomainService.delete(actionItemId);

    await this.teamDashboardService.decrease(
      actionItem.teamId,
      actionItem.organisationId,
      actionItem.status === ActionItemStatus.IN_PROGRESS
        ? TeamDashboardCountKey.OutstandingActionItemCount
        : TeamDashboardCountKey.CompletedActionItemCount,
    );
  }

  public async listRetroActionItems(teamId: UUID, retroId: UUID) {
    const actionItems = await this.actionItemDomainService.listByBoardId(
      retroId,
      teamId,
    );

    return this.utilsService.aggregateActionItems(actionItems);
  }

  public async listOutstandingActionItems(teamId: UUID) {
    const actionItems = await this.actionItemDomainService.listByStatus(
      teamId,
      ActionItemStatus.IN_PROGRESS,
    );

    return this.utilsService.aggregateActionItems(actionItems);
  }

  public async updateActionItemNote(actionItemId: UUID, note: string) {
    const actionItem = await this.actionItemDomainService.updateNote(
      actionItemId,
      note,
    );

    return this.utilsService.aggregateActionItem(actionItem);
  }

  public async updateActionItemStatus(
    actionItemId: UUID,
    status: ActionItemStatus,
  ) {
    const actionItem = await this.actionItemDomainService.getByIdOrThrow(
      actionItemId,
    );

    if (actionItem.status === status) {
      return this.utilsService.aggregateActionItem(actionItem);
    }

    const updatedActionItem = await this.actionItemDomainService.updateStatus(
      actionItemId,
      status,
    );

    await Promise.all([
      this.teamDashboardService.increase(
        actionItem.teamId,
        actionItem.organisationId,
        status === ActionItemStatus.IN_PROGRESS
          ? TeamDashboardCountKey.OutstandingActionItemCount
          : TeamDashboardCountKey.CompletedActionItemCount,
      ),
      this.teamDashboardService.decrease(
        actionItem.teamId,
        actionItem.organisationId,
        status === ActionItemStatus.IN_PROGRESS
          ? TeamDashboardCountKey.CompletedActionItemCount
          : TeamDashboardCountKey.OutstandingActionItemCount,
      ),
    ]);

    return this.utilsService.aggregateActionItem(updatedActionItem);
  }

  public async getActionItemById(actionId: UUID) {
    const actionItem = await this.actionItemDomainService.getByIdOrThrow(
      actionId,
    );

    return this.utilsService.aggregateActionItem(actionItem);
  }
}
