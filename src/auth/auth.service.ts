import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { SignUp } from './interfaces/sign-up.interface';
import { UsersRepository } from 'src/users/users.repository';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user-email.interface';
import { SignIn } from './interfaces/sign-in.interface';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly authRepository: AuthRepository,
    private readonly usersRepository: UsersRepository,
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUp): Promise<User> {
    const { name, email, password, passwordConfirm } = signUpDto;
    const checkEmail = await this.usersRepository.findUserEmailByEmail(email);

    if (checkEmail) {
      throw new ConflictException('이미 가입한 이메일입니다.');
    }

    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      this.configService.get<string>('HASH_ROUNDS'),
    );
    const data = await this.authRepository.signUp(name, email, hashedPassword);

    return data;
  }

  async signIn(signInDto: SignInDto): Promise<SignIn> {
    const { email, password } = signInDto;

    // 이메일로 유저 조회
    const user: User = await this.usersRepository.findUserEmailByEmail(email);

    // 유저가 존재하지 않을 경우 예외 처리
    if (!user) {
      throw new UnauthorizedException(
        '이메일 혹은 비밀번호를 잘못 입력했거나 등록되지 않은 계정입니다',
      );
    }

    // 비밀번호가 일치하는지 확인
    const checkPassword = await bcrypt.compare(password, user.password);
    // 일치하지 않을 경우 예외 처리
    if (!checkPassword) {
      throw new BadRequestException(
        '이메일 혹은 비밀번호를 잘못 입력했거나 등록되지 않은 계정입니다',
      );
    }

    const payload = { id: user.id, email: user.email };
    // 엑세스 토큰 생성
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      expiresIn: '1h',
    });
    // 리프레시 토큰 조회
    const existedRefreshToken = await this.redisService.getRefreshToken(
      user.id,
    );
    // 리프레시 토큰이 이미 존재할 경우
    if (existedRefreshToken) {
      // 레디스에 엑세스 토큰 저장
      await this.redisService.saveAccessToken(user.id, accessToken);
      return { accessToken };
    }

    // 리프레시 토큰 생성
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: '7d',
    });
    // 레디스에 엑세스, 리프레시 토큰에 저장
    await this.redisService.saveAccessToken(user.id, accessToken);
    await this.redisService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
