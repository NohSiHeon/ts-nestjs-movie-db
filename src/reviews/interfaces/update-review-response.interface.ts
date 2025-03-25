import { BaseResponse } from 'src/common/interfaces/base-response.interface';
import { Review } from './review.interface';

export interface UpdateReviewResponse extends BaseResponse {
  data: Review;
}
