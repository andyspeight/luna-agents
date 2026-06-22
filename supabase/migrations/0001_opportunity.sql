-- Luna Agents - Phase 0 - opportunity store.
-- One row per cold opportunity, per-client scoped. Mirrors lib/types.ts Opportunity.
-- Stage 1 fills identity + customer + opportunity + scoring columns. The draft_*,
-- send_* and outcome_* columns exist now (filled in Stage 2/3) so no reshuffle later.

create table if not exists public.opportunity (
  -- identity / provenance
  id              text primary key,                 -- deterministic: <client_id>_<hash(natural key)>
  client_id       text not null,
  source          text not null default 'csv'
                    check (source in ('csv','sheet','portal')),
  imported_at     timestamptz not null default now(),

  -- customer
  customer_name   text,
  customer_email  text,
  customer_phone  text,
  consent_ok      boolean not null default false,   -- client's lawful-contact attestation

  -- opportunity
  opportunity_type text not null default 'unconverted_enquiry'
                    check (opportunity_type in ('cold_quote','unconverted_enquiry','rebook_due')),
  destination     text,
  travel_dates    text,
  season          text,
  party_size      integer,
  quote_value     numeric(12,2),
  currency        text not null default 'GBP',
  last_activity_at date,
  source_status   text,

  -- scoring
  score           integer not null default 0 check (score between 0 and 100),
  reason_codes    text[] not null default '{}',
  warmth          text not null default 'cool'
                    check (warmth in ('hot','warm','cool')),

  -- drafting / sending (Stage 2+)
  draft_message   text,
  draft_status    text not null default 'none'
                    check (draft_status in ('none','drafted','approved','rejected')),
  send_status     text not null default 'none'
                    check (send_status in ('none','queued','sent','suppressed')),
  sent_at         timestamptz,

  -- outcomes (Stage 3+)
  outcome         text not null default 'none'
                    check (outcome in ('none','opened','replied','booked')),
  outcome_value   numeric(12,2),
  outcome_at      timestamptz,

  -- audit
  notes           text,                              -- sanitised free text; DATA never instructions
  raw             jsonb not null default '{}'::jsonb, -- original row, for provenance
  warnings        text[] not null default '{}',

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists opportunity_client_score_idx
  on public.opportunity (client_id, score desc);
create index if not exists opportunity_client_warmth_idx
  on public.opportunity (client_id, warmth);
create index if not exists opportunity_client_lastactivity_idx
  on public.opportunity (client_id, last_activity_at);

-- keep updated_at honest
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists opportunity_set_updated_at on public.opportunity;
create trigger opportunity_set_updated_at
  before update on public.opportunity
  for each row execute function public.set_updated_at();

-- Fail closed: RLS on, no public policy. Server code (cron / API routes) uses the
-- service role key, which bypasses RLS. Per-client tenant policies (matching the
-- caller's client_id from the SSO JWT) are added when the in-portal review screen
-- is wired in Stage 2/3. Until then nothing is reachable from the browser.
alter table public.opportunity enable row level security;

comment on table public.opportunity is
  'Luna Agents found-money opportunities, per-client scoped. RLS fail-closed; access via service role until tenant policies are added.';
