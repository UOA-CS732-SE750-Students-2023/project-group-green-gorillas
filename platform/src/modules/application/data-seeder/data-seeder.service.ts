import { Injectable } from '@nestjs/common';
import { OrganisationService } from '../../domain/organisation/organisation.service';
import { organisations } from './data/organisations';
import { plainToClass } from 'class-transformer';
import { Organisation } from '../../domain/organisation/organisation';
import { users } from './data/users';
import { UserService } from '../../domain/user/user.service';
import { User } from '../../domain/user/user';
import { userAuths } from './data/user-auths';
import { UserAuthService } from '../../domain/user-auth/user-auth.service';
import { sha256Encrypt } from '../../../utils/encryption/sha256Encrypt';
import { UserAuth } from '../../domain/user-auth/user-auth';
import { teams } from './data/teams';
import { TeamService } from '../../domain/team/team.service';
import { Team } from '../../domain/team/team';
import { UserTeamService } from '../../domain/user-team/user-team.service';
import { userTeams } from './data/user-teams';
import { UserTeam } from '../../domain/user-team/user-team';
import { BoardTemplateService } from '../../domain/board-template/board-template.service';
import { boardTemplates } from './data/board-templates';
import { BoardTemplate } from '../../domain/board-template/board-template';

@Injectable()
export class DataSeederService {
  constructor(
    private readonly organisationService: OrganisationService,
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly teamService: TeamService,
    private readonly userTeamService: UserTeamService,
    private readonly boardTemplateService: BoardTemplateService,
  ) {}

  public async seed(): Promise<void> {
    await Promise.all([
      this.seedOrganisations(),
      this.seedUsers(),
      this.seedUserAuths(),
      this.seedTeams(),
      this.seedUserTeams(),
      this.seedBoardTemplates(),
    ]);
  }

  public async seedOrganisations(): Promise<void> {
    await Promise.all(
      organisations.map((organisation) =>
        this.organisationService.save(plainToClass(Organisation, organisation)),
      ),
    );
  }

  public async seedUsers(): Promise<void> {
    await Promise.all(
      users.map((user) => this.userService.save(plainToClass(User, user))),
    );
  }

  public async seedUserAuths(): Promise<void> {
    await Promise.all(
      userAuths.map((userAuth) =>
        this.userAuthService.save(
          plainToClass(UserAuth, {
            ...userAuth,
            password: sha256Encrypt(userAuth.password, userAuth.passwordSalt),
          }),
        ),
      ),
    );
  }

  public async seedTeams(): Promise<void> {
    await Promise.all(
      teams.map((team) => this.teamService.save(plainToClass(Team, team))),
    );
  }

  public async seedUserTeams(): Promise<void> {
    await Promise.all(
      userTeams.map((userTeam) =>
        this.userTeamService.save(plainToClass(UserTeam, userTeam)),
      ),
    );
  }

  public async seedBoardTemplates(): Promise<void> {
    await Promise.all(
      boardTemplates.map((boardTemplate) =>
        this.boardTemplateService.save(
          plainToClass(BoardTemplate, boardTemplate),
        ),
      ),
    );
  }
}
