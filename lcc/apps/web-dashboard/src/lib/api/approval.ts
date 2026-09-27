/**
 * Approvals API — list, detail, decide.
 *
 * NOTE: callers MUST NOT use these functions to bypass `@lcc/approval-gate`.
 * The approval hooks (queries/mutations below) are the only sanctioned path.
 */

import { apiFetch } from './client';
import type { Approval, ApprovalDecision } from '@lcc/api-types';

export async function listApprovals(
  memberId: string,
  filter?: { status?: 'pending' | 'decided' | 'expired'; tier?: 1 | 2 | 3 | 4 | 5 },
): Promise<Approval[]> {
  return apiFetch<Approval[]>(`/members/${memberId}/approvals`, { query: filter });
}

export async function getApproval(memberId: string, approvalId: string): Promise<Approval> {
  return apiFetch<Approval>(`/members/${memberId}/approvals/${approvalId}`);
}

export async function decideApproval(
  memberId: string,
  approvalId: string,
  decision: ApprovalDecision,
): Promise<{ approval: Approval; governance: { permit: boolean; failed_guard: string | null; reason: string | null } }> {
  return apiFetch(`/members/${memberId}/approvals/${approvalId}/decide`, {
    method: 'POST',
    body: decision,
  });
}
