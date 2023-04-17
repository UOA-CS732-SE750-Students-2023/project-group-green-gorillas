import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, UserType } from './user';
import { InternalException } from '../../../exceptions/internal-exception';
import { UUID } from '../../../types/uuid.type';
import { UserFactory } from './user.factory';
import { UserAuthFactory } from './user-auth.factory';
import { generatePwdSalt } from '../../../utils/encryption/generatePasswordSalt';
import { UserAuthRepository } from './user-auth.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userAuthRepository: UserAuthRepository,
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

  // TODO
  // public async getUserAuthById()

  public async create(
    email: string,
    organisationId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    type: UserType,
    password: string,
  ): Promise<User> {
    const user = UserFactory.create(
      email,
      organisationId,
      displayName,
      firstName,
      lastName,
      type,
    );

    const userAuth = UserAuthFactory.create(
      user.id,
      user.organisationId,
      password,
      generatePwdSalt(),
    );

    await Promise.all([
      this.userRepository.save(user),
      this.userAuthRepository.save(userAuth),
    ]);

    return user;
  }
}
