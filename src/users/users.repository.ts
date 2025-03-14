import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './interfaces/user-email.interface';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUserEmailByEmail(email: string): Promise<User | null> {
    const userEmail = await this.prisma.user.findUnique({
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

    return userEmail;
  }

  async findUserByIdAndEmail(
    id: number,
    email: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  }
}
