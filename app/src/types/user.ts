export enum UseRole {
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
  role: UseRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string;
  address: string;
  gender: boolean;
  password: string;
};
