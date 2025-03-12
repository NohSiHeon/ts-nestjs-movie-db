import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository, PrismaService],
})
export class MoviesModule {}
