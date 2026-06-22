import type { RawRow } from './types';

// A small, dependency-free CSV parser. Agency exports are messy, so this handles
// quoted fields, escaped quotes (""), commas and newlines inside quotes, and CRLF.
// Keeping it dependency-free means the ingest engine has zero runtime deps and
// runs anywhere (cron worker, edge function, a plain node script).

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;
  let i = 0;

  // strip a UTF-8 BOM if present
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  while (i < text.length) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    }

    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += c; i++;
  }

  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }

  // drop fully blank lines
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ''));
}

export function parseCsvToObjects(text: string): RawRow[] {
  const rows = parseCsv(text);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj: RawRow = {};
    headers.forEach((h, idx) => { obj[h] = (r[idx] ?? '').trim(); });
    return obj;
  });
}
