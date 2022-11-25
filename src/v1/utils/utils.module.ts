import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [UtilsService, PrismaService, LoggerService],
  exports: [UtilsService],
})
export class UtilsModule {}
