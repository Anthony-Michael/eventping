/**
 * Purpose: Provide validated public Firebase environment configuration.
 * Inputs: import.meta.env.PUBLIC_* variables
 * Outputs: getEnv(): { apiKey, authDomain, projectId, appId, messagingSenderId }
 * Assumptions: Vite env prefix PUBLIC_; in dev, missing vars throw
 * Side effects: throws in dev if required env is missing
 */

export type FirebasePublicEnv = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  messagingSenderId: string;
};

const REQUIRED_KEYS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
] as const;

export function getEnv(): FirebasePublicEnv {
  const env = import.meta.env as Record<string, string | boolean | undefined>;
  const isDev = Boolean((env.DEV as boolean | undefined) ?? false);
  if (isDev) {
    const missing = REQUIRED_KEYS.filter((key) => !env[key]);
    if (missing.length > 0) throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }

  return {
    apiKey: (env.VITE_FIREBASE_API_KEY as string | undefined) ?? '',
    authDomain: (env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined) ?? '',
    projectId: (env.VITE_FIREBASE_PROJECT_ID as string | undefined) ?? '',
    appId: (env.VITE_FIREBASE_APP_ID as string | undefined) ?? '',
    messagingSenderId: (env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined) ?? '',
  };
}
