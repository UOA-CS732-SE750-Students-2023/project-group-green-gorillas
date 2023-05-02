import {User} from './user';


export enum ActionItemStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type ActionItem = {
  id: string,
  note: string,
  status: ActionItemStatus,
  createdAt: string,
  assignees: User[],
};