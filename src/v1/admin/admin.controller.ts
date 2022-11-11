import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@UseGuards(AdminGuard)
@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllAdmins() {
    return await this.adminService.getAllAdmins();
  }
  @Post('/add/:id')
  @HttpCode(HttpStatus.OK)
  async setAdmin(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.setAdmin(id);
  }
}
