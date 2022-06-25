import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception';
import { setOpenApiSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);
  setOpenApiSwagger(app);
  app.enableCors({
    credentials: true,
    methods: 'GET,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: configService.get<boolean>('app.isProduction'),
      transform: true,
      whitelist: true,
    }),
  );
  const port = configService.get('APP_PORT', 3000);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
  console.log(`service start on ${port}`);
}
bootstrap();
