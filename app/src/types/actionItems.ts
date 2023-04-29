import {User} from './user';

export type ActionItems = [{
  id: string,
  note: string,
  status: string,
  createdAt: string,
  assignees: User[],
}];
