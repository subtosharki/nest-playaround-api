import { Module } from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import { ApikeyController } from './apikey.controller';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../hash/hash.service';

@Module({
  providers: [ApikeyService, PrismaService, HashService],
  exports: [ApikeyService],
  controllers: [ApikeyController],
})
export class ApikeyModule {}
