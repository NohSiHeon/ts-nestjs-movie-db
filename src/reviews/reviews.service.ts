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
  async registerReview(
    registerReviewDto: RegisterReviewDto,
    movieId: number,
    requestUserId: number,
  ): Promise<Review> {
    const { score, text } = registerReviewDto;
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

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

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
