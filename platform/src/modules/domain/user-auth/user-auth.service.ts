import { HttpStatus, Injectable } from '@nestjs/common';
import { UserAuth } from './user-auth';
import { UserAuthFactory } from './user-auth.factory';
import { UUID } from '../../../types/uuid.type';
import { generatePwdSalt } from '../../../utils/encryption/generatePasswordSalt';
import { sha256Encrypt } from '../../../utils/encryption/sha256Encrypt';
import { UserAuthRepository } from './user-auth.repository';
import { InternalException } from '../../../exceptions/internal-exception';

@Injectable()
export class UserAuthService {
  constructor(private readonly userAuthRepository: UserAuthRepository) {}

  public create(
    userId: UUID,
    organisationId: UUID,
    password: string,
  ): Promise<UserAuth> {
    const passwordSalt = generatePwdSalt();

    const userAuth = UserAuthFactory.create(
      userId,
      organisationId,
      sha256Encrypt(password, passwordSalt),
      passwordSalt,
    );

    return this.userAuthRepository.save(userAuth);
  }

  public getById(
    id: UUID,
    organisationId: UUID,
  ): Promise<UserAuth | undefined> {
    return this.userAuthRepository.getById(id, organisationId);
  }

  public getByIdOrThrow(id: UUID, organisationId: UUID): Promise<UserAuth> {
    const userAuth = this.userAuthRepository.getById(id, organisationId);

    if (userAuth) {
      throw new InternalException(
        'USER_AUTH.NOT_FOUND',
        'user auth is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return userAuth;
  }
}
