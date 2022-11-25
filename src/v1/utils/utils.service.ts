import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { GetNewAPIKeyBody } from '../apikey/apikey.dto';
import type { Request } from 'express';
import { ErrorMessages, LogType } from '../types';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UtilsService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}
  public async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        ErrorMessages.USER_NOT_FOUND,
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
        ErrorMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  public async getUserByUsername(
    username: string,
    hideException?: boolean,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!hideException) {
      if (!user) {
        throw new HttpException(
          ErrorMessages.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
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
        ErrorMessages.USER_NOT_FOUND,
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
    { password }: GetNewAPIKeyBody,
  ): Promise<User> {
    const user = await this.getUserById(id);
    if (!(await compare(password, user.password))) {
      throw new HttpException(
        ErrorMessages.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        apikey: uuid(),
      },
    });
    this.loggerService.emit(LogType.NEW_APIKEY, updatedUser);
    return updatedUser;
  }
  public async isAdmin(request: Request): Promise<boolean> {
    if ('x-api-key' in request.headers) {
      const apikey = String(request.headers['x-api-key']);
      const user = await this.getUserByApiKey(apikey);
      if (user.admin) return true;
      throw new HttpException(
        ErrorMessages.MISSING_ADMIN_PERMISSION,
        HttpStatus.UNAUTHORIZED,
      );
    }
    throw new HttpException(
      ErrorMessages.MISSING_ADMIN_PERMISSION,
      HttpStatus.UNAUTHORIZED,
    );
  }
  public async validateApiKey(request: Request): Promise<boolean> {
    if ('x-api-key' in request.headers) {
      const apikey = String(request.headers['x-api-key']);
      const user = await this.prisma.user.findFirst({
        where: {
          apikey,
        },
      });
      if (user) return true;
      throw new HttpException(
        ErrorMessages.INVALID_APIKEY,
        HttpStatus.UNAUTHORIZED,
      );
    }
    throw new HttpException(
      ErrorMessages.INVALID_APIKEY,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
