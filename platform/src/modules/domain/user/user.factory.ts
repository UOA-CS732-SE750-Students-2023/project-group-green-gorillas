import { User, UserType } from './user';

export class UserFactory {
  static create(
    email: string,
    organisationId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    type: UserType,
  ): User {
    return new User(
      email,
      organisationId,
      displayName,
      firstName,
      lastName,
      type,
    );
  }
}
