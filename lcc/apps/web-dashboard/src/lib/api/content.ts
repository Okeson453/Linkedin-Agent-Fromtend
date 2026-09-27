/**
 * Content API — items, compose, quality check, schedule, calendar.
 */

import { apiFetch } from './client';
import type {
  CalendarEntry,
  ComposeRequest,
  ContentCreate,
  ContentItem,
  ContentUpdate,
  ContentVariant,
  QualityReport,
} from '@lcc/api-types';

export async function listContent(
  memberId: string,
  status?: string,
): Promise<ContentItem[]> {
  return apiFetch<ContentItem[]>(`/members/${memberId}/content`, {
    query: { status },
  });
}

export async function createContent(memberId: string, input: ContentCreate): Promise<ContentItem> {
  return apiFetch<ContentItem>(`/members/${memberId}/content`, { method: 'POST', body: input });
}

export async function getContentItem(memberId: string, contentId: string): Promise<ContentItem> {
  return apiFetch<ContentItem>(`/members/${memberId}/content/${contentId}`);
}

export async function updateContentItem(
  memberId: string,
  contentId: string,
  input: ContentUpdate,
): Promise<ContentItem> {
  return apiFetch<ContentItem>(`/members/${memberId}/content/${contentId}`, {
    method: 'PATCH',
    body: input,
  });
}

export async function deleteContentItem(memberId: string, contentId: string): Promise<void> {
  await apiFetch<void>(`/members/${memberId}/content/${contentId}`, { method: 'DELETE' });
}

export async function composeContent(
  memberId: string,
  input: ComposeRequest,
): Promise<ContentVariant[]> {
  return apiFetch<ContentVariant[]>(`/members/${memberId}/content/compose`, {
    method: 'POST',
    body: input,
  });
}

export async function runQualityCheck(memberId: string, contentId: string): Promise<QualityReport> {
  return apiFetch<QualityReport>(`/members/${memberId}/content/${contentId}/quality-check`, {
    method: 'POST',
  });
}

export async function submitForApproval(memberId: string, contentId: string): Promise<ContentItem> {
  return apiFetch<ContentItem>(`/members/${memberId}/content/${contentId}/submit-for-approval`, {
    method: 'POST',
  });
}

export async function scheduleContent(
  memberId: string,
  contentId: string,
  scheduledAt: string,
): Promise<ContentItem> {
  return apiFetch<ContentItem>(`/members/${memberId}/content/${contentId}/schedule`, {
    method: 'POST',
    body: { scheduled_at: scheduledAt },
  });
}

export async function fetchContentCalendar(
  memberId: string,
  from?: string,
  to?: string,
): Promise<CalendarEntry[]> {
  return apiFetch<CalendarEntry[]>(`/members/${memberId}/content/calendar`, {
    query: { from, to },
  });
}
