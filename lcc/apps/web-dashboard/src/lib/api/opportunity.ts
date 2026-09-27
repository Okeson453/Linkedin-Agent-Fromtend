/**
 * Opportunity API — pipeline, discover, draft, apply, propose.
 */

import { apiFetch } from './client';
import type {
  ApplicationDraft,
  JobRef,
  Opportunity,
  OpportunityDetail,
  ProposalDraft,
} from '@lcc/api-types';

export async function listOpportunities(memberId: string): Promise<Opportunity[]> {
  return apiFetch<Opportunity[]>(`/members/${memberId}/opportunities`);
}

export async function discoverOpportunities(memberId: string): Promise<JobRef> {
  return apiFetch<JobRef>(`/members/${memberId}/opportunities/discover`, { method: 'POST' });
}

export async function getOpportunity(
  memberId: string,
  opportunityId: string,
): Promise<OpportunityDetail> {
  return apiFetch<OpportunityDetail>(`/members/${memberId}/opportunities/${opportunityId}`);
}

export async function draftApplication(
  memberId: string,
  opportunityId: string,
): Promise<ApplicationDraft> {
  return apiFetch<ApplicationDraft>(
    `/members/${memberId}/opportunities/${opportunityId}/draft-application`,
    { method: 'POST' },
  );
}

export async function draftProposal(
  memberId: string,
  opportunityId: string,
): Promise<ProposalDraft> {
  return apiFetch<ProposalDraft>(
    `/members/${memberId}/opportunities/${opportunityId}/draft-proposal`,
    { method: 'POST' },
  );
}
