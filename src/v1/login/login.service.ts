import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import { compare } from 'bcrypt';
import { ERROR_MESSAGES, type UserAPIKeyReturnData } from '../types';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class LoginService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly utilService: UtilsService,
  ) {}
  public async login({
    username,
    password,
  }: LoginDto): Promise<UserAPIKeyReturnData> {
    const user = await this.utilService.getUserByUsername(username);
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
