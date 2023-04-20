export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  id: string;
  email: string;
  organisationId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  type: UserType;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
