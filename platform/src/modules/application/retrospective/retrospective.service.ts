import { HttpStatus, Injectable } from '@nestjs/common';
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
import { InternalException } from '../../../exceptions/internal-exception';

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
    const hasInProgressRetro =
      await this.boardService.hasInProgressBoardByTeamId(teamId);

    if (hasInProgressRetro) {
      throw new InternalException(
        'BOARD.FAILED_TO_CREATE_RETRO',
        'Failed to create retro because there is already a in progress retro',
        HttpStatus.BAD_REQUEST,
      );
    }

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

  public async deleteRetrospective(retroId: UUID, teamId: UUID) {
    const { organisationId } = await this.boardService.getByIdOrThrow(
      retroId,
      teamId,
    );
    await this.boardService.delete(retroId, teamId);

    // TODO: delete all relevant data

    await this.teamDashboardService.decrease(
      teamId,
      organisationId,
      TeamDashboardCountKey.RetrospectiveCount,
    );
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

  public addSection(
    boardId: UUID,
    organisationId: UUID,
    teamId: UUID,
    order: number,
    createdBy: UUID,
  ) {
    return this.boardSectionService.create(
      boardId,
      organisationId,
      teamId,
      '',
      '',
      order,
      createdBy,
    );
  }

  public deleteSection(boardSectionId: UUID, boardId: UUID) {
    return this.boardSectionService.delete(boardSectionId, boardId);
  }

  public updateSectionName(boardSectionId: UUID, boardId: UUID, name: string) {
    return this.boardSectionService.updateName(boardSectionId, boardId, name);
  }

  public updateSectionDescription(
    boardSectionId: UUID,
    boardId: UUID,
    description: string,
  ) {
    return this.boardSectionService.updateDescription(
      boardSectionId,
      boardId,
      description,
    );
  }

  public getNote(boardNoteId: UUID, boardSectionId: UUID) {
    return this.boardNoteService.getByIdOrThrow(boardNoteId, boardSectionId);
  }

  public getSection(boardSectionId: UUID, boardId: UUID) {
    return this.boardSectionService.getByIdOrThrow(boardSectionId, boardId);
  }
}
