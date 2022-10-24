import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { ApikeyService } from '../apikey/apikey.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SignupController],
  providers: [SignupService, ApikeyService, PrismaService],
})
export class SignupModule {}
