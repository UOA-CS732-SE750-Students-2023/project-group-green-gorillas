import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BoardNoteVoteService } from './board-note-vote.service';
import { BoardNoteVoteRepository } from './board-note-vote.repository';

@Module({
  imports: [DatabaseModule],
  providers: [BoardNoteVoteRepository, BoardNoteVoteService],
  exports: [BoardNoteVoteService],
})
export class BoardNoteVoteModule {}
