import { Injectable } from '@nestjs/common';
import { UserTeamService } from '../../domain/user-team/user-team.service';
import { TeamService } from '../../domain/team/team.service';
import { UUID } from '../../../types/uuid.type';
import { Team } from '../../domain/team/team';
import { UserService as UserDomainService } from '../../domain/user/user.service';
import { User, UserRole } from '../../domain/user/user';

@Injectable()
export class UserService {
  constructor(
    private readonly userTeamService: UserTeamService,
    private readonly teamService: TeamService,
    private readonly userDomainService: UserDomainService,
  ) {}

  public async getActiveUserTeams(userId: UUID): Promise<Team[]> {
    const userTeams = await this.userTeamService.listByUserId(userId);

    const teams = await Promise.all(
      userTeams.map((userTeam) =>
        this.teamService.getById(userTeam.teamId, userTeam.organisationId),
      ),
    );

    return teams.filter((team) => !!team && team.active);
  }

  public async updateUser(
    userId: UUID,
    organisationId: UUID,
    displayName: string,
    firstName: string,
    lastName: string,
    active: boolean,
    phone: string,
    gender: boolean,
    address: string,
    role?: UserRole,
  ): Promise<User> {
    return this.userDomainService.update(
      userId,
      organisationId,
      displayName,
      firstName,
      lastName,
      active,
      phone,
      gender,
      address,
      role,
    );
  }

  public createUser(
    email: string,
    organisationId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    gender: boolean,
    role: UserRole,
    password: string,
  ): Promise<User> {
    return this.userDomainService.create(
      email,
      organisationId,
      displayName,
      firstName,
      lastName,
      phone,
      address,
      gender,
      role,
      password,
    );
  }

  public updateUserActive(userId: UUID, organisationId: UUID, active: boolean) {
    if (active) {
      return this.userDomainService.activate(userId, organisationId);
    }

    return this.userDomainService.disable(userId, organisationId);
  }

  public listUsersByOrganisationId(organisationId: UUID): Promise<User[]> {
    return this.userDomainService.listByOrganisationId(organisationId);
  }
}
