import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ApikeyService {
  public async generateAPIKey() {
    try {
      return uuid();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
