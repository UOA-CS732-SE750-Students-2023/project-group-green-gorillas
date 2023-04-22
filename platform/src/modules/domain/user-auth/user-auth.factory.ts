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
    return new UserAuth(userId, organisationId, password, passwordSalt);
  }
}
