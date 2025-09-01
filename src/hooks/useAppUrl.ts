/**
 * Purpose: Provide the public app URL from environment with validation.
 * Inputs: import.meta.env.PUBLIC_APP_URL
 * Outputs: string URL
 * Assumptions: Vite env prefix set to PUBLIC_
 * Side effects: none
 */

export function useAppUrl(): string {
  const url = import.meta.env.PUBLIC_APP_URL as string | undefined;
  if (!url) throw new Error('PUBLIC_APP_URL is not set');
  return url;
}
