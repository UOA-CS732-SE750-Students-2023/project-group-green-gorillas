import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OrganisationRepository } from './organisation.repository';
import { OrganisationService } from './organisation.service';

@Module({
  imports: [DatabaseModule],
  providers: [OrganisationRepository, OrganisationService],
  exports: [OrganisationService],
})
export class OrganisationModule {}
