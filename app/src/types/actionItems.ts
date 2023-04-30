import {User} from './user';

export enum Status {
  IN_PROGRESS = "In-Progress",
  COMPLETED = "Completed",
}

export type ActionItem = {
  id: string,
  note: string,
  status: Status,
  createdAt: string,
  assignees: User[],
};
