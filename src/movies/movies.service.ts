import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { RegisterMovieDto } from './dtos/register-movie.dto';
import { Movie } from './interfaces/movie.interface';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async registerMovie(
    userId: number,
    registerMovieDto: RegisterMovieDto,
  ): Promise<Movie> {
    const { title, introduction, actors, genre, releaseYear } =
      registerMovieDto;

    const data = await this.moviesRepository.registerMovie(
      userId,
      title,
      introduction,
      actors,
      genre,
      releaseYear,
    );
    return data;
  }
}
