export * from './types';
export * from './csv';
export * from './sanitise';
export * from './mapping';
export * from './scoring';
export * from './ingest';
export * from './digest';
export * from './supabase';
export * from './persist';

import { parseCsvToObjects } from './csv';
import { ingestRows, type IngestResult } from './ingest';
import type { MappingConfig } from './mapping';
import type { ScoringWeights } from './scoring';

// Convenience: CSV text in, ranked + scored opportunities out.
export function ingestCsv(
  csvText: string,
  mapping: MappingConfig,
  weights: ScoringWeights,
  now?: Date,
): IngestResult {
  return ingestRows(parseCsvToObjects(csvText), mapping, weights, now);
}
