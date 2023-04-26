import { BoardTemplate, BoardTemplateSection } from './board-template';
import { UUID } from '../../../types/uuid.type';

export class BoardTemplateFactory {
  static create(
    organisationId: UUID,
    name: string,
    description: string,
    descriptionLong: string,
    boardTemplateSections: BoardTemplateSection[],
    createdBy: UUID,
  ): BoardTemplate {
    return new BoardTemplate(
      organisationId,
      name,
      description,
      descriptionLong,
      boardTemplateSections,
      createdBy,
    );
  }
}
