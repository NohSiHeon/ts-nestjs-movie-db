import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async signUp(name: string, email: string, password: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
      },
    });
    return user;
  }
}
