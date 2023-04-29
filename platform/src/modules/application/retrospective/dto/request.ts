import { IsString, IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';

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
