import type { Opportunity, OpportunityType, Warmth } from './types';

// Rules-based, deterministic, explainable scoring. No LLM - the score must be
// reproducible and every point must trace to a plain-English reason a human can
// read. Weights are passed in (config-driven) so each pilot can be tuned without
// touching this logic.

const DAY = 86_400_000;

export interface ScoringWeights {
  recency: {
    recentBelowDays: number; // newer than this = still in active follow-up, lower urgency
    peakEndDays: number; // gone quiet but not cold: full recency points up to here
    coolAfterDays: number; // beyond this = dormant
    maxPoints: number;
  };
  value: {
    referenceValue: number; // value that earns full value points
    highValueAt: number; // at/above this we call it out as "high-value" in the headline
    maxPoints: number;
  };
  inBudgetPoints: number;
  repeatCustomerPoints: number;
  rebook: {
    idealMonths: number; // a year on from the last trip is the natural rebook nudge
    windowMonths: number; // +/- tolerance around ideal
    points: number;
  };
  typeBonus: Record<OpportunityType, number>;
  warmth: { hotAt: number; warmAt: number };
}

export interface ScoringSignals {
  budget: number | null;
  isRepeat: boolean;
  returnDate: string | null; // ISO date of last trip's return
}

export interface ScoreResult {
  score: number;
  reason_codes: string[];
  warmth: Warmth;
}

function dayWord(n: number): string {
  return n === 1 ? 'day' : 'days';
}

function formatMoney(n: number, currency: string): string {
  const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '';
  const num = Math.round(n).toLocaleString('en-GB');
  return symbol ? `${symbol}${num}` : `${num} ${currency}`;
}

export function scoreOpportunity(
  op: Opportunity,
  signals: ScoringSignals,
  w: ScoringWeights,
  now: Date = new Date(),
): ScoreResult {
  let points = 0;
  const reasons: string[] = []; // granular, secondary reasons

  // Headline slots, assembled in commercial-priority order at the end so the
  // headline reads like "warm: in-budget quote, no contact in 21 days".
  let hValue: string | null = null;
  let hInBudget: string | null = null;
  let hRebook: string | null = null;
  let hRecency: string | null = null;

  // --- Recency of last contact ---
  let daysSince: number | null = null;
  if (op.last_activity_at) {
    const t = new Date(op.last_activity_at).getTime();
    if (!Number.isNaN(t)) daysSince = Math.floor((now.getTime() - t) / DAY);
  }
  if (daysSince != null && daysSince >= 0) {
    const { recentBelowDays, peakEndDays, coolAfterDays, maxPoints } = w.recency;
    if (daysSince < recentBelowDays) {
      points += maxPoints * 0.4;
      reasons.push(`recent activity ${daysSince} ${dayWord(daysSince)} ago`);
    } else if (daysSince <= peakEndDays) {
      points += maxPoints;
      hRecency = `no contact in ${daysSince} days`;
    } else if (daysSince <= coolAfterDays) {
      const frac = (daysSince - peakEndDays) / (coolAfterDays - peakEndDays);
      points += maxPoints * (1 - 0.6 * frac);
      reasons.push(`cooling, no contact in ${daysSince} days`);
    } else {
      points += maxPoints * 0.25;
      reasons.push(`dormant, no contact in ${daysSince} days`);
    }
  } else {
    reasons.push('no last-activity date on record');
  }

  // --- Quote value ---
  if (op.quote_value != null && op.quote_value > 0) {
    const { referenceValue, highValueAt, maxPoints } = w.value;
    points += Math.min(op.quote_value / referenceValue, 1) * maxPoints;
    const money = formatMoney(op.quote_value, op.currency);
    if (op.quote_value >= highValueAt) hValue = `high-value quote ${money}`;
    else reasons.push(`quote value ${money}`);
  }

  // --- In-budget signal ---
  if (signals.budget != null && signals.budget > 0 && op.quote_value != null && op.quote_value > 0) {
    if (op.quote_value <= signals.budget * 1.05) {
      points += w.inBudgetPoints;
      hInBudget = 'in-budget quote';
    } else {
      reasons.push('quote above stated budget');
    }
  }

  // --- Repeat / past customer ---
  if (signals.isRepeat || op.opportunity_type === 'rebook_due') {
    points += w.repeatCustomerPoints;
    reasons.push('repeat customer');
  }

  // --- Rebook window ---
  if (signals.returnDate) {
    const t = new Date(signals.returnDate).getTime();
    if (!Number.isNaN(t)) {
      const monthsSince = (now.getTime() - t) / (DAY * 30.4);
      if (monthsSince > 0 && Math.abs(monthsSince - w.rebook.idealMonths) <= w.rebook.windowMonths) {
        points += w.rebook.points;
        hRebook = `rebook due (~${Math.round(monthsSince)} months since last trip)`;
      } else if (monthsSince > 0) {
        reasons.push(`travelled ~${Math.round(monthsSince)} months ago`);
      }
    }
  }

  // --- Type bonus ---
  points += w.typeBonus[op.opportunity_type] ?? 0;

  // --- Finalise ---
  const score = Math.max(0, Math.min(100, Math.round(points)));
  const warmth: Warmth = score >= w.warmth.hotAt ? 'hot' : score >= w.warmth.warmAt ? 'warm' : 'cool';

  const headlineBits = [hValue, hInBudget, hRebook, hRecency].filter((b): b is string => b != null);
  const headline =
    headlineBits.length > 0 ? `${warmth}: ${headlineBits.join(', ')}` : `${warmth}: ${reasons[0] ?? 'low signal'}`;

  const reason_codes = [headline, ...reasons];

  return { score, reason_codes, warmth };
}
