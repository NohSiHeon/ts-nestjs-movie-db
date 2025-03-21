import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { RegisterMovieDto } from './dtos/register-movie.dto';
import { RegisterMovieResponse } from './interfaces/register-movie-response.interface';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { User } from 'src/users/decorators/user.decorator';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { GetMovieResponse } from './interfaces/get-movie-response.interface';
import { GetMoviesResponse } from './interfaces/get-movies-response.interface';
import { DeleteMovieResponse } from './interfaces/delete-movie-response.interface';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Post()
  async registerMovie(
    @User() userInfo: Payload,
    @Body() registerMovieDto: RegisterMovieDto,
  ): Promise<RegisterMovieResponse> {
    const { id } = userInfo;
    const data = await this.moviesService.registerMovie(id, registerMovieDto);

    return {
      status: HttpStatus.CREATED,
      message: '영화 등록 성공',
      data,
    };
  }

  @Get(':id')
  async getMovie(@Param('id') id: number): Promise<GetMovieResponse> {
    const data = await this.moviesService.getMovie(+id);

    return {
      status: HttpStatus.OK,
      message: '영화 조회 성공',
      data,
    };
  }

  @Get()
  async getMovies(): Promise<GetMoviesResponse> {
    const data = await this.moviesService.getMovies();

    return {
      status: HttpStatus.OK,
      message: '영화 목록 조회 성공',
      data,
    };
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Delete('/:id')
  async deleteMovie(
    @Param('id') id: number,
    @User() userInfo: Payload,
  ): Promise<DeleteMovieResponse> {
    const userId = userInfo.id;

    const data = await this.moviesService.deleteMovie(+id, userId);

    return {
      status: HttpStatus.OK,
      message: '영화 삭제 성공',
      data,
    };
  }
}
