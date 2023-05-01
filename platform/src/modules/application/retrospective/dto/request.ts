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
}

export class DeleteNoteRequestParams {
  @IsUUID()
  boardNoteId!: UUID;

  @IsUUID()
  boardSectionId!: UUID;
}

export class UpdateNoteRequest {
  @IsUUID()
  boardNoteId: UUID;

  @IsUUID()
  boardSectionId!: UUID;

  @IsString()
  note: string;
}

export class UpdateNoteParentIdRequest {
  @IsUUID()
  boardNoteId: UUID;

  @IsUUID()
  boardSectionId!: UUID;

  @IsUUID()
  parentNoteId!: UUID;
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
