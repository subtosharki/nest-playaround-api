import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../hash/hash.service';

@Module({
  controllers: [SignupController],
  providers: [SignupService, PrismaService, HashService],
})
export class SignupModule {}
