import type { User, Logs } from '@prisma/client';
import type { HttpException } from '@nestjs/common';

export type ListOfUsersData = Array<User>;
export type UserReturnData = User | HttpException;
export type UsernameReturnData = User['username'] | HttpException;
export type UpdateUsernameReturnData = User | HttpException;
export type UpdatePasswordReturnData = User | HttpException;

export type UserAPIKeyReturnData = User['apikey'] | HttpException;

export type ListOfLogsData = Array<Logs>;
