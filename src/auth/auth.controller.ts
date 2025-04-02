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
import { SignUpSuccessResponse } from './interfaces/sign-up-success-response.interface';
import { SignUpFailResponse } from './interfaces/sign-up-fail-response.interface';
import { SignInSuccessResponse } from './interfaces/sign-in-success-response.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/decorators/user.decorator';
import { Payload } from './interfaces/payload.interface';
import { SignOutSuccessResponse } from './interfaces/sign-out-success-reponse.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<SignUpSuccessResponse | SignUpFailResponse> {
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
  ): Promise<SignInSuccessResponse> {
    const data = await this.authService.signIn(req.user.id, req.user.email);

    return {
      status: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      data,
    };
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('sign-out')
  async signOut(@User() userInfo: Payload): Promise<SignOutSuccessResponse> {
    const { id } = userInfo;
    const data = await this.authService.signOut(id);

    return {
      status: HttpStatus.OK,
      message: '로그아웃에 성공했습니다.',
      data,
    };
  }
}
