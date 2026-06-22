// Luna Agents - Stage 2 (Draft) - the emailed review digest.
//
// Takes the ranked opportunities and renders ONE review email to the agency owner:
// the ranked list, each with its reason code, value and a draft slot, plus an
// approve / edit / reject action per item. Nothing sends from here. The human
// reviews this digest and approves every send. Rejected items are suppressed.
//
// Design: Archetype D (Transactional), dials variance 2 / motion 1 / density 5.
// 600px, table-based, inline styles, navy/teal tokens, bulletproof CTA for Outlook.
// Per travelgenix-email-design + travelgenix-design + travelgenix-humanizer.
//
// Anti-fabrication contract (mirrors Stage 1): every value rendered comes from the
// opportunity record. Missing fields show a plain gap label, never an invented one.
// Every dynamic string is HTML-escaped before it touches the markup.

import type { Opportunity, Warmth } from './types';

// ── Brand tokens (email palette: navy, teal, neutrals only) ──────────────────
const C = {
  primary: '#1B2B5B',
  accent: '#00B4D8',
  accentDark: '#0096B7',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  bg: '#FFFFFF',
  bgSecondary: '#F8FAFC',
  bgTertiary: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
} as const;

const FONT =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";

export type ReviewAction = 'approve' | 'edit' | 'reject';

export interface DigestOptions {
  clientName?: string; // agency display name, e.g. "Premier Travel Stevenage"
  ownerName?: string | null; // greeting name, omitted if absent
  now?: Date;
  reviewBaseUrl?: string; // base for the action links
  // Override how a per-item action link is built (Stage 3 wires signed, single-use
  // tokens). Default produces a clearly-marked placeholder token.
  linkFor?: (op: Opportunity, action: ReviewAction) => string;
  maxItems?: number; // cap the list; default shows all
}

export interface Digest {
  subject: string;
  preheader: string;
  html: string;
  counts: { total: number; hot: number; warm: number; cool: number; drafted: number };
  totalsByCurrency: Record<string, number>;
}

// ── small helpers ────────────────────────────────────────────────────────────

function esc(s: string | null | undefined): string {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SYMBOLS: Record<string, string> = { GBP: '£', EUR: '€', USD: '$' };

function money(value: number | null, currency: string): string {
  if (value == null) return '';
  const n = value.toLocaleString('en-GB', { maximumFractionDigits: 0 });
  const sym = SYMBOLS[currency];
  return sym ? `${sym}${n}` : `${currency} ${n}`;
}

// "£28,650 in GBP and €5,200 in EUR" — honest about mixed currencies, no summing across.
function totalsLabel(totals: Record<string, number>): string {
  const parts = Object.entries(totals)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([cur, v]) => money(v, cur));
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

// Strip the leading "hot: "/"warm: "/"cool: " from the headline reason code, since
// the warmth is already shown as a badge.
function whyLine(op: Opportunity): string {
  const headline = op.reason_codes[0] || '';
  return headline.replace(/^(hot|warm|cool):\s*/i, '');
}

const WARMTH_STYLE: Record<Warmth, { fg: string; bg: string; dot: string }> = {
  hot: { fg: C.accentDark, bg: C.bgTertiary, dot: C.accent },
  warm: { fg: C.primary, bg: C.bgTertiary, dot: C.primary },
  cool: { fg: C.textSecondary, bg: C.bgSecondary, dot: C.textTertiary },
};

function warmthBadge(warmth: Warmth): string {
  const s = WARMTH_STYLE[warmth];
  // Unicode dot (reliable across clients) plus the text label, never colour alone.
  return (
    `<span style="display:inline-block;padding:4px 10px;border-radius:999px;` +
    `background:${s.bg};color:${s.fg};font-size:10px;font-weight:600;` +
    `letter-spacing:0.08em;text-transform:uppercase;font-family:${FONT};">` +
    `<span style="color:${s.dot};">&#9679;</span>&nbsp;${esc(warmth)}</span>`
  );
}

function rankTile(n: number): string {
  return (
    `<span style="display:inline-block;width:26px;height:26px;line-height:26px;` +
    `text-align:center;background:${C.bgTertiary};color:${C.primary};` +
    `border-radius:50%;font-size:12px;font-weight:700;font-family:${FONT};` +
    `font-variant-numeric:tabular-nums;">${n}</span>`
  );
}

// Bulletproof primary CTA (VML for Outlook desktop, styled <a> elsewhere).
function primaryButton(label: string, href: string): string {
  const safeHref = esc(href);
  return (
    `<table border="0" cellspacing="0" cellpadding="0" role="presentation"><tr>` +
    `<td align="center" bgcolor="${C.accent}" style="border-radius:10px;">` +
    `<!--[if mso]>` +
    `<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" ` +
    `href="${safeHref}" style="height:42px;v-text-anchor:middle;width:120px;" arcsize="24%" stroke="f" fillcolor="${C.accent}">` +
    `<w:anchorlock/><center style="color:${C.textPrimary};font-family:'Segoe UI',Arial,sans-serif;font-size:14px;font-weight:bold;">${esc(label)}</center>` +
    `</v:roundrect>` +
    `<![endif]-->` +
    `<!--[if !mso]><!-- -->` +
    `<a href="${safeHref}" style="display:inline-block;padding:11px 24px;background:${C.accent};` +
    `color:${C.textPrimary};text-decoration:none;border-radius:10px;font-family:${FONT};` +
    `font-size:14px;font-weight:700;letter-spacing:-0.005em;">${esc(label)}</a>` +
    `<!--<![endif]-->` +
    `</td></tr></table>`
  );
}

function ghostLink(label: string, href: string): string {
  return (
    `<a href="${esc(href)}" style="display:inline-block;padding:11px 18px;` +
    `color:${C.textSecondary};text-decoration:none;font-family:${FONT};` +
    `font-size:14px;font-weight:600;border:1px solid ${C.border};border-radius:10px;">` +
    `${esc(label)}</a>`
  );
}

function detailRow(label: string, valueHtml: string): string {
  return (
    `<tr>` +
    `<td style="padding:10px 0;border-bottom:1px solid ${C.borderLight};font-family:${FONT};` +
    `font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;` +
    `color:${C.textTertiary};vertical-align:top;width:120px;">${esc(label)}</td>` +
    `<td style="padding:10px 0;border-bottom:1px solid ${C.borderLight};font-family:${FONT};` +
    `font-size:14px;font-weight:500;color:${C.textPrimary};line-height:1.5;">${valueHtml}</td>` +
    `</tr>`
  );
}

function muted(text: string): string {
  return `<span style="color:${C.textTertiary};font-style:normal;">${esc(text)}</span>`;
}

// ── the per-opportunity card ─────────────────────────────────────────────────

function card(op: Opportunity, index: number, linkFor: NonNullable<DigestOptions['linkFor']>): string {
  const name = op.customer_name || 'Customer (name not provided)';
  const valueHtml = op.quote_value != null
    ? `<strong style="font-weight:700;font-variant-numeric:tabular-nums;">${esc(money(op.quote_value, op.currency))}</strong>`
    : muted('no quote value on file');

  const dest = op.destination ? esc(op.destination) : muted('destination not provided');
  const dates = op.travel_dates ? esc(op.travel_dates) : '';
  const destValue = dates ? `${dest} <span style="color:${C.textTertiary};">&middot; ${dates}</span>` : dest;

  const typeLabel = op.opportunity_type.replace(/_/g, ' ');

  // Draft slot. Stage 2 drafting (the composer re-engagement archetype) fills
  // draft_message. Until then this shows an honest "pending" note, never invented copy.
  const draftBlock =
    op.draft_message && op.draft_status !== 'none'
      ? `<div style="margin-top:16px;padding:16px;background:${C.bgSecondary};border-radius:10px;` +
        `font-family:${FONT};font-size:14px;line-height:1.6;color:${C.textPrimary};white-space:pre-wrap;">${esc(op.draft_message)}</div>`
      : `<div style="margin-top:16px;padding:12px 16px;background:${C.bgSecondary};border-radius:10px;` +
        `font-family:${FONT};font-size:13px;line-height:1.5;color:${C.textTertiary};">Draft pending. The composer writes a personalised nudge for this opportunity in the next step.</div>`;

  const approveHref = linkFor(op, 'approve');
  const editHref = linkFor(op, 'edit');
  const rejectHref = linkFor(op, 'reject');

  return (
    `<tr><td style="padding:0 24px 16px;">` +
    `<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" ` +
    `style="background:${C.bg};border:1px solid ${C.border};border-radius:12px;">` +
    `<tr><td style="padding:20px 24px;">` +

    // header: rank + name (left), warmth (right)
    `<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr>` +
    `<td style="vertical-align:middle;">` +
    `${rankTile(index + 1)}` +
    `<span style="font-family:${FONT};font-size:18px;font-weight:700;color:${C.textPrimary};` +
    `letter-spacing:-0.01em;padding-left:10px;">${esc(name)}</span>` +
    `</td>` +
    `<td align="right" style="vertical-align:middle;">${warmthBadge(op.warmth)}</td>` +
    `</tr></table>` +

    // subtitle: destination + type
    `<div style="font-family:${FONT};font-size:13px;color:${C.textSecondary};margin-top:6px;">` +
    `${destValue} <span style="color:${C.textTertiary};">&middot; ${esc(typeLabel)}</span></div>` +

    // details
    `<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin-top:14px;">` +
    detailRow('Quote value', valueHtml) +
    detailRow('Why it surfaced', esc(whyLine(op)) || muted('no reason recorded')) +
    `</table>` +

    draftBlock +

    // actions: one primary (approve), two subordinate (edit, reject)
    `<table border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin-top:16px;"><tr>` +
    `<td style="padding-right:8px;">${primaryButton('Approve', approveHref)}</td>` +
    `<td style="padding-right:8px;">${ghostLink('Edit', editHref)}</td>` +
    `<td>${ghostLink('Reject', rejectHref)}</td>` +
    `</tr></table>` +

    `</td></tr></table>` +
    `</td></tr>`
  );
}

// ── the digest ───────────────────────────────────────────────────────────────

export function buildDigest(opportunities: Opportunity[], options: DigestOptions = {}): Digest {
  const now = options.now ?? new Date();
  const clientName = options.clientName ?? 'your agency';
  const base = (options.reviewBaseUrl ?? 'http://localhost:3000').replace(/\/$/, '');
  const linkFor =
    options.linkFor ??
    ((op: Opportunity, action: ReviewAction) =>
      `${base}/api/review?op=${encodeURIComponent(op.id)}&action=${action}&t=PLACEHOLDER_TOKEN`);

  const list = options.maxItems ? opportunities.slice(0, options.maxItems) : opportunities;

  const counts = {
    total: list.length,
    hot: list.filter((o) => o.warmth === 'hot').length,
    warm: list.filter((o) => o.warmth === 'warm').length,
    cool: list.filter((o) => o.warmth === 'cool').length,
    drafted: list.filter((o) => o.draft_status !== 'none' && o.draft_message).length,
  };

  const totalsByCurrency: Record<string, number> = {};
  for (const o of list) {
    if (o.quote_value != null) {
      totalsByCurrency[o.currency] = (totalsByCurrency[o.currency] ?? 0) + o.quote_value;
    }
  }
  const totals = totalsLabel(totalsByCurrency);

  const dateLabel = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const greeting = options.ownerName ? `Hi ${esc(options.ownerName)},` : 'Hi,';

  const subject = totals
    ? `${totals} of found-money to review`
    : `${counts.total} opportunities to review`;
  const preheader =
    `Your weekly found-money review for ${clientName}. Approve the ones you like, edit any, reject the rest. Nothing sends without you.`;

  const cards = list.map((op, i) => card(op, i, linkFor)).join('');

  const html =
    `<!doctype html><html lang="en"><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<meta name="color-scheme" content="light dark">` +
    `<meta name="supported-color-schemes" content="light dark">` +
    `<title>${esc(subject)}</title>` +
    `<!--[if mso]><style>* { font-family: 'Segoe UI', Arial, sans-serif !important; }</style><![endif]-->` +
    `</head>` +
    `<body style="margin:0;padding:0;background:${C.bgSecondary};">` +

    // preheader (hidden)
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>` +

    `<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="background:${C.bgSecondary};">` +
    `<tr><td align="center" style="padding:24px 12px;">` +

    `<table width="600" border="0" cellspacing="0" cellpadding="0" role="presentation" ` +
    `style="width:600px;max-width:600px;background:${C.bg};border-radius:12px;overflow:hidden;` +
    `box-shadow:0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06);">` +

    // top-bar
    `<tr><td style="padding:18px 24px;border-bottom:1px solid ${C.border};">` +
    `<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr>` +
    `<td style="vertical-align:middle;">` +
    `<span style="display:inline-block;width:26px;height:26px;line-height:26px;text-align:center;` +
    `background:${C.primary};color:#fff;border-radius:7px;font-family:${FONT};font-weight:700;font-size:14px;">L</span>` +
    `<span style="font-family:${FONT};font-size:15px;font-weight:700;color:${C.primary};padding-left:8px;">Luna Agents</span>` +
    `</td>` +
    `<td align="right" style="font-family:${FONT};font-size:12px;color:${C.textTertiary};vertical-align:middle;">` +
    `Found-money review &middot; ${esc(dateLabel)}</td>` +
    `</tr></table>` +
    `</td></tr>` +

    // intro / confirmation block
    `<tr><td style="padding:28px 24px 8px;">` +
    `<div style="font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.12em;` +
    `text-transform:uppercase;color:${C.accentDark};">Weekly review</div>` +
    `<div style="font-family:${FONT};font-size:24px;font-weight:700;color:${C.textPrimary};` +
    `letter-spacing:-0.02em;line-height:1.2;margin-top:8px;">` +
    `${counts.total} ${counts.total === 1 ? 'opportunity' : 'opportunities'} to review</div>` +
    `<p style="font-family:${FONT};font-size:15px;line-height:1.6;color:${C.textSecondary};margin:12px 0 0;">` +
    `${greeting} here is this week's found-money for ${esc(clientName)}. ` +
    (totals
      ? `These cold quotes and dormant customers are worth ${esc(totals)} between them. `
      : '') +
    `Each one is ranked, with a plain reason it surfaced. ` +
    `${counts.hot} hot, ${counts.warm} warm, ${counts.cool} cool. ` +
    `Approve the ones worth chasing, edit any, reject the rest.</p>` +
    `</td></tr>` +

    // the ranked list
    `<tr><td style="padding:16px 0 0;">` +
    `<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">${cards}</table>` +
    `</td></tr>` +

    // next steps
    `<tr><td style="padding:8px 24px 4px;border-top:1px solid ${C.border};">` +
    `<div style="font-family:${FONT};font-size:16px;font-weight:700;color:${C.textPrimary};margin:20px 0 12px;">How this works</div>` +
    `<p style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.textSecondary};margin:0 0 8px;">` +
    `1. We only ever draft. You decide what goes out.</p>` +
    `<p style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.textSecondary};margin:0 0 8px;">` +
    `2. Approve to queue a message from your own address. You confirm every send.</p>` +
    `<p style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.textSecondary};margin:0 0 8px;">` +
    `3. Edit to tweak the wording first, or reject to drop it. Rejected ones stay hidden next week.</p>` +
    `</td></tr>` +

    // help block
    `<tr><td style="padding:16px 24px 24px;">` +
    `<div style="padding:16px 20px;background:${C.bgSecondary};border-radius:10px;font-family:${FONT};` +
    `font-size:14px;line-height:1.5;color:${C.textSecondary};">Questions about any of these? Just reply to this email.</div>` +
    `</td></tr>` +

    `</table>` + // end card

    // footer-meta
    `<table width="600" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width:600px;max-width:600px;">` +
    `<tr><td style="padding:20px 24px;text-align:center;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.textTertiary};">` +
    `Luna Agents for ${esc(clientName)}. Generated ${esc(dateLabel)}.<br>` +
    `Nothing sends without your approval. You remain the data controller for these contacts.` +
    `</td></tr></table>` +

    `</td></tr></table>` +
    `</body></html>`;

  return { subject, preheader, html, counts, totalsByCurrency };
}
