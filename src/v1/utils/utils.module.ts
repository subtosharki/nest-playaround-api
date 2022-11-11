import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UtilsService, PrismaService],
  exports: [UtilsService],
})
export class UtilsModule {}
