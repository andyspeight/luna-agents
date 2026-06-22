// Luna Agents - server-side Supabase client.
//
// Security (travelgenix-security, non-negotiable rule 1): the service role key is
// server-side only. It bypasses RLS, so it must never reach the browser. This module
// throws if it is ever imported into client code, and reads the key from env only.
// The opportunity table is RLS fail-closed; all access until the review screen lands
// goes through this service-role client from server code (routes, scripts, cron).

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient {
  // Hard guard: never instantiate a service-role client in the browser.
  if (typeof window !== 'undefined') {
    throw new Error('getServiceClient() is server-only and must never run in the browser');
  }

  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-side only). See .env.example.',
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

// Whether persistence is configured, so callers can degrade gracefully (e.g. a
// script that prints the ranked list even when no database is wired yet).
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
