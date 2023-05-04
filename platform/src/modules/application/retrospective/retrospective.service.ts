import { HttpStatus, Injectable } from '@nestjs/common';
import { BoardTemplateService } from '../../domain/board-template/board-template.service';
import { BoardTemplate } from '../../domain/board-template/board-template';
import { UUID } from '../../../types/uuid.type';
import { Board, BoardStage } from '../../domain/board/board';
import { BoardService } from '../../domain/board/board.service';
import { TeamDashboardService } from '../../domain/team-dashboard/team-dashboard.service';
import { TeamDashboardCountKey } from '../../domain/team-dashboard/team-dashboard';
import { BoardSectionService } from '../../domain/board-section/board-section.service';
import { BoardNoteService } from '../../domain/board-note/board-note.service';
import { groupBy } from 'lodash';
import { InternalException } from '../../../exceptions/internal-exception';
import { ActionItemService } from '../../domain/action-item/action-item.service';
import { UtilsService } from '../utils/utils.service';
import {
  BoardNoteColor,
  BoardNoteType,
} from '../../domain/board-note/board-note';
import { BoardNoteVoteService } from '../../domain/board-note-vote/board-note-vote.service';

@Injectable()
export class RetrospectiveService {
  constructor(
    private readonly boardTemplateService: BoardTemplateService,
    private readonly boardService: BoardService,
    private readonly teamDashboardService: TeamDashboardService,
    private readonly boardSectionService: BoardSectionService,
    private readonly boardNoteService: BoardNoteService,
    private readonly actionItemService: ActionItemService,
    private readonly utilsService: UtilsService,
    private readonly boardNoteVoteService: BoardNoteVoteService,
  ) {}

  public async getRetrospectiveTemplates(
    organisationId: UUID,
  ): Promise<BoardTemplate[]> {
    return this.boardTemplateService.listByOrganisationId(organisationId);
  }

  public voteNote(userId: UUID, boardNoteId: UUID, boardId: UUID) {
    return this.boardNoteVoteService.create(userId, boardNoteId, boardId);
  }

  public async unVoteNote(userId: UUID, boardNoteId: UUID) {
    const vote = await this.boardNoteVoteService.getByIdOrThrow(
      boardNoteId,
      userId,
    );

    await this.boardNoteVoteService.delete(boardNoteId, userId);

    return vote;
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
    const [board, boardSections, boardNotes, actionItems, boardNoteVotes] =
      await Promise.all([
        this.boardService.getByIdOrThrow(boardId, teamId),
        this.boardSectionService.listByBoardId(boardId),
        this.boardNoteService.listByBoardId(boardId),
        this.actionItemService.listByBoardId(boardId, teamId),
        this.boardNoteVoteService.listByBoardId(boardId),
      ]);

    const boardNoteVotesGroup = groupBy(boardNoteVotes, 'boardNoteId');

    const boardNotesWithVotes = boardNotes.map((boardNote) => ({
      ...boardNote,
      boardNoteVotes: boardNoteVotesGroup[boardNote.id] ?? [],
    }));

    const boardNoteGroup = groupBy(boardNotesWithVotes, 'boardSectionId');

    const mappedBoardSections = boardSections.map((boardSection) => ({
      ...boardSection,
      boardNotes: boardNoteGroup[boardSection.id] ?? [],
    }));

    const mappedActionItems = await this.utilsService.aggregateActionItems(
      actionItems,
    );

    return {
      ...board,
      boardSections: mappedBoardSections,
      actionItems: mappedActionItems,
    };
  }

  public updateRetroName(retroId: UUID, teamId: UUID, name: string) {
    return this.boardService.updateName(retroId, teamId, name);
  }

  public setRetroSessionPayload(
    retroId: UUID,
    teamId: UUID,
    sessionPayload: { [key in string]: any },
  ) {
    return this.boardService.setSessionPayload(retroId, teamId, sessionPayload);
  }

  public async moveNextStage(retroId: UUID, teamId: UUID) {
    const board = await this.boardService.getByIdOrThrow(retroId, teamId);

    let stage = board.stage;

    switch (stage) {
      case BoardStage.THINK:
        stage = BoardStage.GROUP;
        break;
      case BoardStage.GROUP:
        stage = BoardStage.VOTE;
        break;
      case BoardStage.VOTE:
        stage = BoardStage.DISCUSS;
        break;
      case BoardStage.DISCUSS:
        stage = BoardStage.FINALIZE;
        break;
    }

    return this.boardService.updateStage(retroId, teamId, stage);
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
    type: BoardNoteType,
    parentId: UUID | null,
    noteColor: BoardNoteColor,
    note: string,
  ) {
    return this.boardNoteService.create(
      boardSectionId,
      boardId,
      organisationId,
      teamId,
      note,
      createdBy,
      type,
      parentId,
      noteColor,
    );
  }

  public updateNote(boardNoteId: UUID, note: string) {
    return this.boardNoteService.updateNote(boardNoteId, note);
  }

  public assignNoteGroup(boardNoteId: UUID, parentId: UUID, boardSectionId) {
    return this.boardNoteService.assignNoteGroup(
      boardNoteId,
      parentId,
      boardSectionId,
    );
  }

  public unAssignNoteGroup(boardNoteId: UUID, boardSectionId: UUID) {
    return this.boardNoteService.unAssignNoteGroup(boardNoteId, boardSectionId);
  }

  public deleteNote(boardNoteId: UUID) {
    return this.boardNoteService.delete(boardNoteId);
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

  public getNote(boardNoteId: UUID) {
    return this.boardNoteService.getByIdOrThrow(boardNoteId);
  }

  public getSection(boardSectionId: UUID, boardId: UUID) {
    return this.boardSectionService.getByIdOrThrow(boardSectionId, boardId);
  }
}
