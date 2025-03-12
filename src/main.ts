import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';
import 'dotenv/config';
import { IndexModule } from 'src';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
