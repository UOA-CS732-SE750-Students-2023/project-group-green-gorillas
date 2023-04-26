import { UUID } from '../../../types/uuid.type';

export enum TeamDashboardCountKey {
  OutstandingActionItemCount = 'outstandingActionItemCount',
  CompletedActionItemCount = 'completedActionItemCount',
  RetrospectiveCount = 'retrospectiveCount',
}

export class TeamDashboard {
  public readonly teamId: UUID;

  public readonly organisationId: UUID;

  public outstandingActionItemCount: number;

  public completedActionItemCount: number;

  public retrospectiveCount: number;

  constructor(teamId: UUID, organisationId: UUID) {
    this.teamId = teamId;
    this.organisationId = organisationId;
    this.outstandingActionItemCount = 0;
    this.completedActionItemCount = 0;
    this.retrospectiveCount = 0;
  }
}
