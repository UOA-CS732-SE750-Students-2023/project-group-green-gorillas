import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BoardNoteRepository } from './board-note.repository';
import { BoardNoteService } from './board-note.service';

@Module({
  imports: [DatabaseModule],
  providers: [BoardNoteRepository, BoardNoteService],
  exports: [BoardNoteService],
})
export class BoardNoteModule {}
