import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import DatabaseConfig from './database.config';
import JwtConfig from './jwt.config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        EXTERNAL_URL: Joi.string().default('http://localhost:3000/api'),
        APP_PORT: Joi.number().default(3000),
        REDIS_QUEUE_HOST: Joi.string().default('localhost'),
        REDIS_QUEUE_PORT: Joi.number().default(6379),
      }),
      load: [
        () => ({
          database: DatabaseConfig(),
          jwt: JwtConfig(),
        }),
      ],
    }),
  ],
})
export class ConfigModule {}
