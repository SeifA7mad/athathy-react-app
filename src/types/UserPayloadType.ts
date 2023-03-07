// Define user type
export type UserPayload = {
  accessToken: string;
  displayName: string;
};

export type LocalStoredDataKeys = 'user' | 'isLoggedIn';
