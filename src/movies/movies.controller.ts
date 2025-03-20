import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { RegisterMovieDto } from './dtos/register-movie.dto';
import { RegisterMovieResponse } from './interfaces/register-movie.interface';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { User } from 'src/users/decorators/user.decorator';
import { Payload } from 'src/auth/interfaces/payload.interface';

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
      message: '영화등록 성공',
      data,
    };
  }
}
