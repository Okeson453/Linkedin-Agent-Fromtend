/**
 * KB API — records (CRUD).
 */

import { apiFetch } from './client';
import type { KbCategory, KbRecord, KbRecordCreate, KbRecordUpdate } from '@lcc/api-types';

export async function listKbRecords(memberId: string, category?: KbCategory): Promise<KbRecord[]> {
  return apiFetch<KbRecord[]>(`/members/${memberId}/kb/records`, { query: { category } });
}

export async function createKbRecord(memberId: string, input: KbRecordCreate): Promise<KbRecord> {
  return apiFetch<KbRecord>(`/members/${memberId}/kb/records`, { method: 'POST', body: input });
}

export async function updateKbRecord(
  memberId: string,
  recordId: string,
  input: KbRecordUpdate,
): Promise<KbRecord> {
  return apiFetch<KbRecord>(`/members/${memberId}/kb/records/${recordId}`, {
    method: 'PATCH',
    body: input,
  });
}

export async function deleteKbRecord(memberId: string, recordId: string): Promise<void> {
  await apiFetch<void>(`/members/${memberId}/kb/records/${recordId}`, { method: 'DELETE' });
}
/** Fetch one knowledge-base record by id. */
export async function getKbRecord(memberId: string, recordId: string): Promise<KbRecord> {
  return apiFetch<KbRecord>(`/members/${memberId}/kb/records/${recordId}`);
}

