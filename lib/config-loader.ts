import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MappingConfig } from './mapping';

// Loads a client's column-mapping config. Node-only (filesystem). The client id is
// sanitised to alphanumerics so it can never be used for path traversal.
export function loadMapping(clientId: string): MappingConfig {
  const safe = clientId.replace(/[^a-z0-9_-]/gi, '');
  if (!safe) throw new Error('invalid client_id');
  const path = join(process.cwd(), 'config', 'clients', `${safe}.mapping.json`);
  return JSON.parse(readFileSync(path, 'utf8')) as MappingConfig;
}
