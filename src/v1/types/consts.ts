export const ERROR_MESSAGES = {
  IN_USE: {
    PASSWORD: 'Password already in use',
    USERNAME: 'Username already in use',
  },
  INVALID: {
    OLD_PASSWORD: 'Invalid old password',
    CONFIRMATION_PASSWORD: 'Invalid confirmation password',
    PASSWORD: 'Invalid password',
    USERNAME: 'Invalid username',
    APIKEY: 'Invalid API key',
  },
  NOT_FOUND: {
    USER: 'User not found',
  },
  ALREADY_EXISTS: {
    USERNAME: 'Username already exists',
  },
  DO_NOT_MATCH: {
    PASSWORDS: 'Passwords do not match',
  },
  PERMISSION: {
    ADMIN: 'Missing admin permission',
  },
};

export const APIKeyHeaderContent = { name: 'x-api-key' };
