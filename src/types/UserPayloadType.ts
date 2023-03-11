// Define user type
export type UserPayload = {
  accessToken: string;
  displayName: string;
  email: string;
};

export type LocalStoredDataKeys = 'user' | 'isLoggedIn';
