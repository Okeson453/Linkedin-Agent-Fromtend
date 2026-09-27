/**
 * Network (CRM) API — contacts, companies, interactions.
 */

import { apiFetch } from './client';
import type {
  Contact,
  ContactUpdate,
  Interaction,
  InteractionCreate,
  RelationshipStage,
} from '@lcc/api-types';

export async function listContacts(
  memberId: string,
  filter?: { stage?: RelationshipStage; expand?: 'company' },
): Promise<Contact[]> {
  return apiFetch<Contact[]>(`/members/${memberId}/contacts`, { query: filter });
}

export async function getContact(memberId: string, contactId: string): Promise<Contact> {
  return apiFetch<Contact>(`/members/${memberId}/contacts/${contactId}`);
}

export async function updateContact(
  memberId: string,
  contactId: string,
  update: ContactUpdate,
): Promise<Contact> {
  return apiFetch<Contact>(`/members/${memberId}/contacts/${contactId}`, {
    method: 'PATCH',
    body: update,
  });
}

export async function getStaleContacts(memberId: string): Promise<Contact[]> {
  return apiFetch<Contact[]>(`/members/${memberId}/contacts/stale`);
}

export async function listContactInteractions(
  memberId: string,
  contactId: string,
): Promise<Interaction[]> {
  return apiFetch<Interaction[]>(`/members/${memberId}/contacts/${contactId}/interactions`);
}

export async function logInteraction(
  memberId: string,
  contactId: string,
  input: InteractionCreate,
): Promise<Interaction> {
  return apiFetch<Interaction>(`/members/${memberId}/contacts/${contactId}/interactions`, {
    method: 'POST',
    body: input,
  });
}
