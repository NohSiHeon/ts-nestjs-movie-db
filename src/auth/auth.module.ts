import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RedisModule } from 'src/redis/redis.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    AuthenticationGuard,
    JwtService,
    AccessTokenStrategy,
    LocalStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthenticationGuard, JwtService, AuthRepository],
})
export class AuthModule {}
