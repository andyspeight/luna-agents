import type { OpportunitySource, OpportunityType, RawRow } from './types';

// Every agency's export looks different, so column mapping is config-driven, one
// small JSON file per client. The engine never assumes a fixed header layout.

export interface MappingConfig {
  client_id: string;
  source: OpportunitySource;
  // Opportunity field -> the source column header that carries it (case-insensitive).
  columns: {
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    destination?: string;
    travel_dates?: string;
    season?: string;
    party_size?: string;
    quote_value?: string;
    currency?: string;
    last_activity_at?: string;
    source_status?: string;
    opportunity_type?: string;
    notes?: string;
    budget?: string; // optional: customer's stated budget, powers the in-budget signal
    is_repeat_customer?: string; // optional: a flag/marker column
    return_date?: string; // optional: past trip return date, powers the rebook window
    customer_id?: string; // optional: stable id for dedupe
  };
  defaults: {
    currency: string;
    consent_ok: boolean; // false unless the client has attested lawful contact
  };
  // optional: substring match of raw status text -> opportunity type
  status_to_type?: { [rawStatusSubstring: string]: OpportunityType };
}

export function getCol(row: RawRow, header: string | undefined): string | null {
  if (!header) return null;
  if (row[header] !== undefined) return row[header];
  const lower = header.toLowerCase();
  for (const k of Object.keys(row)) {
    if (k.toLowerCase() === lower) return row[k];
  }
  return null;
}

export function coerceNumber(value: string | null | undefined): number | null {
  if (value == null) return null;
  const s = String(value).replace(/[^0-9.\-]/g, '');
  if (s === '' || s === '-' || s === '.') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

// Tolerant date parsing for UK-style agency exports. Returns an ISO date (yyyy-mm-dd)
// or null. Handles ISO, dd/mm/yyyy (and . or - separators), and month-name forms.
export function parseDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const s = value.trim();
  if (!s) return null;

  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;

  m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})$/);
  if (m) {
    let [, d, mo, y] = m;
    if (y.length === 2) y = (Number(y) > 50 ? '19' : '20') + y;
    return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  const parsed = new Date(s);
  if (!Number.isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const mm = String(parsed.getMonth() + 1).padStart(2, '0');
    const dd = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  }

  return null;
}

export function parseBoolish(value: string | null | undefined): boolean {
  if (!value) return false;
  return /^(y|yes|true|1|repeat|returning|vip|loyal)$/i.test(value.trim());
}

export function inferType(row: RawRow, mapping: MappingConfig): OpportunityType {
  const statusRaw = (getCol(row, mapping.columns.source_status) || '').toLowerCase();
  if (mapping.status_to_type) {
    for (const key of Object.keys(mapping.status_to_type)) {
      if (statusRaw.includes(key.toLowerCase())) return mapping.status_to_type[key];
    }
  }
  const value = coerceNumber(getCol(row, mapping.columns.quote_value));
  if (value != null && value > 0) return 'cold_quote';
  if (getCol(row, mapping.columns.return_date)) return 'rebook_due';
  return 'unconverted_enquiry';
}
