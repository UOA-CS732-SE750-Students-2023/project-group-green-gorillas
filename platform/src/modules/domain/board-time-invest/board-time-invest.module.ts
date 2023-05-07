import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BoardTimeInvestRepository } from './board-time-invest.repository';
import { BoardTimeInvestService } from './board-time-invest.service';

@Module({
  imports: [DatabaseModule],
  providers: [BoardTimeInvestRepository, BoardTimeInvestService],
  exports: [BoardTimeInvestService],
})
export class BoardTimeInvestModule {}
