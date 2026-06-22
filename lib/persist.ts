// Luna Agents - persist scored opportunities to Supabase.
//
// Maps the Opportunity domain type onto the `opportunity` table (see
// supabase/migrations/0001_opportunity.sql) and upserts on the deterministic id, so
// re-importing the same pipeline updates rows rather than duplicating them. Stage 1
// fills identity + customer + scoring columns; draft_* / send_* / outcome_* are
// carried through unchanged so Stage 2/3 can fill them without a reshuffle.
//
// Server-side only (uses the service-role client). Never call from the browser.

import type { Opportunity } from './types';
import { getServiceClient } from './supabase';

// The exact column set the table owns. created_at / updated_at are database-managed
// (defaults + trigger), so we never send them.
function toRow(op: Opportunity): Record<string, unknown> {
  return {
    id: op.id,
    client_id: op.client_id,
    source: op.source,
    imported_at: op.imported_at,

    customer_name: op.customer_name,
    customer_email: op.customer_email,
    customer_phone: op.customer_phone,
    consent_ok: op.consent_ok,

    opportunity_type: op.opportunity_type,
    destination: op.destination,
    travel_dates: op.travel_dates,
    season: op.season,
    party_size: op.party_size,
    quote_value: op.quote_value,
    currency: op.currency,
    last_activity_at: op.last_activity_at,
    source_status: op.source_status,

    score: op.score,
    reason_codes: op.reason_codes,
    warmth: op.warmth,

    draft_message: op.draft_message,
    draft_status: op.draft_status,
    send_status: op.send_status,
    sent_at: op.sent_at,
    outcome: op.outcome,
    outcome_value: op.outcome_value,
    outcome_at: op.outcome_at,

    notes: op.notes,
    raw: op.raw,
    warnings: op.warnings,
  };
}

export interface PersistResult {
  upserted: number;
}

// Upsert a batch of opportunities. Idempotent on id.
export async function persistOpportunities(opportunities: Opportunity[]): Promise<PersistResult> {
  if (opportunities.length === 0) return { upserted: 0 };

  const supabase = getServiceClient();
  const rows = opportunities.map(toRow);

  const { error } = await supabase.from('opportunity').upsert(rows, { onConflict: 'id' });
  if (error) {
    throw new Error(`persistOpportunities failed: ${error.message}`);
  }
  return { upserted: rows.length };
}

// Persist a single draft result for an opportunity (Stage 2 drafting writes here).
export async function saveDraft(
  id: string,
  draftMessage: string,
): Promise<void> {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from('opportunity')
    .update({ draft_message: draftMessage, draft_status: 'drafted' })
    .eq('id', id);
  if (error) throw new Error(`saveDraft failed: ${error.message}`);
}
