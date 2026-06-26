import { useEffect, useRef, useState, useCallback } from "react";
import {
  pricingStore,
  PRICING_MATRIX,
  CURRENCIES,
  CYCLES,
  type Cycle,
  type Currency,
} from "@/lib/pricingStore";
import { playClick } from "@/lib/audio";

/**
 * PricingControls — Billing Cycle Toggle + Currency Selector
 * -----------------------------------------------------------
 * This component manages its OWN local state for pressed-chip
 * visuals. It pushes changes into the external pub/sub store
 * which notifies <Price /> nodes directly. The parent
 * <PricingSection /> never re-renders.
 *
 * Micro-interactions:
 *   - Sliding thumb on cycle toggle: 200ms ease-out
 *   - Currency chip background: 180ms ease-out (via `hover-tx`)
 *   - Scale pulse on press: 150ms CSS active state
 */
export function PricingControls() {
  const [cycle, setCycle] = useState<Cycle>(pricingStore.get().cycle);
  const [currency, setCurrency] = useState<Currency>(pricingStore.get().currency);
  const thumbRef = useRef<HTMLSpanElement>(null);

  // Push to external store on change — only this component re-renders
  useEffect(() => {
    pricingStore.set({ cycle, currency });
  }, [cycle, currency]);

  const handleCycleChange = useCallback((c: Cycle) => {
    setCycle(c);
    playClick();
  }, []);
  const handleCurrencyChange = useCallback((c: Currency) => {
    setCurrency(c);
    playClick();
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {/* ── Billing Cycle Toggle ── */}
      <div
        role="tablist"
        aria-label="Billing cycle"
        className="pricing-toggle-group relative inline-flex rounded-full border border-line bg-noir-soft/40 p-1 font-mono text-xs"
      >
        {/* Sliding thumb indicator */}
        <span
          ref={thumbRef}
          aria-hidden
          className="pricing-toggle-thumb absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-forsythia"
          style={{
            left: cycle === "monthly" ? "4px" : "calc(50% + 0px)",
            transition: "left 200ms var(--ease-out)",
          }}
        />
        {CYCLES.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cycle === c}
            onClick={() => handleCycleChange(c)}
            className={`pricing-cycle-btn relative z-10 px-5 py-2 uppercase tracking-widest hover-tx ${
              cycle === c ? "text-noir" : "text-arctic/70 hover:text-arctic"
            }`}
          >
            {PRICING_MATRIX.cycles[c].label}
            {c === "annual" && (
              <span
                className={`ml-2 rounded-sm px-1.5 py-0.5 text-[10px] hover-tx ${
                  cycle === "annual"
                    ? "bg-noir/15 text-noir"
                    : "bg-forsythia/15 text-forsythia"
                }`}
              >
                −{PRICING_MATRIX.annualSavingsPercent}%
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Currency Segmented Control ── */}
      <div
        role="radiogroup"
        aria-label="Currency"
        className="pricing-toggle-group inline-flex rounded-full border border-line bg-noir-soft/40 p-1 font-mono text-xs"
      >
        {CURRENCIES.map((c) => (
          <button
            key={c}
            role="radio"
            aria-checked={currency === c}
            onClick={() => handleCurrencyChange(c)}
            className={`pricing-currency-btn rounded-full px-4 py-2 uppercase tracking-widest hover-tx ${
              currency === c
                ? "bg-arctic text-noir"
                : "text-arctic/70 hover:text-arctic"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
