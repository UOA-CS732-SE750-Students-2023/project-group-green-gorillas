import { Controller, Post } from '@nestjs/common';
import { DataSeederService } from './data-seeder.service';

@Controller({
  path: ['api/data-seeder'],
})
export class DataSeederController {
  constructor(private readonly dataSeederService: DataSeederService) {}

  @Post('seed')
  public seed(): Promise<void> {
    return this.dataSeederService.seed();
  }
}
