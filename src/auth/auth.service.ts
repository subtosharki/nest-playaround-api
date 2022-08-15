import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly usersModel: Model<User>) {}
  public async checkAuth(authCode: string) {
    const auth = await this.usersModel.findOne({ apikey: authCode });
    console.log(auth)
    if(!auth) return false
    return true
  }
}
