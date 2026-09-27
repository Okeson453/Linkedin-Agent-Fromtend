/**
 * API client config — base URL, timeouts, retries.
 */

const envBase = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE) || '';

export const API_BASE = envBase || '';
export const WS_BASE =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_WS_BASE) || '';

export const API_TIMEOUT_MS = 30_000;
export const API_MAX_RETRIES = 2;

export const API_PATHS = {
  auth: {
    linkedinStart: '/auth/linkedin/start',
    linkedinCallback: '/auth/linkedin/callback',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  members: {
    me: '/members/me',
    settings: '/members/me/settings',
    export: (id: string) => `/members/${id}/export`,
  },
} as const;
