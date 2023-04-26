import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [DatabaseModule],
  providers: [BoardRepository, BoardService],
  exports: [BoardService],
})
export class BoardModule {}
