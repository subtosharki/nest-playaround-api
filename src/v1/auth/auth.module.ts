import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [PrismaService, UtilsService, LoggerService],
})
export class AuthModule {}
