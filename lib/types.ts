// Core domain types for Luna Agents - Phase 0 "found money" agent.
// Stage 1 scope: ingest + score only. No drafting, no sending, no browser agent.
// Fields beyond Stage 1 (draft_*, send_*, outcome_*) exist here for schema parity
// with the Supabase table so later stages do not need a migration reshuffle.

export type OpportunitySource = 'csv' | 'sheet' | 'portal';

export type OpportunityType = 'cold_quote' | 'unconverted_enquiry' | 'rebook_due';

export type Warmth = 'hot' | 'warm' | 'cool';

export type DraftStatus = 'none' | 'drafted' | 'approved' | 'rejected';
export type SendStatus = 'none' | 'queued' | 'sent' | 'suppressed';
export type Outcome = 'none' | 'opened' | 'replied' | 'booked';

export interface RawRow {
  [column: string]: string;
}

export interface Opportunity {
  // identity / provenance
  id: string;
  client_id: string;
  source: OpportunitySource;
  imported_at: string; // ISO 8601

  // customer
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  consent_ok: boolean; // from the client's lawful-contact attestation; false until attested

  // opportunity
  opportunity_type: OpportunityType;
  destination: string | null;
  travel_dates: string | null; // as given by the source (free text or ISO range)
  season: string | null;
  party_size: number | null;

  quote_value: number | null;
  currency: string; // ISO 4217-ish, defaulted per client mapping

  last_activity_at: string | null; // ISO 8601
  source_status: string | null; // the original pipeline status text

  // scoring (filled by the scoring module)
  score: number; // 0..100
  reason_codes: string[]; // plain-English; [0] is the headline flag
  warmth: Warmth;

  // downstream (Stage 2+), present for schema parity, null/none at Stage 1
  draft_message: string | null;
  draft_status: DraftStatus;
  send_status: SendStatus;
  sent_at: string | null;
  outcome: Outcome;
  outcome_value: number | null;
  outcome_at: string | null;

  // audit
  notes: string | null; // sanitised free text - treated as DATA, never instructions
  raw: RawRow; // the original row, so we can always answer "where did this come from?"
  warnings: string[]; // validation / sanitisation flags for the audit log
}
