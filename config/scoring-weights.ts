import type { ScoringWeights } from '../lib/scoring';

// Default scoring weights for the "found money" agent. These are deliberately
// config-driven so each pilot can be tuned without touching engine code. Copy this
// object and override per client when their pipeline shape justifies it.
//
// The intent of the defaults:
//  - A quote that has gone quiet but is not yet cold (roughly 2-11 weeks) is the
//    sweet spot and earns full recency points.
//  - A brand-new quote scores lower: it is still in active follow-up, not "lost".
//  - Higher quote value and an in-budget signal lift priority.
//  - A repeat customer and a ~12-month rebook anniversary are strong warm signals.
export const DEFAULT_WEIGHTS: ScoringWeights = {
  recency: { recentBelowDays: 10, peakEndDays: 75, coolAfterDays: 180, maxPoints: 40 },
  value: { referenceValue: 6000, highValueAt: 4000, maxPoints: 30 },
  inBudgetPoints: 12,
  repeatCustomerPoints: 10,
  rebook: { idealMonths: 12, windowMonths: 3, points: 22 },
  typeBonus: { cold_quote: 6, unconverted_enquiry: 2, rebook_due: 4 },
  warmth: { hotAt: 75, warmAt: 45 },
};
