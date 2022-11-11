import { Module } from '@nestjs/common';
import { ApikeyController } from './apikey.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  providers: [PrismaService, UtilsService],
  controllers: [ApikeyController],
})
export class ApikeyModule {}
