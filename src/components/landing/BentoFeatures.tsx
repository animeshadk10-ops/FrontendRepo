import { useEffect, useRef, useState } from "react";
import cube from "@/assets/icons/cube-16-solid.svg";
import chart from "@/assets/icons/chart-pie.svg";
import trend from "@/assets/icons/arrow-trending-up.svg";
import cog from "@/assets/icons/cog-8-tooth.svg";
import refresh from "@/assets/icons/arrow-path.svg";
import link from "@/assets/icons/link-solid.svg";
import chev from "@/assets/icons/chevron-down.svg";
import { playTick } from "@/lib/audio";

/* ──────────────────────────────────────────────────────────────── */
/* Feature Node Data                                               */
/* ──────────────────────────────────────────────────────────────── */
const NODES = [
  {
    icon: cube,
    label: "Composable agents",
    title: "Drop-in nodes that compose into pipelines",
    body: "Each agent is a typed contract — chain them into deterministic graphs with branching, retries, and audit trails baked in.",
  },
  {
    icon: chart,
    label: "Observability",
    title: "Trace every token across every run",
    body: "Spans, costs, latencies, and prompt diffs streamed live. Replay any production failure with one click.",
  },
  {
    icon: trend,
    label: "Adaptive routing",
    title: "Cheapest model that hits your SLO",
    body: "Router benchmarks providers per task, fails over silently, and learns your accuracy bar over time.",
  },
  {
    icon: cog,
    label: "Policy engine",
    title: "Guardrails as code, not vibes",
    body: "PII scrubbing, schema validation, and tool-use ACLs evaluated before any external call leaves the boundary.",
  },
  {
    icon: refresh,
    label: "Self-healing runs",
    title: "Retries that understand the failure",
    body: "Classify, backoff, reroute. Production agents stay live through provider outages and rate-limit waves.",
  },
  {
    icon: link,
    label: "200+ integrations",
    title: "Wire into the stack you already own",
    body: "First-class connectors for Postgres, Snowflake, Slack, Stripe, Linear, S3, and the long tail through generic HTTP + OAuth.",
  },
];

type LayoutProps = {
  active: number;
  setActive: (i: number) => void;
};

/* ──────────────────────────────────────────────────────────────── */
/* Bento ↔ Accordion Controller                                    */
/* ──────────────────────────────────────────────────────────────── */
/**
 * Context Lock Implementation
 * -----------------------------------------------------------
 * The `active` index lives ABOVE the layout conditional so that
 * when matchMedia triggers a breakpoint crossing (desktop ↔
 * mobile), the exact same index is programmatically transferred
 * to whichever layout mounts next:
 *   - Desktop Bento: highlights card[active]
 *   - Mobile Accordion: opens panel[active]
 *
 * Zero external dependencies. The resize-aware matchMedia
 * listener is native browser API. Layout switching is a
 * conditional render — React unmounts the old layout and mounts
 * the new one with the preserved active index.
 */
export function BentoFeatures() {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(1);

  /* ── Context Lock: matchMedia breakpoint listener ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      // Native View Transitions API for structural morph
      if (!document.startViewTransition) {
        setIsMobile(mq.matches);
      } else {
        document.startViewTransition(() => {
          setIsMobile(mq.matches);
        });
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-line bg-noir px-6 py-24 sm:py-32"
    >
      {/* ── Cinematic ambient glow orbs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 size-125 rounded-full bg-forsythia/6 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 size-100 rounded-full bg-saffron/4 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-forsythia">
              [ 02 / Capabilities ]
            </span>
            <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-tight sm:text-5xl">
              A spine for production-grade agents.
            </h2>
          </div>
          <p className="max-w-md text-arctic/70">
            Six primitives. Composed, they cover the full lifecycle from
            prototype to incident postmortem.
          </p>
        </header>

        {isMobile ? (
          <MobileAccordion active={active} setActive={setActive} />
        ) : (
          <DesktopBento active={active} setActive={setActive} />
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* Desktop: Glassmorphism Bento Grid                               */
/* ──────────────────────────────────────────────────────────────── */
/**
 * Zero dependencies. All transitions are native CSS via the
 * `.feature-tx` class (360ms ease-in-out). Entrance animations
 * use the Web Animations API (WAAPI) with staggered delays.
 *
 * Glassmorphism: backdrop-blur-xl + gradient overlays + golden
 * border glow on active cards. All via Tailwind utility classes.
 */
function DesktopBento({ active, setActive }: LayoutProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  /* ── WAAPI staggered entrance animation ── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cards = grid.children;

    const anims = Array.from(cards).map((card, i) =>
      (card as HTMLElement).animate(
        [
          { opacity: 0, transform: "translateY(24px) scale(0.97)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        {
          duration: reduced ? 1 : 420,
          delay: reduced ? 0 : i * 70,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        }
      )
    );

    return () => anims.forEach((a) => a.cancel());
  }, []);

  return (
    <div
      ref={gridRef}
      className="group/bento grid grid-cols-6 gap-4 auto-rows-[minmax(160px,auto)]"
    >
      {NODES.map((n, i) => {
        const isActive = active === i;
        return (
          <button
            key={n.label}
            onMouseEnter={() => {
              setActive(i);
              playTick();
            }}
            onFocus={() => setActive(i)}
            aria-label={n.title}
            // CSS :has() spotlight logic via Tailwind v4 arbitrary variants
            // and View Transitions mapping
            style={{ viewTransitionName: isActive ? "feature-morph" : "none" }}
            className={`feature-card group feature-tx relative overflow-hidden rounded-3xl border p-7 text-left backdrop-blur-xl bg-white/[0.03] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-200 group-has-[.feature-card:hover]/bento:[&:not(:hover)]:opacity-40 ${bentoSpan(i)} ${
              isActive
                ? "border-forsythia/50 -translate-y-1 shadow-[0_12px_40px_-12px_rgba(6,182,212,0.4)]"
                : "border-white/[0.08] hover:border-forsythia/50"
            }`}
          >
            {/* ── Glass refraction highlight ── */}
            {/* Neon Glass SVG Mockups for visual pop */}
            {i === 0 && (
              <div className="absolute -right-4 -top-4 opacity-50 feature-tx group-hover:opacity-100 group-hover:scale-105 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="var(--color-forsythia)" strokeWidth="0.5" strokeDasharray="2 4"/>
                  <circle cx="50" cy="50" r="25" stroke="var(--color-saffron)" strokeWidth="1" opacity="0.8"/>
                  <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="var(--color-forsythia)" strokeWidth="0.5" opacity="0.4"/>
                  <circle cx="50" cy="50" r="4" fill="var(--color-arctic)" />
                  <circle cx="78" cy="22" r="2" fill="var(--color-saffron)" />
                  <circle cx="22" cy="78" r="2" fill="var(--color-forsythia)" />
                </svg>
              </div>
            )}
            
            {i === 3 && (
              <div className="absolute -bottom-6 -right-6 opacity-30 feature-tx group-hover:opacity-80 group-hover:-translate-y-2 pointer-events-none">
                <svg width="220" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 90 L30 60 L50 70 L80 20" stroke="var(--color-saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 90 L30 60 L50 70 L80 20 L80 90 Z" fill="url(#grad1)" opacity="0.2"/>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-saffron)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <circle cx="30" cy="60" r="3" fill="var(--color-forsythia)"/>
                  <circle cx="50" cy="70" r="3" fill="var(--color-forsythia)"/>
                  <circle cx="80" cy="20" r="4" fill="var(--color-arctic)" shadow="0 0 10px #fff"/>
                </svg>
              </div>
            )}

            <div className="flex h-full flex-col relative z-10">
              {/* Icon badge + label */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  className={`grid size-9 place-items-center rounded-lg feature-tx ${
                    isActive
                      ? "bg-forsythia shadow-[0_0_16px_rgba(255,200,1,0.35)]"
                      : "bg-arctic/6 backdrop-blur-sm"
                  }`}
                >
                  <img
                    src={n.icon}
                    alt=""
                    aria-hidden
                    className={`size-4 ${isActive ? "" : "filter-[invert(1)]"}`}
                  />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-mute">
                  {n.label}
                </span>
              </div>

              <h3 className="text-lg font-medium leading-snug text-arctic">
                {n.title}
              </h3>
              <p className="mt-3 text-sm text-arctic/65">{n.body}</p>

              {/* ── Corner glow orb ── */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-forsythia/15 blur-2xl feature-tx ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

/** Asymmetric bento layout: [3,3] → [2,2,2] → [6] */
function bentoSpan(i: number): string {
  const spans = [
    "col-span-3", // 0: half-row
    "col-span-3", // 1: half-row
    "col-span-2", // 2: third-row
    "col-span-2", // 3: third-row
    "col-span-2", // 4: third-row
    "col-span-6", // 5: full-width
  ];
  return spans[i] ?? "col-span-3";
}

/* ──────────────────────────────────────────────────────────────── */
/* Mobile: Touch-Optimized Glassmorphism Accordion                 */
/* ──────────────────────────────────────────────────────────────── */
/**
 * Zero dependencies. Content expand/collapse uses the native CSS
 * `grid-template-rows: 0fr → 1fr` trick via the `.struct-tx`
 * utility (360ms ease-in-out). Chevron rotation also uses the
 * `.feature-tx` class for 360ms ease-in-out.
 *
 * Touch optimization:
 *   - Trigger buttons have min-height: 56px (above 48px minimum)
 *   - Icon badges are 40×40px for easy thumb targeting
 *   - Clear active-state glass highlight for visual feedback
 *
 * WAAPI entrance: staggered fade+rise on mount.
 */
function MobileAccordion({ active, setActive }: LayoutProps) {
  const listRef = useRef<HTMLUListElement>(null);

  /* ── WAAPI staggered entrance animation ── */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const items = list.children;

    const anims = Array.from(items).map((item, i) =>
      (item as HTMLElement).animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: reduced ? 1 : 380,
          delay: reduced ? 0 : i * 50,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        }
      )
    );

    return () => anims.forEach((a) => a.cancel());
  }, []);

  return (
    <ul ref={listRef} className="border-t border-line">
      {NODES.map((n, i) => {
        const open = active === i;
        return (
          <li
            key={n.label}
            style={{ viewTransitionName: open ? "feature-morph" : "none" }}
            className={`border-b border-line feature-tx ${
              open
                ? "bg-arctic/2.5 backdrop-blur-lg"
                : ""
            }`}
          >
            <button
              onClick={() => setActive(open ? -1 : i)}
              onMouseEnter={playTick}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-2 py-5 text-left hover-tx"
              style={{ minHeight: "56px" }}
            >
              <span className="flex items-center gap-4">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-lg feature-tx ${
                    open
                      ? "bg-forsythia shadow-[0_0_12px_rgba(255,200,1,0.3)]"
                      : "bg-arctic/6 backdrop-blur-sm"
                  }`}
                >
                  <img
                    src={n.icon}
                    alt=""
                    aria-hidden
                    className={`size-4 ${open ? "" : "filter-[invert(1)]"}`}
                  />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-mute">
                    {n.label}
                  </span>
                  <span className="block text-base font-medium text-arctic">
                    {n.title}
                  </span>
                </span>
              </span>

              {/* Chevron — 360ms ease-in-out rotation via feature-tx */}
              <img
                src={chev}
                alt=""
                aria-hidden
                className="size-4 shrink-0 filter-[invert(1)] feature-tx"
                style={{
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* ── Content panel ──
                 Native CSS grid-template-rows trick for height
                 transition. struct-tx provides 360ms ease-in-out
                 on grid-template-rows — no JS animation engine. */}
            <div
              className="grid struct-tx"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pb-6 pl-15 pr-4">
                  <p className="text-sm leading-relaxed text-arctic/70">
                    {n.body}
                  </p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
