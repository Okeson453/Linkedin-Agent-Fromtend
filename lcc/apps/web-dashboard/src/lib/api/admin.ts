/**
 * Admin API — compliance config versions, restrictions.
 *
 * RBAC-gated. The frontend treats 403 as "insufficient permissions" — the
 * UI should redirect to /403 or hide the calling surface.
 */

import { apiFetch } from './client';
import type {
  ComplianceConfigCreate,
  ComplianceConfigVersion,
  RestrictionState,
} from '@lcc/api-types';

export async function listComplianceConfigVersions(): Promise<ComplianceConfigVersion[]> {
  return apiFetch<ComplianceConfigVersion[]>('/admin/compliance/config-versions');
}

export async function proposeComplianceConfig(
  input: ComplianceConfigCreate,
): Promise<ComplianceConfigVersion> {
  return apiFetch<ComplianceConfigVersion>('/admin/compliance/config-versions', {
    method: 'POST',
    body: input,
  });
}

export async function activateComplianceConfig(versionId: string): Promise<ComplianceConfigVersion> {
  return apiFetch<ComplianceConfigVersion>(
    `/admin/compliance/config-versions/${versionId}/activate`,
    { method: 'POST' },
  );
}

export async function getRestrictionState(memberId: string): Promise<RestrictionState> {
  return apiFetch<RestrictionState>(`/admin/compliance/restrictions/${memberId}`);
}

export async function clearRestriction(memberId: string): Promise<RestrictionState> {
  return apiFetch<RestrictionState>(`/admin/compliance/restrictions/${memberId}/clear`, {
    method: 'POST',
  });
}
