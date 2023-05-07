import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrganisationRepository } from './organisation.repository';
import { Organisation } from './organisation';
import { OrganisationFactory } from './organisation.factory';
import { UUID } from '../../../types/uuid.type';
import { InternalException } from '../../../exceptions/internal-exception';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { classToPlain, plainToClass } from 'class-transformer';
import { User } from '../user/user';

@Injectable()
export class OrganisationService {
  constructor(
    private readonly organisationRepository: OrganisationRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private static buildOrganisationCacheKey(organisationId: UUID): string {
    return `organisation-${organisationId}`;
  }

  public create(name: string): Promise<Organisation> {
    const organisation = OrganisationFactory.create(name);

    return this.save(organisation);
  }

  public async getById(id: UUID): Promise<Organisation | undefined> {
    const rawCacheOrganisation = await this.cacheManager.get<string>(
      OrganisationService.buildOrganisationCacheKey(id),
    );

    if (rawCacheOrganisation) {
      const cacheOrganisation = JSON.parse(rawCacheOrganisation);

      return cacheOrganisation
        ? plainToClass(Organisation, cacheOrganisation)
        : undefined;
    }

    const organisation = await this.organisationRepository.getById(id);

    await this.cacheManager.set(
      OrganisationService.buildOrganisationCacheKey(id),
      !!organisation ? JSON.stringify(classToPlain(organisation)) : undefined,
      3600,
    );

    return organisation;
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

  public async save(organisation: Organisation): Promise<Organisation> {
    await this.cacheManager.del(
      OrganisationService.buildOrganisationCacheKey(organisation.id),
    );
    return this.organisationRepository.save(organisation);
  }

  public async activate(id: UUID): Promise<Organisation> {
    const organisation = await this.getByIdOrThrow(id);

    organisation.activate();

    return this.save(organisation);
  }

  public async disable(id: UUID): Promise<Organisation> {
    const organisation = await this.getByIdOrThrow(id);

    organisation.disable();

    return this.save(organisation);
  }
}
