import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserEmail } from './interfaces/user-email.interface';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUserEmailByEmail(email: string): Promise<UserEmail | null> {
    const userEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    return userEmail;
  }
}
