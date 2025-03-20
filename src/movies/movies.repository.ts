import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieGenre } from '@prisma/client';

@Injectable()
export class MoviesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerMovie(
    userId: number,
    title: string,
    introduction: string,
    actors: string,
    genre: MovieGenre,
    releaseYear: string,
  ) {
    const data = await this.prisma.movie.create({
      data: {
        userId,
        title,
        introduction,
        actors,
        genre,
        releaseYear,
      },
    });
    return data;
  }
}
