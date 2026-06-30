export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthErrorResponse = {
  error: string;
  code: string;
};
