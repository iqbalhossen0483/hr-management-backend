import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import { envValidationSchema } from './env.validation';
import jwtConfig from './jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, databaseConfig],
      validationSchema: envValidationSchema,
    }),
  ],
})
export class ENVConfigModule {}
