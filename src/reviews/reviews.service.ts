import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterReviewDto } from './dtos/register-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewsRepository } from './reviews.repository';
import { MoviesRepository } from 'src/movies/movies.repository';
import { Score } from './enums/score.enum';
import { Review } from './interfaces/review.interface';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly reviewsRepository: ReviewsRepository,
  ) {}
  // 리뷰 등록
  async registerReview(
    registerReviewDto: RegisterReviewDto,
    requestUserId: number,
  ): Promise<Review> {
    const { movieId, score, text } = registerReviewDto;
    const scoreNumber = Score[score];

    const movie = await this.moviesRepository.findMovieById(movieId);
    if (!movie) {
      throw new NotFoundException('존재하지 않거나 삭제된 영화입니다.');
    }

    const { rating, reviewCount, userId } = movie;

    if (userId == requestUserId) {
      throw new UnauthorizedException(
        '영화 등록자는 리뷰를 작성할 권한이 없습니다.',
      );
    }
    const newRating = (rating * reviewCount + scoreNumber) / (reviewCount + 1);
    const registeredReview = await this.reviewsRepository.registerReview(
      score,
      text,
      newRating,
      movieId,
      requestUserId,
    );
    return registeredReview;
  }

  // 리뷰 상세 조회
  async getReview(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findReviewById(id);
    if (!review) {
      throw new NotFoundException('존재하지 않거나 삭제된 리뷰입니다.');
    }
    return review;
  }
  async getReviews(): Promise<Review[]> {
    const reviews = await this.reviewsRepository.findReviews();
    return reviews;
  }

  // 리뷰 수정
  async updateReview(
    id: number,
    userId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewsRepository.findReviewByIdAndUserId(
      id,
      userId,
    );
    if (!review) {
      throw new NotFoundException('존재하지 않거나 삭제된 리뷰입니다.');
    }

    const { score, text } = updateReviewDto;
    // 기존 리뷰 평점
    const existedScore = Score[review.score];

    // 수정할 리뷰 평점
    const updateScore = Score[score];

    // 새로운 리뷰에 맞게 영화 평점 계산
    const newRating =
      (review.movie.rating * review.movie.reviewCount -
        existedScore +
        updateScore) /
      review.movie.reviewCount;
    return await this.reviewsRepository.updateReview(
      id,
      userId,
      review.movieId,
      score,
      newRating,
      text,
    );
  }

  // 리뷰 삭제
  async deleteReview(id: number, userId: number): Promise<Review> {
    const existedReview = await this.reviewsRepository.findReviewByIdAndUserId(
      id,
      userId,
    );

    if (!existedReview) {
      throw new NotFoundException('존재하지 않거나 삭제된 리뷰입니다.');
    }

    // 영화 id
    const movieId = existedReview.movieId;

    // 리뷰 점수 숫자로 변환
    const score = Score[existedReview.score];

    // 새로 업데이트 될 영화 평점 계산
    const newRating =
      (existedReview.movie.rating * existedReview.movie.reviewCount - score) /
      (existedReview.movie.reviewCount - 1);

    const deletedReview = await this.reviewsRepository.deleteReview(
      id,
      userId,
      movieId,
      newRating,
    );

    return deletedReview;
  }
}
