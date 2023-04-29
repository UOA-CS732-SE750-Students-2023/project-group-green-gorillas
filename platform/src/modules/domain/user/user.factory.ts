import { User, UserRole } from './user';

export class UserFactory {
  static create(
    email: string,
    organisationId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    gender: boolean,
    role: UserRole,
  ): User {
    return new User(
      email,
      organisationId,
      displayName,
      firstName,
      lastName,
      phone,
      address,
      gender,
      role,
    );
  }
}
