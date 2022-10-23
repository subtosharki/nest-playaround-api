import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  public async checkAuth(apikey: string) {
    const auth = await this.prisma.user.findUnique({
      where: {
        apikey,
      },
    });
    return !!auth;

  }

}
