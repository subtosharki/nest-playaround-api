import { Module } from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import { ApikeyController } from './apikey.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ApikeyService, PrismaService],
  exports: [ApikeyService],
  controllers: [ApikeyController],
})
export class ApikeyModule {}
