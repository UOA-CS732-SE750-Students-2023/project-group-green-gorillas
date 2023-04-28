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
