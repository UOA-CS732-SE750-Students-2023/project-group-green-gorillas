import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, UserType } from './user';
import { InternalException } from '../../../exceptions/internal-exception';
import { UUID } from '../../../types/uuid.type';
import { UserFactory } from './user.factory';
import { UserAuthService } from '../user-auth/user-auth.service';
import { OrganisationService } from '../organisation/organisation.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userAuthService: UserAuthService,
    private readonly organisationService: OrganisationService,
  ) {}

  public async getByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.getByEmail(email);
  }

  public async getByEmailOrThrow(email: string): Promise<User> {
    const user = await this.getByEmail(email);

    if (!user) {
      throw new InternalException(
        'USER.NOT_FOUND',
        'User is not found by the email',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  public async getById(
    id: UUID,
    organisationId: UUID,
  ): Promise<User | undefined> {
    return this.userRepository.getById(id, organisationId);
  }

  public async getByIdOrThrow(id: UUID, organisationId: UUID): Promise<User> {
    const user = await this.getById(id, organisationId);

    if (!user) {
      throw new InternalException(
        'USER.NOT_FOUND',
        'user is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  public listByOrganisationId(organisationId: UUID): Promise<User[]> {
    return this.userRepository.listByOrganisationId(organisationId);
  }

  public async activate(id: UUID, organisationId: UUID): Promise<User> {
    const user = await this.getByIdOrThrow(id, organisationId);

    user.activate();

    return this.userRepository.save(user);
  }

  public async disable(id: UUID, organisationId: UUID): Promise<User> {
    const user = await this.getByIdOrThrow(id, organisationId);

    user.disable();

    return this.userRepository.save(user);
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public async create(
    email: string,
    organisationId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    type: UserType,
    password: string,
  ): Promise<User> {
    const organisation = await this.organisationService.getByIdOrThrow(
      organisationId,
    );

    const user = await this.userRepository.save(
      UserFactory.create(
        email,
        organisation.id,
        displayName,
        firstName,
        lastName,
        type,
      ),
    );

    await this.userAuthService.create(user.id, user.organisationId, password);

    return user;
  }
}
