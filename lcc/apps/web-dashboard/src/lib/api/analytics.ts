/**
 * Analytics API — content, profile, network, outreach, funnels, digests.
 */

import { apiFetch } from './client';
import type {
  AccountHealth,
  ContentAnalytics,
  Digest,
  FunnelAnalytics,
  NetworkAnalytics,
  OutreachAnalytics,
  ProfileAnalytics,
} from '@lcc/api-types';

export async function fetchContentAnalytics(memberId: string): Promise<ContentAnalytics> {
  return apiFetch<ContentAnalytics>(`/members/${memberId}/analytics/content`);
}

export async function fetchProfileAnalytics(memberId: string): Promise<ProfileAnalytics> {
  return apiFetch<ProfileAnalytics>(`/members/${memberId}/analytics/profile`);
}

export async function fetchNetworkAnalytics(memberId: string): Promise<NetworkAnalytics> {
  return apiFetch<NetworkAnalytics>(`/members/${memberId}/analytics/network`);
}

export async function fetchOutreachAnalytics(memberId: string): Promise<OutreachAnalytics> {
  return apiFetch<OutreachAnalytics>(`/members/${memberId}/analytics/outreach`);
}

export async function fetchJobFunnel(memberId: string): Promise<FunnelAnalytics> {
  return apiFetch<FunnelAnalytics>(`/members/${memberId}/analytics/funnel/job`);
}

export async function fetchClientFunnel(memberId: string): Promise<FunnelAnalytics> {
  return apiFetch<FunnelAnalytics>(`/members/${memberId}/analytics/funnel/client`);
}

export async function fetchAccountHealth(memberId: string): Promise<AccountHealth> {
  return apiFetch<AccountHealth>(`/members/${memberId}/analytics/account-health`);
}

export async function fetchWeeklyDigest(memberId: string): Promise<Digest> {
  return apiFetch<Digest>(`/members/${memberId}/analytics/digest/weekly`);
}

export async function fetchMonthlyDigest(memberId: string): Promise<Digest> {
  return apiFetch<Digest>(`/members/${memberId}/analytics/digest/monthly`);
}

const ANALYTICS_DISPATCH: Record<string, (memberId: string) => Promise<unknown>> = {
  content: fetchContentAnalytics,
  profile: fetchProfileAnalytics,
  network: fetchNetworkAnalytics,
  outreach: fetchOutreachAnalytics,
  'account-health': fetchAccountHealth,
  'funnel/job': fetchJobFunnel,
  'funnel/client': fetchClientFunnel,
  'digest/weekly': fetchWeeklyDigest,
  'digest/monthly': fetchMonthlyDigest,
};

/** Unified analytics accessor consumed by the generic `<AnalyticsShellClient>`.
 * Throws on an unknown metric so a mis-routed shell fails loudly instead of rendering silently wrong. */
export async function getAnalytics(memberId: string, metric: string): Promise<unknown> {
  const loader = ANALYTICS_DISPATCH[metric];
  if (!loader) {
    throw new Error(`[getAnalytics] unknown metric "${metric}". Supported: ${Object.keys(ANALYTICS_DISPATCH).join(', ')}`);
  }
  return loader(memberId);
}

