import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UUID } from '../../../types/uuid.type';
import { Team } from './team';
import { TeamRepository } from './team.repository';
import { InternalException } from '../../../exceptions/internal-exception';
import { TeamFactory } from './team.factory';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public async getById(
    id: UUID,
    organisationId: UUID,
  ): Promise<Team | undefined> {
    const rawCacheTeam = await this.cacheManager.get<string>(
      TeamService.buildTeamCacheKey(id, organisationId),
    );

    if (rawCacheTeam) {
      const cacheTeam = JSON.parse(rawCacheTeam);

      return cacheTeam ? plainToClass(Team, cacheTeam) : undefined;
    }

    const team = await this.teamRepository.getById(id, organisationId);

    await this.cacheManager.set(
      TeamService.buildTeamCacheKey(id, organisationId),
      !!team ? JSON.stringify(classToPlain(team)) : undefined,
      3600,
    );

    return team;
  }

  private static buildTeamCacheKey(teamId: UUID, organisationId: UUID): string {
    return `team-${teamId}-${organisationId}`;
  }

  public async save(team: Team): Promise<Team> {
    await this.cacheManager.del(
      TeamService.buildTeamCacheKey(team.id, team.organisationId),
    );
    return this.teamRepository.save(team);
  }

  public async getByIdOrThrow(id: UUID, organisationId: UUID): Promise<Team> {
    const team = await this.getById(id, organisationId);

    if (!team) {
      throw new InternalException(
        'TEAM.NOT_FOUND',
        'team is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return team;
  }

  public listByOrganisationId(organisationId: UUID): Promise<Team[]> {
    return this.teamRepository.listByOrganisationId(organisationId);
  }

  public async update(
    id: UUID,
    organisationId: UUID,
    name: string,
    active: boolean,
  ): Promise<Team> {
    const team = await this.getByIdOrThrow(id, organisationId);

    team.update(name, active);

    return this.save(team);
  }

  public async activate(id: UUID, organisationId: UUID): Promise<Team> {
    const team = await this.getByIdOrThrow(id, organisationId);

    team.activate();

    return this.save(team);
  }

  public async disable(id: UUID, organisationId: UUID): Promise<Team> {
    const team = await this.getByIdOrThrow(id, organisationId);

    team.disable();

    return this.save(team);
  }

  public create(name: string, organisationId: UUID): Promise<Team> {
    return this.save(TeamFactory.create(name, organisationId));
  }
}
