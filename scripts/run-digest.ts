import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ingestCsv } from '../lib/index';
import { buildDigest } from '../lib/digest';
import { isSupabaseConfigured, persistOpportunities } from '../lib/index';
import type { MappingConfig } from '../lib/mapping';
import { DEFAULT_WEIGHTS } from '../config/scoring-weights';

// Stage 2 preview runner: a sample export goes in, the ranked review digest comes
// out as an HTML file you can open in a browser. If Supabase is configured (env),
// it also persists the ranked opportunities. Nothing sends. Deterministic.
//
//   npm run digest            # uses the "pts" pilot sample
//   npm run digest -- acme    # uses config/clients/acme.mapping.json + samples/acme-pipeline.sample.csv

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const clientId = process.argv[2] || 'pts';
const NOW = new Date('2026-06-22T09:00:00Z');

const mapping = JSON.parse(
  readFileSync(join(root, `config/clients/${clientId}.mapping.json`), 'utf8'),
) as MappingConfig;
const csv = readFileSync(join(root, `samples/${clientId}-pipeline.sample.csv`), 'utf8');

const { opportunities, summary } = ingestCsv(csv, mapping, DEFAULT_WEIGHTS, NOW);

const digest = buildDigest(opportunities, {
  // Synthetic sample: use the client id as the display name. The real pilot agency
  // name is an open question (confirm the pilots), and we never invent one.
  clientName: clientId.toUpperCase(),
  now: NOW,
  reviewBaseUrl: process.env.REVIEW_BASE_URL,
});

const out = join(root, `samples/${clientId}-digest.out.html`);
writeFileSync(out, digest.html);

console.log(`\nLuna Agents - Stage 2 (Draft) review digest - client "${clientId}" - as at ${NOW.toISOString().slice(0, 10)}\n`);
console.log(`Subject:   ${digest.subject}`);
console.log(`Preheader: ${digest.preheader}`);
console.log(
  `\nRanked: ${digest.counts.total}  |  hot ${digest.counts.hot}  warm ${digest.counts.warm}  cool ${digest.counts.cool}  |  drafted ${digest.counts.drafted}`,
);
console.log(`Rows in: ${summary.rows_in}  |  ingested: ${summary.ingested}  |  flagged: ${summary.flagged}`);
const totals = Object.entries(digest.totalsByCurrency)
  .map(([cur, v]) => `${cur} ${v.toLocaleString('en-GB')}`)
  .join(', ');
if (totals) console.log(`Value in batch: ${totals}`);

async function maybePersist() {
  if (!isSupabaseConfigured()) {
    console.log('\nSupabase not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). Skipped persist.');
    return;
  }
  try {
    const { upserted } = await persistOpportunities(opportunities);
    console.log(`\nPersisted ${upserted} opportunities to Supabase.`);
  } catch (err) {
    console.log(`\nPersist failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

await maybePersist();
console.log(`\nWrote review digest to ${out}\nOpen it in a browser to preview.\n`);
