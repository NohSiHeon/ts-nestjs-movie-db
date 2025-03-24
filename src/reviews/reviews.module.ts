import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MoviesModule } from 'src/movies/movies.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MoviesRepository } from 'src/movies/movies.repository';
import { ReviewsRepository } from './reviews.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthModule, MoviesModule, PrismaModule],
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    ReviewsRepository,
    MoviesRepository,
    PrismaService,
  ],
})
export class ReviewsModule {}
