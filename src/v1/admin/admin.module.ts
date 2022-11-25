import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [AdminService, PrismaService, UtilsService, LoggerService],
  controllers: [AdminController],
})
export class AdminModule {}
