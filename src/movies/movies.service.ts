import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getMovie(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findMovieById(id);

    if (!movie) {
      throw new NotFoundException('존재하지않거나 삭제된 영화입니다.');
    }
    return movie;
  }

  async getMovies(): Promise<Movie[]> {
    const movies = await this.moviesRepository.findMovies();

    if (!movies) {
      throw new NotFoundException('존재하지않거나 삭제된 영화입니다.');
    }

    return movies;
  }

  async deleteMovie(id: number, userId: number): Promise<Movie> {
    const existedMovie = await this.moviesRepository.findMovieByIdAndUserId(
      id,
      userId,
    );

    if (!existedMovie) {
      throw new NotFoundException('존재하지않거나 삭제된 영화입니다.');
    }

    const movie = await this.moviesRepository.deleteMovie(id, userId);

    return movie;
  }
}
