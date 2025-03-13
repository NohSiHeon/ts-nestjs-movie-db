import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpSuccessResponseDto } from './dtos/sign-up-success-response.dto';
import { SignUpFailResponseDto } from './dtos/sign-up-fail-response.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<SignUpSuccessResponseDto | SignUpFailResponseDto> {
    const data = await this.authService.signUp(signUpDto);

    return {
      status: HttpStatus.CREATED,
      message: '회원가입 성공',
      data,
    };
  }

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const data = await this.authService.signIn(signInDto);

    return {
      status: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      data,
    };
  }
}
