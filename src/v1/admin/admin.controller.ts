import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';
import { ApiTags } from '@nestjs/swagger';
import type { ListOfUsersData } from '../types/types';
import type { User } from '@prisma/client';

@ApiTags('Admin')
@UseGuards(AdminGuard)
@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('/')
  async getAllAdmins(): Promise<ListOfUsersData> {
    return await this.adminService.getAllAdmins();
  }
  @Post('/add/:id')
  async setAdmin(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.adminService.setAdmin(id);
  }
}
