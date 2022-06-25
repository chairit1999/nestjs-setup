import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ApiModule, DatabaseModule, ConfigModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
