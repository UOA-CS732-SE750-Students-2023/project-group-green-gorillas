import { ApiProperty } from '@nestjs/swagger';

export class OrganisationResponse {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    type: String,
  })
  updatedAt: string;

  @ApiProperty({
    type: Boolean,
  })
  active: boolean;
}
