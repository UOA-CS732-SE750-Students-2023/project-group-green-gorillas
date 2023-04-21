import { HttpStatus, Injectable } from '@nestjs/common';
import { UUID } from '../../../types/uuid.type';
import { Team } from './team';
import { TeamRepository } from './team.repository';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  public getById(id: UUID, organisationId: UUID): Promise<Team | undefined> {
    return this.teamRepository.getById(id, organisationId);
  }

  public save(team: Team): Promise<Team> {
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
}
