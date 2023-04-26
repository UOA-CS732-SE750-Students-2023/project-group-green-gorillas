import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BoardTemplateRepository } from './board-template.repository';
import { BoardTemplateService } from './board-template.service';

@Module({
  imports: [DatabaseModule],
  providers: [BoardTemplateRepository, BoardTemplateService],
  exports: [BoardTemplateService],
})
export class BoardTemplateModule {}
