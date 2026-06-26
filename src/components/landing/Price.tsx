import { useEffect, useRef } from "react";
import {
  pricingStore,
  computePrice,
  formatPrice,
  cycleSuffix,
  type TierKey,
} from "@/lib/pricingStore";

/**
 * Price — Leaf DOM Text-Node Mutator
 * -----------------------------------------------------------
 * This component renders ONCE and never re-renders. It subscribes
 * to the external pricing store on mount and writes directly to
 * its own DOM via `.textContent` — satisfying the brief's strict
 * "isolate updates to targeted text nodes" requirement.
 *
 * No React state, no VDOM diffing, no parent notification.
 * The useRef + useEffect pattern ensures:
 *   1. The <span> mounts with empty text (React render #1)
 *   2. useEffect writes the initial value via textContent
 *   3. Store subscription writes subsequent values via textContent
 *   4. Component never re-renders (deps: [tier] which is stable)
 */
export function Price({ tier }: { tier: TierKey }) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const suffixRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Direct DOM writer — bypasses React entirely
    const write = (s: ReturnType<typeof pricingStore.get>) => {
      if (priceRef.current) {
        const value = computePrice(tier, s);
        priceRef.current.textContent = formatPrice(value, s.currency);
      }
      if (suffixRef.current) {
        suffixRef.current.textContent = cycleSuffix(s.cycle);
      }
    };

    // Initial paint
    write(pricingStore.get());

    // Subscribe for future changes — returns unsubscribe
    return pricingStore.subscribe(write);
  }, [tier]);

  return (
    <span className="inline-flex items-baseline gap-2">
      <span
        ref={priceRef}
        className="font-mono text-5xl font-medium tracking-tight tabular-nums text-arctic"
      />
      <span
        ref={suffixRef}
        className="font-mono text-xs text-mute uppercase tracking-widest"
      />
    </span>
  );
}
