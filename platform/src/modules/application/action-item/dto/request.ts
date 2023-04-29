import { IsEnum, IsString, IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import { ActionItemStatus } from '../../../domain/action-item/action-item';

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

export class DeleteActionItemRequestParams {
  @IsUUID()
  actionItemId!: UUID;
}

export class UpdateActionItemNoteRequest {
  @IsUUID()
  actionItemId!: UUID;

  @IsString()
  note!: string;
}

export class UpdateActionStatusRequest {
  @IsUUID()
  actionItemId!: UUID;

  @IsEnum(ActionItemStatus)
  status!: ActionItemStatus;
}
