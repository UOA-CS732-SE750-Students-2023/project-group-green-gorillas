import { User } from "./user";

export enum RetroStage {
  THINK = "Think",
  GROUP = "Group",
  VOTE = "Vote",
  DISCUSS = "Discuss",
  REVIEW = "Review",
  FINALIZE = "Finalized",
}

export enum ActionItemStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type Assignee = {
  id: string,
  firstName: string;
  lastName: string;
}

export type ActionItem = {
  id: string;
  note: string;
  status: ActionItemStatus;
  createdAt: string;
  assignees: Assignee[];
  retro?: {
    id: string;
    name: string;
    teamId: string;
    stage: RetroStage;
  };
  
};
