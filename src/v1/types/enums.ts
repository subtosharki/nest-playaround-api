export enum ErrorMessages {
  USERNAME_ALREADY_IN_USE = 'Username already in use',
  PASSWORD_IN_USE = 'Password already in use',
  INVALID_OLD_PASSWORD = 'Invalid old password',
  INVALID_CONFIRMATION_PASSWORD = 'Invalid confirmation password',
  INVALID_CREDENTIALS = 'Invalid credentials',
  INVALID_APIKEY = 'Invalid API key',
  USER_NOT_FOUND = 'User not found',
  USERNAME_ALREADY_EXISTS = 'Username already exists',
  PASSWORDS_DO_NOT_MATCH = 'Passwords do not match',
  MISSING_ADMIN_PERMISSION = 'Missing admin permission',
}

export enum LogType {
  USER_CREATED = 'User created',
  USER_UPDATED = 'User updated',
  USER_DELETED = 'User deleted',
  USER_LOGGED_IN = 'User logged in',
  ADMIN_PERMISSION_ADDED = 'Admin permission added to a user',
  ADMIN_PERMISSION_REMOVED = 'Admin permission removed from a user',
  NEW_APIKEY = 'New API key generated',
}
