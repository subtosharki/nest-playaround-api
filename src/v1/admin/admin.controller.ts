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
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { ListOfUsersData } from '../types';
import type { User } from '@prisma/client';
import { UserReturnData } from '../signup/signup.dto';
import { APIKeyHeaderContent } from '../types';

@ApiTags('Admin')
@ApiHeader(APIKeyHeaderContent)
@UseGuards(AdminGuard)
@Controller({ path: 'admin', version: '1' })
export class AdminController {
  public constructor(private readonly adminService: AdminService) {}
  @ApiOkResponse({ description: 'Gives a list of admins' })
  @Get('/')
  public async getAllAdmins(): Promise<ListOfUsersData> {
    return await this.adminService.getAllAdmins();
  }
  @ApiOkResponse({
    description: 'Switches a users admin status on/off',
    type: UserReturnData,
  })
  @Post('/:id')
  public async setAdmin(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.adminService.setAdmin(id);
  }
}
