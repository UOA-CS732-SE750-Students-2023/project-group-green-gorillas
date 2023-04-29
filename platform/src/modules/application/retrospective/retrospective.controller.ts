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
  CreateRetroRequestRequest,
  DeleteNoteRequestParams,
  DeleteRetrospectiveRequestParams,
  GetRetrospectiveRequestParam,
  UpdateNoteRequest,
  UpdateRetroNameRequest,
} from './dto/request';

@Controller({
  path: ['api/retrospective'],
})
@UseAuthGuard()
export class RetrospectiveController {
  constructor(private readonly retrospectiveService: RetrospectiveService) {}

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
    return this.retrospectiveService.addNote(
      boardSectionId,
      boardId,
      user.organisationId,
      teamId,
      user.id,
    );
  }

  @Patch('update-name')
  public async updateRetroName(
    @Body() { id, teamId, name }: UpdateRetroNameRequest,
  ) {
    return this.retrospectiveService.updateRetroName(id, teamId, name);
  }

  @Patch('update-note')
  public async updateNote(
    @Body() { boardNoteId, boardSectionId, note }: UpdateNoteRequest,
  ) {
    return this.retrospectiveService.updateNote(
      boardNoteId,
      boardSectionId,
      note,
    );
  }

  @Delete(':id/team/:teamId')
  public async deleteRetrospective(
    @Param() { id, teamId }: DeleteRetrospectiveRequestParams,
  ) {
    return this.retrospectiveService.deleteRetrospective(id, teamId);
  }

  @Delete('delete-note/:boardNoteId/board-section/:boardSectionId')
  public async deleteNote(
    @Param() { boardNoteId, boardSectionId }: DeleteNoteRequestParams,
  ) {
    return this.retrospectiveService.deleteNote(boardNoteId, boardSectionId);
  }
}
