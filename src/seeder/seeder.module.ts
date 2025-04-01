// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MoviesModule } from 'src/movies/movies.module';
import { AuthModule } from 'src/auth/auth.module';
// 필요한 다른 모듈들 import

@Module({
  imports: [PrismaModule, MoviesModule, AuthModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
