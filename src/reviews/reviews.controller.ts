import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { RegisterReviewDto } from './dtos/register-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { User } from 'src/users/decorators/user.decorator';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { RegisterReviewResponse } from './interfaces/register-review-response.interface';
import { GetReviewResponse } from './interfaces/get-review-response.interface';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthenticationGuard)
  @Post('/:id')
  async registerReview(
    @Body() registerReviewDto: RegisterReviewDto,
    @Param('id') movieId: number,
    @User() userInfo: Payload,
  ): Promise<RegisterReviewResponse> {
    const userId = userInfo.id;

    const data = await this.reviewsService.registerReview(
      registerReviewDto,
      +movieId,
      userId,
    );

    return {
      status: HttpStatus.CREATED,
      message: '리뷰 작성 성공',
      data,
    };
  }

  @Get(':id')
  async getReview(@Param('id') id: number): Promise<GetReviewResponse> {
    const data = await this.reviewsService.getReview(+id);

    return {
      status: HttpStatus.OK,
      message: '리뷰 조회 성공',
      data,
    };
  }

  @Get()
  async getReviews() {
    const data = await this.reviewsService.getReviews();
    return {
      status: HttpStatus.OK,
      message: '리뷰 목록 조회 성공',
      data,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
