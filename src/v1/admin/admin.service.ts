import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
import type { User } from '@prisma/client';
import type { ListOfUsersData } from '../types/types';
import { ERROR_MESSAGES } from '../types/consts';

@Injectable()
export class AdminService {
  public constructor(private readonly prisma: PrismaService) {}
  public async getAllAdmins(): Promise<ListOfUsersData> {
    return await this.prisma.user.findMany({
      where: {
        admin: true,
      },
    });
  }
  public async setAdmin(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        admin: true,
      },
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.admin) {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          admin: false,
        },
      });
    } else {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          admin: true,
        },
      });
    }
  }
  public async isAdmin(request: Request): Promise<boolean> {
    const apikey = String(request.headers['x-api-key']);
    const user = await this.prisma.user.findFirst({
      where: {
        apikey,
      },
      select: {
        admin: true,
      },
    });
    if (user.admin) return true;
    throw new HttpException(
      ERROR_MESSAGES.PERMISSION.ADMIN,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
