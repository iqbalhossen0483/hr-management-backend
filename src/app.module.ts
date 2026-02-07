import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ENVConfigModule } from './config/env-config.module';
import { JWTConfigModule } from './config/jwt.config.module';
import { HrUserModule } from './modules/hrUser/hrUser.module';

@Module({
  imports: [ENVConfigModule, DatabaseModule, JWTConfigModule, HrUserModule],
})
export class AppModule {}
