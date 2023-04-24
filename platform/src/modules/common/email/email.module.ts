import { Module } from '@nestjs/common';
import { SendgridMailModule } from '../../external/sendgrid-mail/sendgrid-mail.module';
import { EmailService } from './email.service';

@Module({
  imports: [SendgridMailModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
