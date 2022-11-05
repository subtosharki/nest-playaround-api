import {
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApikeyService } from './apikey.service';

@Controller({ path: 'apikey', version: '1' })
export class ApikeyController {
  constructor(private readonly APIkeyService: ApikeyService) {}
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async getNewApiKey(@Param('id', ParseIntPipe) id: number) {
    return await this.APIkeyService.getNewAPIKey(id);
  }
}
