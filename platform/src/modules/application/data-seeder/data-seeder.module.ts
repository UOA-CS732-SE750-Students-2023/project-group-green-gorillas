import { Module } from '@nestjs/common';
import { OrganisationModule } from '../../domain/organisation/organisation.module';
import { DataSeederService } from './data-seeder.service';
import { UserModule } from '../../domain/user/user.module';
import { UserAuthModule } from '../../domain/user-auth/user-auth.module';
import { DataSeederController } from './data-seeder.controller';

@Module({
  imports: [OrganisationModule, UserModule, UserAuthModule],
  providers: [DataSeederService],
  controllers: [DataSeederController],
})
export class DataSeederModule {}
