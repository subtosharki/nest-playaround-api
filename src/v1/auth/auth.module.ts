import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
