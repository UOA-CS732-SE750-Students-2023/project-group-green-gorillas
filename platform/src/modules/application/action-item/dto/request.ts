import { IsEnum, IsString, IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import { ActionItemStatus } from '../../../domain/action-item/action-item';
import { ApiProperty } from '@nestjs/swagger';

export class ListOutstandingActionItemsParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId!: UUID;
}

export class ListRetroActionItemsParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  retroId!: UUID;
}

export class CreateActionItemRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  retroId!: UUID;
}

export class DeleteActionItemRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  actionItemId!: UUID;
}

export class UpdateActionItemNoteRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  actionItemId!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  note!: string;
}

export class UpdateActionStatusRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  actionItemId!: UUID;

  @ApiProperty({
    type: String,
    description: 'This should be IN_PROGRESS or COMPLETED',
  })
  @IsEnum(ActionItemStatus)
  status!: ActionItemStatus;
}

export class AssignUserToActionItemRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  userId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  actionItemId: UUID;
}
