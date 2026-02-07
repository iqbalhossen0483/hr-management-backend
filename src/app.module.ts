import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ENVConfigModule } from './config/env-config.module';

@Module({
  imports: [ENVConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
