import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  origins: process.env.ORIGINS ? process.env.ORIGINS.split(',') : ['*'],
}));
