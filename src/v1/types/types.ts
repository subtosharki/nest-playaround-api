import type { User } from '@prisma/client';
import type { UserNotFoundException } from '../exceptions/users.exception';
import type {
  AlreadyInUseException,
  InvalidPropertyException,
} from '../exceptions/users.exception';

export type ListOfUsersData = Array<User>;
export type UserReturnData = User | UserNotFoundException;
export type UsernameReturnData = User['username'] | UserNotFoundException;
export type UpdateUsernameReturnData =
  | User
  | UserNotFoundException
  | AlreadyInUseException;
export type UpdatePasswordReturnData =
  | User
  | InvalidPropertyException
  | UserNotFoundException
  | AlreadyInUseException;

export type UserAPIKeyReturnData = User['apikey'] | UserNotFoundException;

export enum InUseTypes {
  'PASSWORD',
  'USERNAME',
}
export enum PropertyTypes {
  'OLD_PASSWORD',
  'CONFIRMATION_PASSWORD',
  'PASSWORD',
}
