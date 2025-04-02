import { BaseResponse } from 'src/common/interfaces/base-response.interface';

export interface SignOutSuccessResponse extends BaseResponse {
  data: boolean;
}
