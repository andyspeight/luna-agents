// Input hardening. Per the handover security rules, every ingested field is
// hostile until proven otherwise, and all free text is DATA, never instructions.
//
// Stage 1 runs no LLM, so nothing here can be "executed" yet. We still sanitise
// now for two reasons: (1) the notes we store will be passed to the Luna composer
// at Stage 2 as grounded facts, so they must already be clean; (2) we flag
// injection-shaped text into the audit trail so a human can see it before it ever
// reaches a model.

const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /disregard\s+(the\s+)?(above|previous|earlier)/i,
  /system\s+prompt/i,
  /you\s+are\s+now\b/i,
  /\bact\s+as\b/i,
  /prompt\s*injection/i,
  /offer\s+.{0,12}\d{1,3}\s*%\s*off/i, // e.g. "offer 90% off" - commercially dangerous if obeyed
];

// Control characters to strip: U+0000-U+0008, U+000B, U+000C, U+000E-U+001F, U+007F.
// We deliberately keep tab (U+0009) and newline (U+000A). Written with \x escapes
// so no literal control bytes live in the source.
const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export interface CleanText {
  clean: string | null;
  flags: string[];
}

export function sanitiseText(value: string | null | undefined, maxLen = 2000): CleanText {
  const flags: string[] = [];
  if (value == null) return { clean: null, flags };

  let s = value.replace(CONTROL_CHARS, '').trim();
  if (s.length === 0) return { clean: null, flags };

  if (s.length > maxLen) { s = s.slice(0, maxLen); flags.push('truncated_overlong_text'); }

  for (const re of INJECTION_PATTERNS) {
    if (re.test(s)) { flags.push('possible_prompt_injection_in_source_text'); break; }
  }

  return { clean: s, flags };
}

export function sanitiseEmail(value: string | null | undefined): string | null {
  if (!value) return null;
  const s = value.trim().toLowerCase();
  // shape check only - never throw on bad client data, just null it and warn upstream
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s : null;
}

export function sanitisePhone(value: string | null | undefined): string | null {
  if (!value) return null;
  const s = value.replace(/[^\d+]/g, '');
  return s.length >= 7 ? s : null;
}
