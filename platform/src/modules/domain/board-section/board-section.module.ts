import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BoardSectionRepository } from './board-section.repository';
import { BoardSectionService } from './board-section.service';

@Module({
  imports: [DatabaseModule],
  providers: [BoardSectionRepository, BoardSectionService],
  exports: [BoardSectionService],
})
export class BoardSectionModule {}
