import { Injectable } from '@nestjs/common';
import { BoardTemplateService } from '../../domain/board-template/board-template.service';
import { BoardTemplate } from '../../domain/board-template/board-template';
import { UUID } from '../../../types/uuid.type';

@Injectable()
export class RetrospectiveService {
  constructor(private readonly boardTemplateService: BoardTemplateService) {}

  public async getRetrospectiveTemplates(
    organisationId: UUID,
  ): Promise<BoardTemplate[]> {
    return this.boardTemplateService.listByOrganisationId(organisationId);
  }
}
