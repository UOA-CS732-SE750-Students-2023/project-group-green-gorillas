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

@Injectable()
export class DataSeederService {
  constructor(
    private readonly organisationService: OrganisationService,
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
  ) {}

  public async seed(): Promise<void> {
    await Promise.all([
      this.seedOrganisations(),
      this.seedUsers(),
      this.seedUserAuths(),
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
}
