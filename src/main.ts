import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { IndexModule } from 'src';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
// import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on port ${process.env.PORT}`);

  // const seederService = app.get(SeederService);
  // await seederService.seedUsers();
  // await seederService.seedMovies();
  // console.log('Movie seeding completed');
  // await app.close();
}
bootstrap();
