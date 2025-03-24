import {
  BadRequestException,
  ConflictException,
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

  async findAll() {
    return `This action returns all reviews`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
