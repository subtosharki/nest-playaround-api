import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  providers: [LoggerService, PrismaService, UtilsService],
  controllers: [LoggerController],
})
export class LoggerModule {}
