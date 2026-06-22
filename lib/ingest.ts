import type { Opportunity, RawRow } from './types';
import type { MappingConfig } from './mapping';
import { coerceNumber, getCol, inferType, parseBoolish, parseDate } from './mapping';
import { sanitiseEmail, sanitisePhone, sanitiseText } from './sanitise';
import { scoreOpportunity, type ScoringWeights } from './scoring';

// djb2 - a tiny stable hash, used only to derive a deterministic id from a row's
// natural key so re-imports of the same pipeline overwrite rather than duplicate.
function hash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

export interface IngestSummary {
  rows_in: number;
  ingested: number;
  unreachable: number; // no email and no phone
  flagged: number; // any warning, incl. possible injection
  injection_flags: number;
}

export interface IngestResult {
  opportunities: Opportunity[];
  summary: IngestSummary;
}

export function ingestRows(
  rows: RawRow[],
  mapping: MappingConfig,
  weights: ScoringWeights,
  now: Date = new Date(),
): IngestResult {
  const importedAt = now.toISOString();
  const opportunities: Opportunity[] = [];
  let unreachable = 0;
  let flagged = 0;
  let injectionFlags = 0;

  for (const row of rows) {
    const warnings: string[] = [];

    const name = sanitiseText(getCol(row, mapping.columns.customer_name)).clean;
    const email = sanitiseEmail(getCol(row, mapping.columns.customer_email));
    const phone = sanitisePhone(getCol(row, mapping.columns.customer_phone));
    const destination = sanitiseText(getCol(row, mapping.columns.destination)).clean;
    const travelDates = sanitiseText(getCol(row, mapping.columns.travel_dates)).clean;
    const season = sanitiseText(getCol(row, mapping.columns.season)).clean;
    const sourceStatus = sanitiseText(getCol(row, mapping.columns.source_status)).clean;

    const notesResult = sanitiseText(getCol(row, mapping.columns.notes));
    if (notesResult.flags.length) warnings.push(...notesResult.flags);

    const quoteValue = coerceNumber(getCol(row, mapping.columns.quote_value));
    const budget = coerceNumber(getCol(row, mapping.columns.budget));
    const partySize = coerceNumber(getCol(row, mapping.columns.party_size));
    const currency = (getCol(row, mapping.columns.currency) || mapping.defaults.currency).toUpperCase();
    const lastActivityAt = parseDate(getCol(row, mapping.columns.last_activity_at));
    const returnDate = parseDate(getCol(row, mapping.columns.return_date));
    const isRepeat = parseBoolish(getCol(row, mapping.columns.is_repeat_customer));
    const opportunityType = inferType(row, mapping);

    if (!email && !phone) { warnings.push('no_contact_method'); unreachable++; }
    if (!lastActivityAt) warnings.push('missing_last_activity_date');
    if (opportunityType === 'cold_quote' && quoteValue == null) warnings.push('missing_quote_value');
    if (warnings.includes('possible_prompt_injection_in_source_text')) injectionFlags++;
    if (warnings.length) flagged++;

    const naturalKey = `${mapping.client_id}|${getCol(row, mapping.columns.customer_id) || email || phone || name || ''}|${destination || ''}|${lastActivityAt || ''}`;

    const op: Opportunity = {
      id: `${mapping.client_id}_${hash(naturalKey)}`,
      client_id: mapping.client_id,
      source: mapping.source,
      imported_at: importedAt,

      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      consent_ok: mapping.defaults.consent_ok,

      opportunity_type: opportunityType,
      destination,
      travel_dates: travelDates,
      season,
      party_size: partySize,

      quote_value: quoteValue,
      currency,

      last_activity_at: lastActivityAt,
      source_status: sourceStatus,

      score: 0,
      reason_codes: [],
      warmth: 'cool',

      draft_message: null,
      draft_status: 'none',
      send_status: 'none',
      sent_at: null,
      outcome: 'none',
      outcome_value: null,
      outcome_at: null,

      notes: notesResult.clean,
      raw: row,
      warnings,
    };

    const { score, reason_codes, warmth } = scoreOpportunity(
      op,
      { budget, isRepeat, returnDate },
      weights,
      now,
    );
    op.score = score;
    op.reason_codes = reason_codes;
    op.warmth = warmth;

    opportunities.push(op);
  }

  opportunities.sort((a, b) => b.score - a.score);

  return {
    opportunities,
    summary: {
      rows_in: rows.length,
      ingested: opportunities.length,
      unreachable,
      flagged,
      injection_flags: injectionFlags,
    },
  };
}
