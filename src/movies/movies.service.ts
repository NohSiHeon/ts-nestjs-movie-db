import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}
  // async registerMovie(
  //   title: string,
  //   introduction: string,
  //   actors: string,
  //   genre,
  //   releaseYear: string,
  // ) {
  //   const data = await this.moviesRepository.registerMovie(
  //     title,
  //     introduction,
  //     actors,
  //     genre,
  //     releaseYear,
  //   );
  //   return data;
  // }
}
