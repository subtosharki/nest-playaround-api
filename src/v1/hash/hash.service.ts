import { Injectable } from '@nestjs/common';
import { hash as genHash, genSalt, compare } from 'bcrypt';

@Injectable()
export class HashService {
  public async hash(val: string) {
    return await genHash(val, await genSalt());
  }
  public async compare(val: string, hash: string) {
    return await compare(val, hash);
  }
}
