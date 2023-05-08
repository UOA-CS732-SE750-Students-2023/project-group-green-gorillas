import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrganisationName {
  @ApiProperty({
    type: String,
    description: 'This is a String property',
  })
  @IsString()
  name: string;
}
