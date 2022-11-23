import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
import type { User } from '@prisma/client';
import { ERROR_MESSAGES, type ListOfUsersData } from '../types';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class AdminService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly utilService: UtilsService,
  ) {}
  public async getAllAdmins(): Promise<ListOfUsersData> {
    return await this.prisma.user.findMany({
      where: {
        admin: true,
      },
    });
  }
  public async setAdmin(id: number): Promise<User> {
    const user = await this.utilService.getUserById(id);
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
    const user = await this.utilService.getUserByApiKey(apikey);
    if (user.admin) return true;
    throw new HttpException(
      ERROR_MESSAGES.PERMISSION.ADMIN,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
