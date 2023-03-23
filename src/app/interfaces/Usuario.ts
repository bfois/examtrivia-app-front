

  export interface ProviderData {
      providerId: string;
      uid: string;
      displayName: string;
      email: string;
      phoneNumber?: any;
      photoURL: string;
  }

  export interface StsTokenManager {
      refreshToken: string;
      accessToken: string;
      expirationTime: number;
  }

  export default interface Usuario {
      uid: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      isAnonymous: boolean;
      photoURL: string;
      providerData: ProviderData[];
      stsTokenManager: StsTokenManager;
      createdAt: string;
      lastLoginAt: string;
      apiKey: string;
      appName: string;
  }


