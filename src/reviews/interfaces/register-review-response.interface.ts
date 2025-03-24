import { BaseResponse } from 'src/common/interfaces/base-response.interface';
import { Review } from './review.interface';

export interface RegisterReviewResponse extends BaseResponse {
  data: Review;
}
