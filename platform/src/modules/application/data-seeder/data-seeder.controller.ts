import { Controller, Post } from '@nestjs/common';
import { DataSeederService } from './data-seeder.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Data Seeder')
@Controller({
  path: ['api/data-seeder'],
})
export class DataSeederController {
  constructor(private readonly dataSeederService: DataSeederService) {}

  @ApiOkResponse({
    description: 'Seed data for local environment',
  })
  @Post('seed')
  public seed(): Promise<void> {
    return this.dataSeederService.seed();
  }
}
