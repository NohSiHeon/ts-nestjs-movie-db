import { BaseResponse } from 'src/common/interfaces/base-response.interface';

export interface SignUpFailResponse extends BaseResponse {
  data: {
    error: string;
  };
}
