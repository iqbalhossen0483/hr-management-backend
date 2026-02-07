import { Module } from '@nestjs/common';
import { ENVConfigModule } from './config/env-config.module';

@Module({
  imports: [ENVConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
