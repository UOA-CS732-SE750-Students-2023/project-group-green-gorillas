import { Injectable } from '@nestjs/common';
import { BoardTemplateRepository } from './board-template.repository';
import { UUID } from '../../../types/uuid.type';
import { BoardTemplate } from './board-template';

@Injectable()
export class BoardTemplateService {
  constructor(
    private readonly boardTemplateRepository: BoardTemplateRepository,
  ) {}

  public async listByOrganisationId(
    organisationId: UUID,
  ): Promise<BoardTemplate[]> {
    return this.boardTemplateRepository.listByOrganisationId(organisationId);
  }

  public async save(boardtemplate: BoardTemplate): Promise<BoardTemplate> {
    return this.boardTemplateRepository.save(boardtemplate);
  }
}
