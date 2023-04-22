import { Module } from '@nestjs/common';
import { SendgridMailClient } from './sendgrid-mail-client';
import { InternalConfigService } from '../../global/config/internal-config.service';

const sendgridMailClientFactory = {
  provide: SendgridMailClient,
  useFactory: (internalConfigService: InternalConfigService) => {
    const apiKey = internalConfigService.getKeyConfig().sendGridApiKey;
    return new SendgridMailClient(apiKey);
  },
  inject: [InternalConfigService],
};

@Module({
  providers: [sendgridMailClientFactory],
  exports: [SendgridMailClient],
})
export class SendgridMailModule {}
