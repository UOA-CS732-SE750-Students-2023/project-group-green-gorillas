import { IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';

export class ListOutstandingActionItemsParams {
  @IsUUID()
  teamId!: UUID;
}

export class ListRetroActionItemsParams {
  @IsUUID()
  teamId!: UUID;

  @IsUUID()
  retroId!: UUID;
}

export class CreateActionItemRequest {
  @IsUUID()
  teamId!: UUID;

  @IsUUID()
  retroId!: UUID;
}
