import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpSuccessResponseDto } from './dtos/sign-up-success-response.dto';
import { SignUpFailResponseDto } from './dtos/sign-up-fail-response.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignInSuccessResponseDto } from './dtos/sign-in-success-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(
    @Request() req,
    // @Body() signInDto: SignInDto,
  ): Promise<SignInSuccessResponseDto> {
    const data = await this.authService.signIn(req.user.id, req.user.email);

    return {
      status: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      data,
    };
  }
}
