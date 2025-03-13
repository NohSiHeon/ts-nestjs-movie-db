export class SignUpSuccessResponseDto {
  status: number;
  message: string;
  data: {
    id: number;
    email: string;
    password: string;
    name: string;
  };
}
