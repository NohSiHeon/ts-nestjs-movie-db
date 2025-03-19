import { BaseResponse } from 'src/common/interfaces/base-response.interface';

export interface SignInSuccessResponse extends BaseResponse {
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}
