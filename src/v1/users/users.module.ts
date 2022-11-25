import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { AdminService } from '../admin/admin.service';
import { UtilsService } from '../utils/utils.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    AdminService,
    UtilsService,
    LoggerService,
  ],
})
export class UsersModule {
  constructor() {}
}
