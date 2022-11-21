import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import { compare } from 'bcrypt';
import { ERROR_MESSAGES, type UserAPIKeyReturnData } from '../types';

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
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID.USERNAME,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user && (await compare(password, user.password))) {
      return user.apikey;
    }
    throw new HttpException(
      ERROR_MESSAGES.INVALID.PASSWORD,
      HttpStatus.BAD_REQUEST,
    );
  }
}
