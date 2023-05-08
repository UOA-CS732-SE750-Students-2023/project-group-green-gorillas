import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import {
  BoardNoteColor,
  BoardNoteType,
} from '../../../domain/board-note/board-note';
import { BoardTimeInvestRate } from '../../../domain/board-time-invest/board-time-invest';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRetroRequestRequest {
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
  @IsString()
  name!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  templateId: UUID;
}

export class GetRetrospectiveRequestParam {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  id!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId!: UUID;
}

export class UpdateRetroNameRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  id!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  name!: string;
}

export class DeleteRetrospectiveRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  id!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId!: UUID;
}

export class AddNoteRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardSectionId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;

  @ApiProperty({
    type: String,
    description: 'This should be NORMAL or GROUP',
  })
  @IsEnum(BoardNoteType)
  boardNoteType: BoardNoteType;

  @ApiProperty({
    type: String,
    description: 'This should be pink, yellow or blue',
  })
  @IsEnum(BoardNoteColor)
  boardNoteColor: BoardNoteColor;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsOptional()
  @IsString()
  note?: string;
}

export class DeleteNoteRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardNoteId!: UUID;
}

export class UpdateNoteRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardNoteId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  note: string;
}

export class AssignNoteGroup {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardNoteId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  parentNoteId!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardSectionId!: UUID;
}

export class UnAssignNoteGroup {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardNoteId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardSectionId!: UUID;
}

export class AddSectionRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;

  @ApiProperty({
    type: Number,
    description: 'This is a Number property',
  })
  @IsNumber()
  order: number;
}

export class DeleteSectionParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardSectionId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardId: UUID;
}

export class UpdateSectionNameRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardSectionId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  name!: string;
}

export class UpdateSectionDescriptionRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardSectionId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  description!: string;
}

export class VoteNoteRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardNoteId!: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardId!: UUID;
}

export class UnVoteNoteRequestParams {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  boardNoteId!: UUID;
}

export class MoveNextStageRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  retroId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}

export class SetRetroSessionPayload {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  retroId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  sessionPayload: string;
}

export class AddBoardTimeInvestRateRequest {
  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  retroId: UUID;

  @ApiProperty({
    type: Number,
    description: 'This should be 1,2,3,4 or 5',
  })
  @IsEnum(BoardTimeInvestRate)
  rate!: BoardTimeInvestRate;

  @ApiProperty({
    type: String,
    description: 'This is a UUID property',
  })
  @IsUUID()
  teamId: UUID;
}
