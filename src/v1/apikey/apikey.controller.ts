import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('API Key')
@Controller({ path: 'apikey', version: '1' })
export class ApikeyController {
  public constructor(private readonly utilsService: UtilsService) {}
  @Patch('/:id')
  public async getNewApiKey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return await this.utilsService.getNewAPIKey(id);
  }
}
