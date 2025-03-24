import { BaseResponse } from 'src/common/interfaces/base-response.interface';
import { Review } from './review.interface';

export interface GetReviewsResponse extends BaseResponse {
  data: Review[];
}
