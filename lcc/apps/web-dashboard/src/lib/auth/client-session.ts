/**
 * Client-side session wrapper — typed useSession hook.
 */

'use client';

import { useSession as useNextAuthSession } from 'next-auth/react';
import { useCallback } from 'react';
import type { LccSession } from './callbacks';

export function useClientSession(): {
  session: LccSession | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  accessToken: string | null;
} {
  const { data, status } = useNextAuthSession();
  const session = data as LccSession | null;
  return {
    session,
    status,
    accessToken: session?.accessToken ?? null,
  };
}

export function useAccessToken(): string | null {
  const { accessToken } = useClientSession();
  return accessToken;
}

export function useRequireAccessToken(): () => string {
  return useCallback(() => {
    const { accessToken } = useClientSession();
    if (!accessToken) {
      // S-10 fix: trigger re-auth rather than throw an uncaught error.
      if (typeof window !== 'undefined') {
        window.location.assign('/api/auth/linkedin/start');
      }
      throw new Error('Not authenticated: redirecting to sign-in');
    }
    return accessToken;
  }, []);
}
