import { Injectable } from '@nestjs/common';
import { BoardTemplateService } from '../../domain/board-template/board-template.service';
import { BoardTemplate } from '../../domain/board-template/board-template';
import { UUID } from '../../../types/uuid.type';
import { Board } from '../../domain/board/board';
import { BoardService } from '../../domain/board/board.service';
import { TeamDashboardService } from '../../domain/team-dashboard/team-dashboard.service';
import { TeamDashboardCountKey } from '../../domain/team-dashboard/team-dashboard';
import { BoardSectionService } from '../../domain/board-section/board-section.service';
import { BoardNoteService } from '../../domain/board-note/board-note.service';
import { groupBy } from 'lodash';

@Injectable()
export class RetrospectiveService {
  constructor(
    private readonly boardTemplateService: BoardTemplateService,
    private readonly boardService: BoardService,
    private readonly teamDashboardService: TeamDashboardService,
    private readonly boardSectionService: BoardSectionService,
    private readonly boardNoteService: BoardNoteService,
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
    const boardTemplate = await this.boardTemplateService.getByIdOrThrow(
      templateId,
      organisationId,
    );

    const boardTemplateSection = boardTemplate.boardTemplateSections;

    const board = await this.boardService.create(
      name,
      organisationId,
      teamId,
      createdBy,
    );

    await Promise.all(
      boardTemplateSection.map(({ name, description, order }) =>
        this.boardSectionService.create(
          board.id,
          organisationId,
          teamId,
          name,
          description,
          order,
          createdBy,
        ),
      ),
    );

    await this.teamDashboardService.increase(
      teamId,
      organisationId,
      TeamDashboardCountKey.RetrospectiveCount,
    );

    return board;
  }

  public async getRetrospective(boardId: UUID, teamId: UUID) {
    const [board, boardSections, boardNotes] = await Promise.all([
      this.boardService.getByIdOrThrow(boardId, teamId),
      this.boardSectionService.listByBoardId(boardId),
      this.boardNoteService.listByBoardId(boardId),
    ]);

    const boardNoteGroup = groupBy(boardNotes, 'boardSectionId');

    const mappedBoardSections = boardSections.map((boardSection) => ({
      ...boardSection,
      boardNotes: boardNoteGroup[boardSection.id] ?? [],
    }));

    return {
      ...board,
      boardSections: mappedBoardSections,
    };
  }

  public updateRetroName(retroId: UUID, teamId: UUID, name: string) {
    return this.boardService.updateName(retroId, teamId, name);
  }

  public deleteRetrospective(retroId: UUID, teamId: UUID) {
    return this.boardService.deleteBoard(retroId, teamId);
  }

  public addNote(
    boardSectionId: UUID,
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    createdBy: UUID,
  ) {
    return this.boardNoteService.create(
      boardSectionId,
      boardId,
      organisationId,
      teamId,
      '',
      createdBy,
    );
  }

  public updateNote(boardNoteId: UUID, boardSectionId: UUID, note) {
    return this.boardNoteService.updateNote(boardNoteId, boardSectionId, note);
  }

  public deleteNote(boardNoteId: UUID, boardSectionId: UUID) {
    return this.boardNoteService.delete(boardNoteId, boardSectionId);
  }
}
