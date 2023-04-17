import { HttpStatus, Injectable } from '@nestjs/common';
import { OrganisationRepository } from './organisation.repository';
import { Organisation } from './organisation';
import { OrganisationFactory } from './organisation.factory';
import { UUID } from '../../../types/uuid.type';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class OrganisationService {
  constructor(
    private readonly organisationRepository: OrganisationRepository,
  ) {}

  public create(name: string): Promise<Organisation> {
    const organisation = OrganisationFactory.create(name);

    return this.organisationRepository.save(organisation);
  }

  public getById(id: UUID): Promise<Organisation | undefined> {
    return this.organisationRepository.getById(id);
  }

  public async getByIdOrThrow(id: UUID): Promise<Organisation> {
    const organisation = await this.getById(id);

    if (!organisation) {
      throw new InternalException(
        'ORGANISATION.NOT_FOUND',
        'organisation is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return organisation;
  }

  public async activate(id: UUID): Promise<Organisation> {
    const organisation = await this.getByIdOrThrow(id);

    organisation.activate();

    return this.organisationRepository.save(organisation);
  }

  public async disable(id: UUID): Promise<Organisation> {
    const organisation = await this.getByIdOrThrow(id);

    organisation.disable();

    return this.organisationRepository.save(organisation);
  }
}
