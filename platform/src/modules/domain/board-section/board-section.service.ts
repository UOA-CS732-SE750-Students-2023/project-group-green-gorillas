import { Injectable } from '@nestjs/common';
import { BoardSectionRepository } from './board-section.repository';

@Injectable()
export class BoardSectionService {
  constructor(
    private readonly boardSectionRepository: BoardSectionRepository,
  ) {}
}
