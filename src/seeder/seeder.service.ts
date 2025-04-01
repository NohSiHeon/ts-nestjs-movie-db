// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { MoviesRepository } from 'src/movies/movies.repository';
import { MovieGenre } from '@prisma/client';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class SeederService {
  constructor(
    private movieRepository: MoviesRepository,
    private authRepository: AuthRepository,
  ) {}

  async seedUsers() {
    const userCount = 10;
    for (let i = 0; i < userCount; i++) {
      await this.authRepository.signUp(
        faker.person.fullName(),
        faker.internet.email(),
        faker.internet.password(),
      );
    }
  }
  async seedMovies() {
    const movieCount = 1000;
    for (let i = 0; i < movieCount; i++) {
      await this.movieRepository.registerMovie(
        Math.floor(Math.random() * 20) + 1,
        faker.lorem.word(),
        faker.lorem.sentence(),
        faker.lorem.words(),
        MovieGenre[Math.floor(Math.random() * Object.keys(MovieGenre).length)],
        faker.date.past().getFullYear().toString(),
      );
    }
  }
}
