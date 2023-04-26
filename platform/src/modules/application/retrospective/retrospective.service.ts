import { Injectable } from '@nestjs/common';
import { BoardTemplateService } from '../../domain/board-template/board-template.service';
import { BoardTemplate } from '../../domain/board-template/board-template';
import { UUID } from '../../../types/uuid.type';
import { Board } from '../../domain/board/board';
import { BoardService } from '../../domain/board/board.service';
import { TeamDashboardService } from '../../domain/team-dashboard/team-dashboard.service';
import { TeamDashboardCountKey } from '../../domain/team-dashboard/team-dashboard';

@Injectable()
export class RetrospectiveService {
  constructor(
    private readonly boardTemplateService: BoardTemplateService,
    private readonly boardService: BoardService,
    private readonly teamDashboardService: TeamDashboardService,
  ) {}

  public async getRetrospectiveTemplates(
    organisationId: UUID,
  ): Promise<BoardTemplate[]> {
    return this.boardTemplateService.listByOrganisationId(organisationId);
  }

  public async createRetrospective(
    name: string,
    templateId: UUID,
    teamId: UUID,
    organisationId: UUID,
    createdBy: UUID,
  ): Promise<Board> {
    const board = await this.boardService.create(
      name,
      organisationId,
      teamId,
      createdBy,
    );

    await this.teamDashboardService.increase(
      teamId,
      organisationId,
      TeamDashboardCountKey.RetrospectiveCount,
    );

    return board;
  }
}
