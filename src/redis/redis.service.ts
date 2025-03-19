import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
} from 'src/constants/env.constants';
@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: RedisClientType;

  async onModuleInit() {
    this.redisClient = createClient({
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
      password: REDIS_PASSWORD,
    });
    await this.redisClient.connect();
    console.log('redis connected');
  }
  // 엑세스 토큰 저장
  async saveAccessToken(userId: number, accessToken: string) {
    await this.redisClient.set(`accessToken:${userId}`, accessToken, {
      EX: 3600,
    });
  }
  // 리프레시 토큰 저장
  async saveRefreshToken(userId: number, refreshToken: string) {
    await this.redisClient.set(`refreshToken:${userId}`, refreshToken, {
      EX: 86400,
    });
  }
  // 리프레시 토큰 조회
  async getRefreshToken(userId: number): Promise<string> {
    return await this.redisClient.get(`refreshToken:${userId}`);
  }
}
