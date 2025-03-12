import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MoviesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // async registerMovie(
  //   title: string,
  //   introduction: string,
  //   actors: string,
  //   genre,
  //   releaseYear: string,
  // ) {
  //   const data = await this.prisma.movie.create({
  //     data: {
  //       title,
  //       introduction,
  //       actors,
  //       genre,
  //       releaseYear,
  //     },
  //   });
  //   return data;
  // }
}
