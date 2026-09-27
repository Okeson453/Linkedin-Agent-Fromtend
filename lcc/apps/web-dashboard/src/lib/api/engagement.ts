/**
 * Engagement API — inbox, queue, reply, approve.
 */

import { apiFetch } from './client';
import type { InboxItem, QueueItem, ReplyDecision, ReplyVariant } from '@lcc/api-types';

export async function fetchInbox(memberId: string, cursor?: string): Promise<InboxItem[]> {
  return apiFetch<InboxItem[]>(`/members/${memberId}/engagement/inbox`, { query: { cursor } });
}

export async function fetchQueue(memberId: string): Promise<QueueItem[]> {
  return apiFetch<QueueItem[]>(`/members/${memberId}/engagement/queue`);
}

export async function draftReply(memberId: string, taskId: string): Promise<ReplyVariant[]> {
  return apiFetch<ReplyVariant[]>(`/members/${memberId}/engagement/tasks/${taskId}/draft-reply`, {
    method: 'POST',
  });
}

export async function approveReply(
  memberId: string,
  taskId: string,
  decision: ReplyDecision,
): Promise<QueueItem> {
  return apiFetch<QueueItem>(`/members/${memberId}/engagement/tasks/${taskId}/approve`, {
    method: 'POST',
    body: decision,
  });
}
