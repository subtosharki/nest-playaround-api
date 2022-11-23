import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { ERROR_MESSAGES } from '../types';
import { compare } from 'bcrypt';
import { GetNewApiKeyDto } from '../apikey/apikey.dto';

@Injectable()
export class UtilsService {
  public constructor(private readonly prisma: PrismaService) {}
  public async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  public async getUserByApiKey(apikey: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        apikey,
      },
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  public async getUserByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  public async deleteUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  public async getNewAPIKey(
    id: number,
    { password }: GetNewApiKeyDto,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
    }
    if (!(await compare(password, user.password))) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID.PASSWORD,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        apikey: uuid(),
      },
    });
  }
}
