import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { Score } from '@prisma/client';
import { MoviesRepository } from 'src/movies/movies.repository';
import { Review } from './interfaces/review.interface';

@Injectable()
export class ReviewsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async findReviewByUserIdAndMovieId(userId: number, movieId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    return review;
  }

  async registerReview(
    score: Score,
    text: string,
    movieRating: number,
    movieId: number,
    userId: number,
  ): Promise<Review> {
    const review = await this.prisma.$transaction(async (tx) => {
      const existedReview = await tx.review.findUnique({
        where: {
          userId_movieId: {
            userId: userId,
            movieId: movieId,
          },
        },
      });

      if (existedReview) {
        throw new ConflictException('리뷰는 한번만 작성할 수 있습니다.');
      }

      const registeredReview = await tx.review.create({
        data: {
          score,
          text,
          movieId,
          userId,
        },
      });

      await this.moviesRepository.updateRating(tx, movieId, movieRating);
      return registeredReview;
    });

    return review;
  }

  async findReviewById(id: number): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      },
    });

    return review;
  }

  async findReviews(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({});

    return reviews;
  }
}
