/**
 * Channel → query-key mapping.
 *
 * The `<RealtimeProvider>` (or the WS bridges hook) maps each WS channel
 * to a TanStack Query cache region.
 */

export const CHANNEL_QUERY_KEYS = {
  briefing: ['briefing'] as const,
  approvals: ['approvals'] as const,
  engagement: ['engagement'] as const,
  compliance: ['compliance'] as const,
  sequence: ['outreach', 'sequences'] as const,
  integration: ['integration'] as const,
};
