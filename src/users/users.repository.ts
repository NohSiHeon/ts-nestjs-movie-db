import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUserInfoByEmail(email: string): Promise<Omit<User, 'role'> | null> {
    const userInfo = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
    });

    return userInfo;
  }

  async findUserByIdAndEmail(
    id: number,
    email: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  }
}
