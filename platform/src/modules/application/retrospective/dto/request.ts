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

export class CreateRetroRequestRequest {
  @IsUUID()
  teamId!: UUID;

  @IsString()
  name!: UUID;

  @IsUUID()
  templateId: UUID;
}

export class GetRetrospectiveRequestParam {
  @IsUUID()
  id!: UUID;

  @IsUUID()
  teamId!: UUID;
}

export class UpdateRetroNameRequest {
  @IsUUID()
  id!: UUID;

  @IsUUID()
  teamId!: UUID;

  @IsString()
  name!: string;
}

export class DeleteRetrospectiveRequestParams {
  @IsUUID()
  id!: UUID;

  @IsUUID()
  teamId!: UUID;
}

export class AddNoteRequest {
  @IsUUID()
  boardSectionId: UUID;

  @IsUUID()
  boardId: UUID;

  @IsUUID()
  teamId: UUID;

  @IsEnum(BoardNoteType)
  boardNoteType: BoardNoteType;

  @IsEnum(BoardNoteColor)
  boardNoteColor: BoardNoteColor;

  @IsOptional()
  @IsString()
  note?: string;
}

export class DeleteNoteRequestParams {
  @IsUUID()
  boardNoteId!: UUID;
}

export class UpdateNoteRequest {
  @IsUUID()
  boardNoteId: UUID;

  @IsString()
  note: string;
}

export class AssignNoteGroup {
  @IsUUID()
  boardNoteId: UUID;

  @IsUUID()
  parentNoteId!: UUID;

  @IsUUID()
  boardSectionId!: UUID;
}

export class UnAssignNoteGroup {
  @IsUUID()
  boardNoteId: UUID;

  @IsUUID()
  boardSectionId!: UUID;
}

export class AddSectionRequest {
  @IsUUID()
  boardId: UUID;

  @IsUUID()
  teamId: UUID;

  @IsNumber()
  order: number;
}

export class DeleteSectionParams {
  @IsUUID()
  boardSectionId: UUID;

  @IsUUID()
  boardId: UUID;
}

export class UpdateSectionNameRequest {
  @IsUUID()
  boardSectionId: UUID;

  @IsUUID()
  boardId: UUID;

  @IsString()
  name!: string;
}

export class UpdateSectionDescriptionRequest {
  @IsUUID()
  boardSectionId: UUID;

  @IsUUID()
  boardId: UUID;

  @IsString()
  description!: string;
}

export class VoteNoteRequest {
  @IsUUID()
  boardNoteId!: UUID;

  @IsUUID()
  boardId!: UUID;
}

export class UnVoteNoteRequestParams {
  @IsUUID()
  boardNoteId!: UUID;
}

export class MoveNextStageRequest {
  @IsUUID()
  retroId: UUID;

  @IsUUID()
  teamId: UUID;
}

export class SetRetroSessionPayload {
  @IsUUID()
  retroId: UUID;

  @IsUUID()
  teamId: UUID;

  @IsString()
  sessionPayload: string;
}
