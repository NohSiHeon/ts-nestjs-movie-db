export class SignInSuccessResponseDto {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}
