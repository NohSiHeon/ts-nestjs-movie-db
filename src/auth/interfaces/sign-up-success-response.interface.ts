import { BaseResponse } from 'src/common/interfaces/base-response.interface';
export interface SignUpSuccessResponse extends BaseResponse {
  data: {
    id: number;
    email: string;
    password: string;
    name: string;
  };
}
