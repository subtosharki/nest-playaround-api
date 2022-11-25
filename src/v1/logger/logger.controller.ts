import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { APIKeyHeaderContent, type ListOfLogsData } from '../types';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../admin/admin.guard';

@ApiTags('Logs')
@ApiHeader(APIKeyHeaderContent)
@UseGuards(AdminGuard)
@Controller({ path: 'logs', version: '1' })
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}
  @ApiOkResponse({ description: 'Returns a list of all logs' })
  @Get('/')
  @UsePipes(ValidationPipe)
  public async getAllLogs(): Promise<ListOfLogsData> {
    return await this.loggerService.getAllLogs();
  }
}
