import { PrismaService } from 'src/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MoviesRepository } from 'src/movies/movies.repository';
import { Review } from './interfaces/review.interface';
import { Score } from '@prisma/client';

@Injectable()
export class ReviewsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly moviesRepository: MoviesRepository,
  ) {}

  // userId와 movieId로 리뷰 조회
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
  // 리뷰 등록
  async registerReview(
    score: Score,
    text: string,
    movieRating: number,
    movieId: number,
    userId: number,
  ): Promise<Review> {
    // 트랜잭션
    const review = await this.prisma.$transaction(async (tx) => {
      const existedReview = await tx.review.findUnique({
        where: {
          userId_movieId: {
            userId: userId,
            movieId: movieId,
          },
        },
      });
      // 이미 리뷰가 존재할 경우
      if (existedReview) {
        throw new ConflictException('리뷰는 한번만 작성할 수 있습니다.');
      }
      // 리뷰 등록
      const registeredReview = await tx.review.create({
        data: {
          score,
          text,
          movieId,
          userId,
        },
      });
      // 영화 평점 및 리뷰 개수 업데이트
      await this.moviesRepository.updateRatingAndIncrementReviewCount(
        tx,
        movieId,
        movieRating,
      );
      return registeredReview;
    });

    return review;
  }

  // id로 리뷰 찾기
  async findReviewById(id: number): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      },
    });

    return review;
  }

  // 리뷰 목록 조회
  async findReviews(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({});

    return reviews;
  }

  // id와 userId로 리뷰와 리뷰에대한 영화 조회
  async findReviewByIdAndUserId(id: number, userId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        movie: true,
      },
    });

    return review;
  }

  // 리뷰 삭제
  async deleteReview(
    id: number,
    userId: number,
    movieId: number,
    newRating: number,
  ): Promise<Review> {
    // 트랜잭션
    const deletedReview = await this.prisma.$transaction(async (tx) => {
      const existedReview = await tx.review.findUnique({
        where: {
          id,
          userId,
        },
      });

      // 리뷰가 존재하지 않을 경우
      if (!existedReview) {
        throw new NotFoundException('존재하지 않거나 삭제된 리뷰입니다.');
      }

      // 리뷰 삭제
      const review = await tx.review.delete({
        where: {
          id,
          userId,
        },
      });

      // 영화 평점 업데이트
      await this.moviesRepository.updateRatingAndDecrementReviewCount(
        tx,
        movieId,
        newRating,
      );
      // 삭제되는 리뷰 반환
      return review;
    });

    return deletedReview;
  }

  async updateReview(
    id: number,
    userId: number,
    movieId: number,
    score: Score,
    newRating: number,
    text: string,
  ): Promise<Review> {
    // 트랜잭션
    const updatedReview = await this.prisma.$transaction(async (tx) => {
      // 리뷰 수정
      const review = await tx.review.update({
        where: {
          id,
          userId,
        },
        data: {
          ...(score && { score }),
          ...(text && { text }),
        },
      });

      // 수정할 평점이 있을 경우
      if (score) {
        await this.moviesRepository.updateRating(tx, movieId, newRating);
      }
      return review;
    });

    return updatedReview;
  }
}
