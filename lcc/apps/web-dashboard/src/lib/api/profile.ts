/**
 * Profile API — snapshot, audit, edit drafts, strength history.
 */

import { apiFetch } from './client';
import type {
  EditDraft,
  JobRef,
  ProfileSnapshot,
  ProfileStrengthPoint,
} from '@lcc/api-types';

export async function fetchLatestSnapshot(memberId: string): Promise<ProfileSnapshot> {
  return apiFetch<ProfileSnapshot>(`/members/${memberId}/profile/snapshots/latest`);
}

export async function runProfileAudit(memberId: string): Promise<JobRef> {
  return apiFetch<JobRef>(`/members/${memberId}/profile/audit`, { method: 'POST' });
}

export async function generateEditDrafts(memberId: string): Promise<EditDraft[]> {
  return apiFetch<EditDraft[]>(`/members/${memberId}/profile/edit-drafts`, { method: 'POST' });
}

export async function fetchStrengthHistory(
  memberId: string,
  range: '7d' | '30d' | '90d' | '365d' = '90d',
): Promise<ProfileStrengthPoint[]> {
  return apiFetch<ProfileStrengthPoint[]>(`/members/${memberId}/profile/strength-history`, {
    query: { range },
  });
}

/** Client-facing profile view assembled from snapshot + components.
 * Backend snapshot stores component *scores*; textual fields default empty until the
 * profile pipeline contract lands (see audit §4.13). */
export interface ProfileExperienceItem { title?: string | null; company?: string | null; start_date?: string | null; end_date?: string | null; current?: boolean; description?: string | null; }
export interface ProfileView { id: string; member_id: string; display_name: string; headline: string; about: string; experience: ProfileExperienceItem[]; skills: string[]; strength: number; components: Record<string, number>; captured_at: string; }

export async function getProfile(memberId: string): Promise<ProfileView> {
  const snap = await fetchLatestSnapshot(memberId);
  const comps = snap.components ?? {};
  return { id: snap.id, member_id: snap.member_id, display_name: '', headline: '', about: '', experience: [], skills: [], strength: snap.strength ?? 0, components: comps, captured_at: snap.captured_at };
}
export async function getProfileAudit(memberId: string): Promise<JobRef> { return runProfileAudit(memberId); }
export async function getProfileEdits(memberId: string): Promise<EditDraft[]> { return generateEditDrafts(memberId); }
export async function getProfileHistory(memberId: string, range: '7d' | '30d' | '90d' | '365d' = '90d'): Promise<ProfileStrengthPoint[]> { return fetchStrengthHistory(memberId, range); }

