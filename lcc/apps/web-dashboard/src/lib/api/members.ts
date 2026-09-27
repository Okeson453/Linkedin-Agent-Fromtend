/**
 * Members API — current member, settings, account lifecycle.
 */

import { apiFetch } from './client';
import type { Member, MemberSettings, MemberSettingsUpdate, MemberUpdate } from '@lcc/api-types';

export async function fetchCurrentMember(): Promise<Member> {
  return apiFetch<Member>('/members/me');
}

export async function updateCurrentMember(input: MemberUpdate): Promise<Member> {
  return apiFetch<Member>('/members/me', { method: 'PATCH', body: input });
}

export async function fetchMemberSettings(): Promise<MemberSettings> {
  return apiFetch<MemberSettings>('/members/me/settings');
}

export async function updateMemberSettings(input: MemberSettingsUpdate): Promise<MemberSettings> {
  return apiFetch<MemberSettings>('/members/me/settings', { method: 'PATCH', body: input });
}

export async function deleteMember(): Promise<void> {
  await apiFetch<void>('/members/me', { method: 'DELETE' });
}

export async function requestDataExport(memberId: string): Promise<{ job_id: string; status: string }> {
  return apiFetch(`/members/${memberId}/export`, { method: 'GET' });
}
