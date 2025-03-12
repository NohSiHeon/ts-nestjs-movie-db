export class SignUpFailResponseDto {
  status: number;
  message: string;
  data: {
    error: string;
  };
}
