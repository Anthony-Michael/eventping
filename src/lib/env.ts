/**
 * Purpose: Provide validated public Firebase environment configuration.
 * Inputs: import.meta.env with VITE_/PUBLIC_ prefixed variables
 * Outputs: getEnv(): { apiKey, authDomain, projectId, appId, messagingSenderId }
 * Assumptions: Vite envPrefix includes ['VITE_', 'PUBLIC_']; in dev, missing vars throw
 * Side effects: throws in dev if required env is missing
 */

export type FirebasePublicEnv = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  messagingSenderId: string;
};

type RequiredKey =
  | 'VITE_FIREBASE_API_KEY'
  | 'VITE_FIREBASE_AUTH_DOMAIN'
  | 'VITE_FIREBASE_PROJECT_ID'
  | 'VITE_FIREBASE_APP_ID'
  | 'VITE_FIREBASE_MESSAGING_SENDER_ID';

function readEnvVar(
  key: RequiredKey,
  env: Record<string, string | boolean | undefined>,
  isDev: boolean,
): string {
  const value = env[key] as string | undefined;
  if (isDev && !value) throw new Error(`Missing required env vars: ${key}`);
  return value ?? '';
}

export function getEnv(): FirebasePublicEnv {
  const env = import.meta.env as Record<string, string | boolean | undefined>;
  const isDev = Boolean((env.DEV as boolean | undefined) ?? false);

  return {
    apiKey: readEnvVar('VITE_FIREBASE_API_KEY', env, isDev),
    authDomain: readEnvVar('VITE_FIREBASE_AUTH_DOMAIN', env, isDev),
    projectId: readEnvVar('VITE_FIREBASE_PROJECT_ID', env, isDev),
    appId: readEnvVar('VITE_FIREBASE_APP_ID', env, isDev),
    messagingSenderId: readEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', env, isDev),
  };
}
