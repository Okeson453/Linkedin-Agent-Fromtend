/**
 * Auth API — token refresh, logout.
 */

import { apiFetch } from './client';
import type { TokenPair } from '@lcc/api-types';

export async function refreshSession(): Promise<TokenPair> {
  return apiFetch<TokenPair>('/auth/refresh', { method: 'POST' });
}

export async function logout(): Promise<void> {
  await apiFetch<void>('/auth/logout', { method: 'POST' });
}

export function linkedInStartUrl(returnTo?: string): string {
  const params = new URLSearchParams();
  if (returnTo) params.set('return_to', returnTo);
  const qs = params.toString();
  return `/auth/linkedin/start${qs ? `?${qs}` : ''}`;
}
