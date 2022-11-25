import { Injectable } from '@nestjs/common';
import { LoginBody } from './login.dto';
import { compare } from 'bcrypt';
import { LogType, type UserAPIKeyReturnData } from '../types';
import { UtilsService } from '../utils/utils.service';
import { LoggerService } from '../logger/logger.service';
import { InvalidCredentialsException } from '../exceptions/credentials.exception';

@Injectable()
export class LoginService {
  public constructor(
    private readonly utilService: UtilsService,
    private readonly loggerService: LoggerService,
  ) {}
  public async login({
    username,
    password,
  }: LoginBody): Promise<UserAPIKeyReturnData> {
    const user = await this.utilService.getUserByUsername(username);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    if (user && (await compare(password, user.password))) {
      await this.loggerService.log(LogType.USER_LOGGED_IN, user.apikey);
      return user.apikey;
    }
    throw new InvalidCredentialsException();
  }
}
