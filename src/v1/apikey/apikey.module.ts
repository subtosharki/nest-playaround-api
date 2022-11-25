import { Module } from '@nestjs/common';
import { ApikeyController } from './apikey.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [PrismaService, UtilsService, LoggerService],
  controllers: [ApikeyController],
})
export class ApikeyModule {}
