import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
import { MissingPermissionException } from '../exceptions/permission.exception';
import type { User } from '@prisma/client';
import { UserNotFoundException } from '../exceptions/users.exception';
import type { ListOfUsersData } from '../types/types';

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
      throw new UserNotFoundException();
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
    throw new MissingPermissionException('ADMIN');
  }
}
