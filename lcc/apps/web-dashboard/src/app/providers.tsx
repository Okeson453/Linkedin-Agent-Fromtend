/**
 * Providers wrapper — QueryClient, ApprovalDialogProvider, Toaster.
 *
 * Mounted at the root so every page has access. SessionProvider is mounted
 * in the (auth) layout only (auth pages don't need session; app pages do).
 */

'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ApprovalDialogProvider } from '@lcc/approval-gate';
import { Toaster } from '@lcc/ui';
import { configureApiClient } from '@/lib/api/client';
import { useClientSession } from '@/lib/auth/client-session';
import { publicEnv } from '@/lib/utils/env';

export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  const session = useClientSession();
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, refetchOnWindowFocus: false },
          mutations: { retry: false },
        },
      }),
  );

  // Configure the API client once with a token getter.
  React.useEffect(() => {
    configureApiClient({
      getToken: () => session.accessToken,
      onUnauthorized: () => {
        // The middleware will redirect to /auth/linkedin/start on next nav.
        window.location.href = '/auth/linkedin/start?return_to=' + encodeURIComponent(window.location.pathname);
      },
      onRestricted: () => {
        window.location.href = '/restricted';
      },
      onVersionMismatch: () => {
        window.location.href = '/update-required';
      },
    });
  }, [session.accessToken]);

  return (
    <QueryClientProvider client={client}>
      <ApprovalDialogProvider>
        {children}
        <Toaster />
        {publicEnv.NEXT_PUBLIC_ENVIRONMENT !== 'production' ? (
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        ) : null}
      </ApprovalDialogProvider>
    </QueryClientProvider>
  );
}
