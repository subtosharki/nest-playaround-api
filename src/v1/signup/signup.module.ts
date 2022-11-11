import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  controllers: [SignupController],
  providers: [SignupService, PrismaService, UtilsService],
})
export class SignupModule {}
