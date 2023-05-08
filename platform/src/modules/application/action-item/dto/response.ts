import { ApiProperty } from '@nestjs/swagger';
import { UUID } from '../../../../types/uuid.type';
import { ActionItemStatus } from '../../../domain/action-item/action-item';

export class ActionItemResponse {
  @ApiProperty({
    type: String,
  })
  id: UUID;

  @ApiProperty({
    type: String,
  })
  teamId: UUID;

  @ApiProperty({
    type: String,
  })
  organisationId: UUID;

  @ApiProperty({
    type: String,
  })
  boardId: UUID;

  @ApiProperty({
    type: String,
  })
  note: UUID;

  @ApiProperty({
    type: String,
    enum: ActionItemStatus,
  })
  status: UUID;
}
