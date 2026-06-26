/**
 * Performance-Isolated Pricing Store
 * ---------------------------------------------------------------
 * All UI prices are derived from a single multidimensional config
 * object: `PRICING_MATRIX`. The formula is:
 *
 *   monthlyPrice = base × tariff.factor × cycleDiscount
 *
 * Nothing in the UI is hardcoded — every price string, every
 * currency symbol, every discount label originates from this
 * matrix.
 *
 * The store is a tiny pub/sub that lives OUTSIDE React's render
 * tree. Switching currency or billing cycle does NOT call setState
 * on the page or the pricing card components — instead, each
 * <Price /> subscribes once on mount and updates its own DOM text
 * node via `.textContent`.
 *
 * Result: zero parent re-renders, zero VDOM diffing on toggle.
 */

/* ──────────────────────────────────────────────────────────────── */
/* Types                                                           */
/* ──────────────────────────────────────────────────────────────── */
export type Cycle = "monthly" | "annual";
export type Currency = "INR" | "USD" | "EUR";
export type TierKey = "starter" | "growth" | "scale";

/* ──────────────────────────────────────────────────────────────── */
/* Multidimensional Configuration Matrix                           */
/* ──────────────────────────────────────────────────────────────── */
/**
 * Every dimension of pricing is factored into its own axis:
 *   1. Tier axis     → base rate per plan (abstract USD units)
 *   2. Currency axis → regional tariff multiplier + formatting
 *   3. Cycle axis    → discount multiplier (annual = 0.80)
 *
 * To add a new currency, add ONE entry to `tariffs`.
 * To add a new tier, add ONE entry to `tiers`.
 * To change the annual discount, update ONE scalar.
 */
export const PRICING_MATRIX = {
  /** Billing cycle discount multipliers */
  cycles: {
    monthly: { discount: 1.0,  label: "Monthly", suffix: "/mo" },
    annual:  { discount: 0.8,  label: "Annual",  suffix: "/mo · billed yearly" },
  },

  /** Annual savings percentage — derived from discount for display */
  annualSavingsPercent: 20,

  /** Base monthly rate per tier — abstract USD units before tariff */
  tiers: {
    starter: {
      base: 19,
      label: "Starter",
      tagline: "For solo operators wiring their first agents.",
      cta: "Start Starter",
      highlighted: false,
    },
    growth: {
      base: 79,
      label: "Growth",
      tagline: "For teams shipping production automations.",
      cta: "Start Growth",
      highlighted: true,
    },
    scale: {
      base: 249,
      label: "Scale",
      tagline: "For enterprises with regulated data planes.",
      cta: "Start Scale",
      highlighted: false,
    },
  },

  /** Regional tariff multipliers + locale formatting config */
  tariffs: {
    USD: { factor: 1,     symbol: "$",  locale: "en-US", code: "USD" as const },
    EUR: { factor: 0.93,  symbol: "€",  locale: "de-DE", code: "EUR" as const },
    INR: { factor: 83.2,  symbol: "₹",  locale: "en-IN", code: "INR" as const },
  },

  /** Feature lists per tier — also driven from config, not hardcoded in JSX */
  features: {
    starter: [
      "5 active automations",
      "1,000 task runs / month",
      "Community support",
      "Standard model routing",
    ],
    growth: [
      "Unlimited automations",
      "50,000 task runs / month",
      "Priority email + chat",
      "Custom model fine-tunes",
      "Versioned deploys",
    ],
    scale: [
      "Everything in Growth",
      "1M+ task runs / month",
      "Dedicated VPC & SOC 2",
      "24/7 incident response",
      "On-prem model gateway",
    ],
  },
} as const;

/** List of tier keys for iteration — avoids repeating in UI code */
export const TIER_KEYS: readonly TierKey[] = ["starter", "growth", "scale"] as const;

/** List of currencies for iteration */
export const CURRENCIES: readonly Currency[] = ["USD", "EUR", "INR"] as const;

/** List of cycles for iteration */
export const CYCLES: readonly Cycle[] = ["monthly", "annual"] as const;

/* ──────────────────────────────────────────────────────────────── */
/* Pub/Sub Store (outside React)                                   */
/* ──────────────────────────────────────────────────────────────── */
type State = { cycle: Cycle; currency: Currency };
type Listener = (s: State) => void;

const listeners = new Set<Listener>();
let state: State = { cycle: "monthly", currency: "USD" };

export const pricingStore = {
  get: () => state,
  set: (next: Partial<State>) => {
    const prev = state;
    state = { ...state, ...next };
    // Only notify if something actually changed
    if (prev.cycle !== state.cycle || prev.currency !== state.currency) {
      for (const l of listeners) l(state);
    }
  },
  subscribe: (l: Listener) => {
    listeners.add(l);
    return () => { listeners.delete(l); };
  },
};

/* ──────────────────────────────────────────────────────────────── */
/* Price computation — pure function, no side effects              */
/* ──────────────────────────────────────────────────────────────── */
export function computePrice(tier: TierKey, s: State = state): number {
  const { base } = PRICING_MATRIX.tiers[tier];
  const tariff = PRICING_MATRIX.tariffs[s.currency];
  const { discount } = PRICING_MATRIX.cycles[s.cycle];
  return base * tariff.factor * discount;
}

/* ──────────────────────────────────────────────────────────────── */
/* Price formatting — locale-aware with Intl                       */
/* ──────────────────────────────────────────────────────────────── */
export function formatPrice(value: number, currency: Currency): string {
  const t = PRICING_MATRIX.tariffs[currency];
  const rounded = value >= 100 ? Math.round(value) : Math.round(value * 100) / 100;
  const formatted = new Intl.NumberFormat(t.locale, {
    maximumFractionDigits: rounded >= 100 ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(rounded);
  return `${t.symbol}${formatted}`;
}

/** Get the billing suffix string for a cycle */
export function cycleSuffix(cycle: Cycle): string {
  return PRICING_MATRIX.cycles[cycle].suffix;
}
