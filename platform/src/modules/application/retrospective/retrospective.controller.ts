import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RetrospectiveService } from './retrospective.service';
import { UseAuthGuard } from '../../../utils/guards/auth-guard/auth.guard';
import {
  RequestUser,
  RequestUserType,
} from '../../../utils/decorators/request-user';
import {
  AddNoteRequest,
  AddSectionRequest,
  CreateRetroRequestRequest,
  DeleteNoteRequestParams,
  DeleteRetrospectiveRequestParams,
  DeleteSectionParams,
  GetRetrospectiveRequestParam,
  UpdateNoteRequest,
  UpdateRetroNameRequest,
  UpdateSectionDescriptionRequest,
  UpdateSectionNameRequest,
} from './dto/request';
import { SocketEventService } from '../../gateway/socket/socket-event.service';
import { ClientSocketMessageEvent } from '../../gateway/socket/socket.gateway';
import {
  buildSocketEvent,
  SocketEventOperation,
} from '../../../utils/builders/buildSocketEvent';

@Controller({
  path: ['api/retrospective'],
})
@UseAuthGuard()
export class RetrospectiveController {
  constructor(
    private readonly retrospectiveService: RetrospectiveService,
    private readonly socketEventService: SocketEventService,
  ) {}

  @Get('template/list')
  public async getRetrospectiveTemplates(@RequestUser() user: RequestUserType) {
    return this.retrospectiveService.getRetrospectiveTemplates(
      user.organisationId,
    );
  }

  @Get(':id/team/:teamId')
  public getRetrospective(
    @Param() { id, teamId }: GetRetrospectiveRequestParam,
  ) {
    return this.retrospectiveService.getRetrospective(id, teamId);
  }

  @Post('create')
  public async createRetrospective(
    @Body() { teamId, name, templateId }: CreateRetroRequestRequest,
    @RequestUser() user: RequestUserType,
  ) {
    // NOTE: do not need to send the socket event
    return this.retrospectiveService.createRetrospective(
      name,
      templateId,
      teamId,
      user.organisationId,
      user.id,
    );
  }

  @Post('add-note')
  public async addNote(
    @Body() { boardId, boardSectionId, teamId }: AddNoteRequest,
    @RequestUser() user: RequestUserType,
  ) {
    const note = await this.retrospectiveService.addNote(
      boardSectionId,
      boardId,
      user.organisationId,
      teamId,
      user.id,
    );

    this.socketEventService.broadcastRoom(
      note.boardId,
      ClientSocketMessageEvent.BOARD_NOTE,
      buildSocketEvent(SocketEventOperation.CREATE, note),
    );

    return note;
  }

  @Post('add-section')
  public async addSection(
    @Body() { boardId, teamId, order }: AddSectionRequest,
    @RequestUser() user: RequestUserType,
  ) {
    const section = await this.retrospectiveService.addSection(
      boardId,
      user.organisationId,
      teamId,
      order,
      user.id,
    );

    this.socketEventService.broadcastRoom(
      section.boardId,
      ClientSocketMessageEvent.BOARD_SECTION,
      buildSocketEvent(SocketEventOperation.CREATE, section),
    );

    return section;
  }

  @Patch('update-name')
  public async updateRetroName(
    @Body() { id, teamId, name }: UpdateRetroNameRequest,
  ) {
    const retro = await this.retrospectiveService.updateRetroName(
      id,
      teamId,
      name,
    );

    this.socketEventService.broadcastRoom(
      retro.id,
      ClientSocketMessageEvent.BOARD,
      buildSocketEvent(SocketEventOperation.CREATE, retro),
    );

    return retro;
  }

  @Patch('update-note')
  public async updateNote(
    @Body() { boardNoteId, boardSectionId, note }: UpdateNoteRequest,
  ) {
    const boardNote = await this.retrospectiveService.updateNote(
      boardNoteId,
      boardSectionId,
      note,
    );

    this.socketEventService.broadcastRoom(
      boardNote.boardId,
      ClientSocketMessageEvent.BOARD_NOTE,
      buildSocketEvent(SocketEventOperation.UPDATE, boardNote),
    );

    return boardNote;
  }

  @Patch('update-section-name')
  public async updateSectionName(
    @Body() { boardSectionId, boardId, name }: UpdateSectionNameRequest,
  ) {
    const boardSection = await this.retrospectiveService.updateSectionName(
      boardSectionId,
      boardId,
      name,
    );

    this.socketEventService.broadcastRoom(
      boardSection.boardId,
      ClientSocketMessageEvent.BOARD_SECTION,
      buildSocketEvent(SocketEventOperation.UPDATE, boardSection),
    );

    return boardSection;
  }

  @Patch('update-section-description')
  public async updateSectionDescription(
    @Body()
    { boardSectionId, boardId, description }: UpdateSectionDescriptionRequest,
  ) {
    const boardSection =
      await this.retrospectiveService.updateSectionDescription(
        boardSectionId,
        boardId,
        description,
      );

    this.socketEventService.broadcastRoom(
      boardSection.boardId,
      ClientSocketMessageEvent.BOARD_SECTION,
      buildSocketEvent(SocketEventOperation.UPDATE, boardSection),
    );

    return boardSection;
  }

  @Delete(':id/team/:teamId')
  public async deleteRetrospective(
    @Param() { id, teamId }: DeleteRetrospectiveRequestParams,
  ) {
    const retro = await this.retrospectiveService.getRetrospective(id, teamId);

    await this.retrospectiveService.deleteRetrospective(id, teamId);

    this.socketEventService.broadcastRoom(
      retro.id,
      ClientSocketMessageEvent.BOARD,
      buildSocketEvent(SocketEventOperation.DELETE, retro),
    );

    return retro;
  }

  @Delete('delete-note/:boardNoteId/board-section/:boardSectionId')
  public async deleteNote(
    @Param() { boardNoteId, boardSectionId }: DeleteNoteRequestParams,
  ) {
    const note = await this.retrospectiveService.getNote(
      boardNoteId,
      boardSectionId,
    );

    await this.retrospectiveService.deleteNote(boardNoteId, boardSectionId);

    this.socketEventService.broadcastRoom(
      note.boardId,
      ClientSocketMessageEvent.BOARD_NOTE,
      buildSocketEvent(SocketEventOperation.DELETE, note),
    );
  }

  @Delete('delete-section/:boardSectionId/board/:boardId')
  public async deleteSection(
    @Param() { boardSectionId, boardId }: DeleteSectionParams,
  ) {
    const section = await this.retrospectiveService.getSection(
      boardSectionId,
      boardId,
    );

    await this.retrospectiveService.deleteSection(boardSectionId, boardId);

    this.socketEventService.broadcastRoom(
      section.boardId,
      ClientSocketMessageEvent.BOARD_SECTION,
      buildSocketEvent(SocketEventOperation.DELETE, section),
    );
  }
}
