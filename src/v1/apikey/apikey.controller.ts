import {
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';

@Controller({ path: 'apikey', version: '1' })
export class ApikeyController {
  constructor(private readonly UtilsService: UtilsService) {}
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async getNewApiKey(@Param('id', ParseIntPipe) id: number) {
    return await this.UtilsService.getNewAPIKey(id);
  }
}
