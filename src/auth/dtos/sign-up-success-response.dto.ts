export class SignUpSuccessResponseDto {
  status: number;
  message: string;
  data: {
    email: string;
    name: string;
  };
}
