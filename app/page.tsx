import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ingestCsv } from '../lib/index';
import { loadMapping } from '../lib/config-loader';
import { DEFAULT_WEIGHTS } from '../config/scoring-weights';

// A live "table view" of the ranked sample - the Stage 1 output in the browser.
// Reads the sample at request time on the server (no DB needed to demo).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WARMTH_COLOUR: Record<string, string> = {
  hot: '#dc2626',
  warm: '#d97706',
  cool: '#64748b',
};

export default function Page() {
  const mapping = loadMapping('pts');
  const csv = readFileSync(join(process.cwd(), 'samples', 'pts-pipeline.sample.csv'), 'utf8');
  const { opportunities, summary } = ingestCsv(csv, mapping, DEFAULT_WEIGHTS, new Date('2026-06-22T09:00:00Z'));

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ marginBottom: 4 }}>Found money - this week&rsquo;s opportunities</h1>
      <p style={{ color: '#475569', marginTop: 0 }}>
        Luna Agents Phase 0 - Stage 1. Pilot &ldquo;{mapping.client_id}&rdquo;. {summary.ingested} opportunities,
        ranked. Nothing is sent - a human reviews and approves every nudge.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '10px 8px' }}>#</th>
            <th style={{ padding: '10px 8px' }}>Score</th>
            <th style={{ padding: '10px 8px' }}>Customer</th>
            <th style={{ padding: '10px 8px' }}>Destination</th>
            <th style={{ padding: '10px 8px' }}>Value</th>
            <th style={{ padding: '10px 8px' }}>Why it surfaced</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((o, i) => (
            <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '10px 8px', color: '#94a3b8' }}>{i + 1}</td>
              <td style={{ padding: '10px 8px' }}>
                <span style={{ fontWeight: 700 }}>{o.score}</span>{' '}
                <span style={{ color: WARMTH_COLOUR[o.warmth] || '#64748b', fontSize: 12, textTransform: 'uppercase' }}>
                  {o.warmth}
                </span>
              </td>
              <td style={{ padding: '10px 8px' }}>
                {o.customer_name || <em style={{ color: '#94a3b8' }}>(no name)</em>}
                {o.warnings.length > 0 && (
                  <span title={o.warnings.join(', ')} style={{ marginLeft: 6, color: '#b45309' }}>
                    &#9888;
                  </span>
                )}
              </td>
              <td style={{ padding: '10px 8px' }}>{o.destination || '-'}</td>
              <td style={{ padding: '10px 8px' }}>
                {o.quote_value != null ? `${o.currency} ${o.quote_value.toLocaleString('en-GB')}` : '-'}
              </td>
              <td style={{ padding: '10px 8px', color: '#334155' }}>{o.reason_codes[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 16 }}>
        Flagged for the audit log: {summary.flagged} row(s), of which {summary.injection_flags} carried possible
        prompt-injection text in a note (treated as data, never acted on). {summary.unreachable} row(s) have no
        contact method.
      </p>
    </main>
  );
}
