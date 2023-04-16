import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InternalConfigService } from './internal-config.service';

@Global()
@Module({
    providers: [InternalConfigService],
    exports: [InternalConfigService],
    imports: [ConfigModule],
})
export class InternalConfigModule {}
