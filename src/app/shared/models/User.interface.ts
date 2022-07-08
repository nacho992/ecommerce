export interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  emailVerified?: boolean;
  password?: string;
  photoURL?: string;
  stsTokenManager?: StsTokenManager;
}

interface StsTokenManager {
  apiKey?:         string;
  refreshToken?:   string;
  accessToken?:    string;
  expirationTime?: number;
}
