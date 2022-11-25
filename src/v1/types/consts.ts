import { UserAPIKeyReturnData as UserAPIKeyReturnDataClass } from '../login/login.dto';
import {
  UserReturnData as UserReturnDataClass,
  UserReturnData,
} from '../signup/signup.dto';
import { UsernameReturnData as UsernameReturnDataClass } from '../users/users.dto';

export const APIKeyHeaderContent = { name: 'x-api-key' };
export const LoginResponseContent = {
  description: 'Returns the Users APIKey if credentials are valid',
  type: UserAPIKeyReturnDataClass,
};
export const SignupResponseContent = {
  description: 'Returns the new user data if a new account is created',
  type: UserReturnData,
};
export const GetAllUsersResponseContent = {
  description: 'Returns a list of all users',
};
export const GetUserResponseContent = {
  description: 'Returns a certain users data',
  type: UserReturnDataClass,
};
export const DeleteUserResponseContent = {
  description: 'Deletes the ID given',
  type: UserReturnDataClass,
};
export const GetUsernameResponseContent = {
  description: 'Returns the IDs username',
  type: UsernameReturnDataClass,
};
export const UpdateUsernameResponseContent = {
  description: 'Change the IDs username',
  type: UserReturnDataClass,
};
export const UpdatePasswordResponseContent = {
  description: 'Change the IDs password',
  type: UserReturnDataClass,
};
