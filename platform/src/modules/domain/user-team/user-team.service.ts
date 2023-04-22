import { HttpStatus, Injectable } from '@nestjs/common';
import { UserTeamRepository } from './user-team.repository';
import { UUID } from '../../../types/uuid.type';
import { UserTeam } from './user-team';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class UserTeamService {
  constructor(private readonly userTeamRepository: UserTeamRepository) {}

  public getById(userId: UUID, teamId: UUID): Promise<UserTeam | undefined> {
    return this.userTeamRepository.getById(userId, teamId);
  }

  public async getByIdOrThrow(userId: UUID, teamId: UUID): Promise<UserTeam> {
    const userTeam = await this.getById(userId, teamId);

    if (!userTeam) {
      throw new InternalException(
        'USER_TEAM.NOT_FOUND',
        'User team is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return userTeam;
  }

  public save(userTeam: UserTeam): Promise<UserTeam> {
    return this.userTeamRepository.save(userTeam);
  }

  public delete(userId: UUID, teamId: UUID): Promise<void> {
    return this.userTeamRepository.delete(userId, teamId);
  }

  public listByUserId(userId: UUID): Promise<UserTeam[]> {
    return this.userTeamRepository.listByUserId(userId);
  }

  public listByTeamId(teamId: UUID, organisationId: UUID): Promise<UserTeam[]> {
    return this.userTeamRepository.listByTeamId(teamId, organisationId);
  }
}
