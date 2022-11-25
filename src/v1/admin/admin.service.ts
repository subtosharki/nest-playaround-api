import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@prisma/client';
import type { ListOfUsersData } from '../types';
import { UtilsService } from '../utils/utils.service';
import { LoggerService } from '../logger/logger.service';
import { LogType } from '../types';

@Injectable()
export class AdminService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly utilService: UtilsService,
    private readonly loggerService: LoggerService,
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
    if (!user.admin) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          admin: true,
        },
      });
      this.loggerService.emit(LogType.ADMIN_PERMISSION_ADDED, updatedUser);
      return updatedUser;
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        admin: false,
      },
    });
    this.loggerService.emit(LogType.ADMIN_PERMISSION_REMOVED, updatedUser);
  }
}
