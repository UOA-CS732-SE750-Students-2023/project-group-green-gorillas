import { Injectable } from '@nestjs/common';
import { OrganisationService as OrganisationDomainService } from '../../domain/organisation/organisation.service';
import { UUID } from '../../../types/uuid.type';

@Injectable()
export class OrganisationService {
  constructor(
    private readonly organisationDomainService: OrganisationDomainService,
  ) {}

  public updateOrganisationName(organisationId: UUID, name: string) {
    return this.organisationDomainService.updateName(organisationId, name);
  }
}
