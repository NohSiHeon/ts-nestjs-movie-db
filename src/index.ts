import { Module } from '@nestjs/common';
import { AppModule } from './apps/app.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AppModule, UsersModule, AuthModule, MoviesModule],
  controllers: [],
  providers: [PrismaService],
})
export class IndexModule {}
