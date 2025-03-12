import { Body, Controller, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { RegisterMovieDto } from './dtos/register-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // @Post()
  // async registerMovie(@Body() registerMovieDto: RegisterMovieDto) {
  //   const { title, introduction, actors, genre, releaseYear } =
  //     registerMovieDto;

  //   const data = await this.moviesService.registerMovie(
  //     title,
  //     introduction,
  //     actors,
  //     genre,
  //     releaseYear,
  //   );

  //   return {
  //     data,
  //   };
  // }
}
