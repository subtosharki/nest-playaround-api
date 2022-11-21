import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import { compare } from 'bcrypt';
import { UserAPIKeyReturnData } from '../types/types';

@Injectable()
export class LoginService {
  public constructor(private readonly prisma: PrismaService) {}
  public async login({
    username,
    password,
  }: LoginDto): Promise<UserAPIKeyReturnData> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        password: true,
        apikey: true,
      },
    });
    if (user && (await compare(password, user.password))) {
      return user.apikey;
    }
    throw new UnauthorizedException();
  }
}
