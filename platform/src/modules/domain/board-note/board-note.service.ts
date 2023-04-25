import { Injectable } from '@nestjs/common';
import { BoardNoteRepository } from './board-note.repository';

@Injectable()
export class BoardNoteService {
  constructor(private readonly boardNoteRepository: BoardNoteRepository) {}
}
