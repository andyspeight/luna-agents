import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ingestCsv } from '../lib/index';
import type { MappingConfig } from '../lib/mapping';
import { DEFAULT_WEIGHTS } from '../config/scoring-weights';

// Stage 1 proof runner: a sample export goes in, a ranked list with reason codes
// comes out. No drafting, no sending, no browser agent. Deterministic.
//
//   npm run stage1            # uses the "pts" pilot sample
//   npm run stage1 -- acme    # uses config/clients/acme.mapping.json + samples/acme-pipeline.sample.csv

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const clientId = process.argv[2] || 'pts';
// Fixed "now" so day-counts are stable whenever this demo is run.
const NOW = new Date('2026-06-22T09:00:00Z');

const mapping = JSON.parse(
  readFileSync(join(root, `config/clients/${clientId}.mapping.json`), 'utf8'),
) as MappingConfig;
const csv = readFileSync(join(root, `samples/${clientId}-pipeline.sample.csv`), 'utf8');

const { opportunities, summary } = ingestCsv(csv, mapping, DEFAULT_WEIGHTS, NOW);

console.log(`\nLuna Agents - Stage 1 (Find) - client "${clientId}" - as at ${NOW.toISOString().slice(0, 10)}\n`);
console.log(
  `Rows in: ${summary.rows_in}  |  Ingested: ${summary.ingested}  |  ` +
    `Unreachable: ${summary.unreachable}  |  Flagged: ${summary.flagged}  |  Injection flags: ${summary.injection_flags}\n`,
);

console.table(
  opportunities.map((o, i) => ({
    '#': i + 1,
    score: o.score,
    warmth: o.warmth,
    customer: o.customer_name ?? '(no name)',
    destination: o.destination ?? '-',
    value: o.quote_value != null ? `${o.currency} ${o.quote_value}` : '-',
    type: o.opportunity_type,
    headline: o.reason_codes[0],
  })),
);

const flagged = opportunities.filter((o) => o.warnings.length);
if (flagged.length) {
  console.log('\nAudit flags (for the human / audit log):');
  for (const o of flagged) {
    console.log(`  - ${o.customer_name ?? '(no name)'} [${o.id}]: ${o.warnings.join(', ')}`);
  }
}

const out = join(root, `samples/${clientId}-opportunities.out.json`);
writeFileSync(out, JSON.stringify({ summary, opportunities }, null, 2));
console.log(`\nWrote ${opportunities.length} scored opportunities to ${out}\n`);
