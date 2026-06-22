import { NextResponse } from 'next/server';
import { ingestCsv } from '../../../lib/index';
import { loadMapping } from '../../../lib/config-loader';
import { DEFAULT_WEIGHTS } from '../../../config/scoring-weights';

// Stage 1 ingest endpoint. Accepts a pilot's CSV export plus the client id, returns
// the ranked + scored opportunity list. No drafting, no sending. Server-side only.
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let clientId = '';
    let csv = '';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      clientId = String(body.client_id || '');
      csv = String(body.csv || '');
    } else if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      clientId = String(form.get('client_id') || '');
      const file = form.get('file');
      csv = file && typeof file !== 'string' ? await (file as File).text() : String(form.get('csv') || '');
    } else {
      return NextResponse.json({ error: 'send application/json or multipart/form-data' }, { status: 415 });
    }

    if (!clientId) return NextResponse.json({ error: 'client_id required' }, { status: 400 });
    if (!csv.trim()) return NextResponse.json({ error: 'csv required' }, { status: 400 });

    const mapping = loadMapping(clientId);
    const result = ingestCsv(csv, mapping, DEFAULT_WEIGHTS);

    // Stage 1 returns the ranked list. Persisting to the Supabase opportunity table
    // is the small next wire-up (service-role client, server-side only).
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'ingest failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
