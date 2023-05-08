import { IsString } from 'class-validator';

export class UpdateOrganisationName {
  @IsString()
  name: string;
}
