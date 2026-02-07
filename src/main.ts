import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Set global API prefix
  const apiPrefix = config.get<string>('app.apiPrefix') ?? 'api';
  app.setGlobalPrefix(apiPrefix);

  // set up CORS
  const origins = config.get<string[]>('app.origins') ?? ['*'];
  app.enableCors({
    origin: origins,
    credentials: true,
  });

  // set up logging
  const nodeEnv = config.get<string>('app.env') ?? 'development';
  app.useLogger(
    nodeEnv === 'production'
      ? ['error']
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  );

  //set up cookies parser and helmet
  app.use(cookieParser());
  app.use(helmet());

  // set validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: nodeEnv === 'production',
    }),
  );

  const port = config.get<number>('app.port') ?? 3000;
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap().catch((err) => console.error(err));
