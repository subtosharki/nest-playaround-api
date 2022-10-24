import { Injectable } from '@nestjs/common';
import { hash as genHash, genSalt, compare } from 'bcrypt';

@Injectable()
export class HashService {
  private async getSalt() {
    return await genSalt();
  }
  public async hashPassword(password: string) {
    return await genHash(password, await this.getSalt());
  }
  public async comparePassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}
