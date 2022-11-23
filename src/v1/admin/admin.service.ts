import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@prisma/client';
import type { ListOfUsersData } from '../types';
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
}
