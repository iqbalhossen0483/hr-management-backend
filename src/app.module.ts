import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ENVConfigModule } from './config/env-config.module';
import { JWTConfigModule } from './config/jwt.config.module';
import { StaticModule } from './config/static.module';

@Module({
  imports: [ENVConfigModule, DatabaseModule, JWTConfigModule, StaticModule],
})
export class AppModule {}
