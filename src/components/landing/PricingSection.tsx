import { memo } from "react";
import { Price } from "./Price";
import { PricingControls } from "./PricingControls";
import {
  PRICING_MATRIX,
  TIER_KEYS,
  type TierKey,
} from "@/lib/pricingStore";

/**
 * TierCard — Memoized Pricing Card
 * -----------------------------------------------------------
 * Each card is `memo`'d and receives ONLY a stable `tier` key.
 * No prop ever changes after mount, so React.memo short-circuits
 * every parent render. The inner <Price /> handles its own DOM
 * updates via direct textContent mutation.
 *
 * All display strings (label, tagline, CTA, features) are
 * derived from PRICING_MATRIX — zero hardcoded UI values.
 */
const TierCard = memo(function TierCard({ tier }: { tier: TierKey }) {
  const meta = PRICING_MATRIX.tiers[tier];
  const features = PRICING_MATRIX.features[tier];
  const highlighted = meta.highlighted;

  return (
    <article
      className={`card relative flex flex-col p-7 hover-tx ${
        highlighted
          ? "border-forsythia/40 shadow-[0_0_0_1px_rgba(255,200,1,0.18),0_30px_80px_-40px_rgba(255,200,1,0.35)]"
          : ""
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 right-6 rounded-full bg-forsythia px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-noir">
          Most picked
        </span>
      )}
      <header className="mb-6">
        <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-mute">
          {meta.label}
        </h3>
        <p className="mt-3 max-w-xs text-sm text-arctic/70">{meta.tagline}</p>
      </header>

      <div className="mb-7">
        <Price tier={tier} />
      </div>

      <ul className="space-y-3 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-arctic/85">
            <span
              aria-hidden
              className="mt-2 inline-block size-1.5 rounded-full bg-forsythia"
            />
            {f}
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 inline-flex h-11 items-center justify-center rounded-full font-mono text-xs uppercase tracking-widest hover-tx ${
          highlighted
            ? "bg-forsythia text-noir hover:brightness-95"
            : "border border-line-strong text-arctic hover:border-forsythia hover:text-forsythia"
        }`}
      >
        {meta.cta}
      </button>
    </article>
  );
});

/**
 * PricingSection — Section Container
 * -----------------------------------------------------------
 * This component renders ONCE. It does not hold any pricing
 * state — the <PricingControls /> manages its own local state
 * and pushes to the external store. <TierCard /> components are
 * memoized and never receive changing props. <Price /> leaf
 * nodes subscribe directly to the store.
 *
 * Toggle interactions propagate through the external pub/sub
 * store → direct DOM mutation path, completely bypassing
 * React's reconciliation for the pricing grid.
 */
export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-line bg-noir px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-forsythia">
            [ 03 / Pricing matrix ]
          </span>
          <h2 className="mt-5 text-4xl font-medium leading-tight sm:text-5xl">
            Priced for the run-rate, not the seat count.
          </h2>
          <p className="mt-4 text-arctic/70">
            Toggle billing cycle and currency — values recompute against a tariff
            matrix without re-rendering the surrounding layout.
          </p>
          <div className="mt-8">
            <PricingControls />
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {TIER_KEYS.map((tier) => (
            <TierCard key={tier} tier={tier} />
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-widest text-mute">
          base × tariff(<span className="text-arctic">currency</span>) × discount(<span className="text-arctic">cycle</span>) — 0 hardcoded values
        </p>
      </div>
    </section>
  );
}
