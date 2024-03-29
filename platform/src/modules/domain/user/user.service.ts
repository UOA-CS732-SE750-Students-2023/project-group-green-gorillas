import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, UserRole } from './user';
import { InternalException } from '../../../exceptions/internal-exception';
import { UUID } from '../../../types/uuid.type';
import { UserFactory } from './user.factory';
import { UserAuthService } from '../user-auth/user-auth.service';
import { OrganisationService } from '../organisation/organisation.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userAuthService: UserAuthService,
    private readonly organisationService: OrganisationService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public async update(
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
    const user = await this.getByIdOrThrow(userId, organisationId);

    user.update(
      displayName,
      firstName,
      lastName,
      active,
      phone,
      gender,
      address,
      role ?? user.role,
    );

    return this.save(user);
  }

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
    const rawCacheUser = await this.cacheManager.get<string>(
      UserService.buildUserCacheKey(id, organisationId),
    );

    if (rawCacheUser) {
      const cacheUser = JSON.parse(rawCacheUser);

      return cacheUser ? plainToClass(User, cacheUser) : undefined;
    }

    const user = await this.userRepository.getById(id, organisationId);

    await this.cacheManager.set(
      UserService.buildUserCacheKey(id, organisationId),
      !!user ? JSON.stringify(classToPlain(user)) : undefined,
      3600,
    );

    return user;
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

    return this.save(user);
  }

  public async disable(id: UUID, organisationId: UUID): Promise<User> {
    const user = await this.getByIdOrThrow(id, organisationId);

    user.disable();

    return this.save(user);
  }

  private static buildUserCacheKey(userId: UUID, organisationId: UUID): string {
    return `user-${userId}-${organisationId}`;
  }

  public async save(user: User): Promise<User> {
    await this.cacheManager.del(
      UserService.buildUserCacheKey(user.id, user.organisationId),
    );

    return this.userRepository.save(user);
  }

  public async create(
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
    const organisation = await this.organisationService.getByIdOrThrow(
      organisationId,
    );

    const existingUser = await this.getByEmail(email);

    if (existingUser) {
      throw new InternalException(
        'USER.EMAIL_EXISTED',
        'email is already existed',
      );
    }

    const user = await this.save(
      UserFactory.create(
        email,
        organisation.id,
        displayName,
        firstName,
        lastName,
        phone,
        address,
        gender,
        role,
      ),
    );

    await this.userAuthService.create(user.id, user.organisationId, password);

    return user;
  }
}
