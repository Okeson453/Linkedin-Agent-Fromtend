/**
 * Outreach API — sequences, steps, templates.
 */

import { apiFetch } from './client';
import type { Sequence, SequenceCreate, SequenceDetail, SequenceStep, SequenceTemplate, StepApprovalRequest } from '@lcc/api-types';

export async function listSequences(memberId: string): Promise<Sequence[]> {
  return apiFetch<Sequence[]>(`/members/${memberId}/sequences`);
}

export async function createSequence(memberId: string, input: SequenceCreate): Promise<Sequence> {
  return apiFetch<Sequence>(`/members/${memberId}/sequences`, { method: 'POST', body: input });
}

export async function getSequence(memberId: string, sequenceId: string): Promise<SequenceDetail> {
  return apiFetch<SequenceDetail>(`/members/${memberId}/sequences/${sequenceId}`);
}

export async function approveStep(
  memberId: string,
  sequenceId: string,
  stepId: string,
  request: StepApprovalRequest,
): Promise<SequenceStep> {
  return apiFetch<SequenceStep>(
    `/members/${memberId}/sequences/${sequenceId}/steps/${stepId}/approve`,
    { method: 'POST', body: request },
  );
}

export async function pauseSequence(memberId: string, sequenceId: string): Promise<Sequence> {
  return apiFetch<Sequence>(`/members/${memberId}/sequences/${sequenceId}/pause`, {
    method: 'POST',
  });
}

export async function listSequenceTemplates(memberId: string): Promise<SequenceTemplate[]> {
  return apiFetch<SequenceTemplate[]>(`/members/${memberId}/sequences/templates`);
}
