import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieGenre } from '@prisma/client';
import { Movie } from './interfaces/movie.interface';

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

  async findMovieById(id: number): Promise<Movie> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
      },
    });
    return movie;
  }

  async findMovieByIdAndUserId(id: number, userId: number): Promise<Movie> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
        userId,
      },
    });

    return movie;
  }

  async findMovies(): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany({});

    return movies;
  }

  async deleteMovie(id: number, userId: number): Promise<Movie> {
    const movie = await this.prisma.movie.delete({
      where: {
        id,
        userId,
      },
    });

    return movie;
  }
}
