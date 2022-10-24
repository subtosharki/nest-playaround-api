import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../hash/hash.service';

@Module({
  providers: [LoginService, PrismaService, HashService],
  controllers: [LoginController],
})
export class LoginModule {}
