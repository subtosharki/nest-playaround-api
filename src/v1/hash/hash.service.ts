import { Injectable } from '@nestjs/common';
import { hash as genHash, genSalt, compare } from 'bcrypt';

@Injectable()
export class HashService {
  public async hash(password: string) {
    return await genHash(password, await genSalt());
  }
  public async compare(password: string, hash: string) {
    return await compare(password, hash);
  }
}
