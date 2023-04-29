import { HttpStatus, Injectable } from '@nestjs/common';
import { BoardTemplateRepository } from './board-template.repository';
import { UUID } from '../../../types/uuid.type';
import { BoardTemplate } from './board-template';
import { InternalException } from '../../../exceptions/internal-exception';

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

  public getById(id: UUID, organisationId: UUID): Promise<BoardTemplate> {
    return this.boardTemplateRepository.getById(id, organisationId);
  }

  public async getByIdOrThrow(
    id: UUID,
    organisationId: UUID,
  ): Promise<BoardTemplate> {
    const boardTemplate = await this.getById(id, organisationId);

    if (!boardTemplate) {
      throw new InternalException(
        'BOARD_TEMPLATE.NOT_FOUND',
        'board template is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return boardTemplate;
  }
}
