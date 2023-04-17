import { UUID } from '../../../types/uuid.type';
import { UserAuth } from './user-auth';
import { sha256Encrypt } from '../../../utils/encryption/sha256Encrypt';

export class UserAuthFactory {
  static create(
    userId: UUID,
    organisationId: UUID,
    password: string,
    passwordSalt: string,
  ): UserAuth {
    const encryptedPassword = sha256Encrypt(password, passwordSalt);

    return new UserAuth(
      userId,
      organisationId,
      encryptedPassword,
      passwordSalt,
    );
  }
}
