import { useEffect, useRef, lazy, Suspense, useState, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { playTick, playClick } from "@/lib/audio";
import { BentoFeatures } from "./BentoFeatures";
import { PricingSection } from "./PricingSection";
import cube from "@/assets/icons/cube-16-solid.svg";
import trend from "@/assets/icons/arrow-trending-up.svg";
import refresh from "@/assets/icons/arrow-path.svg";
import search from "@/assets/icons/search.svg";
import chevRight from "@/assets/icons/chevron-right.svg";

/* ── SSR-safe lazy imports for WebGL components ──────────────────
   React.lazy splits three.js into a separate async chunk.
   ClientOnly prevents hydration mismatches by deferring render
   to the client. Three.js code NEVER enters the server bundle.
   Semantic HTML renders immediately; WebGL loads asynchronously
   within the existing <500ms boot timeline.
   ────────────────────────────────────────────────────────────── */
const HeroWaveGrid = lazy(() => import("./HeroWaveGrid"));
const DataSphere = lazy(() => import("./DataSphere"));

/** Client-only gate — prevents SSR execution of WebGL code */
function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

/** Helper component to wrap elements with scroll animations */
function InView({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref as any}
      className={`scroll-fade-up ${isVisible ? "scroll-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}


/**
 * Sentient Boot Sequence (450ms)
 * Violently shatters from a terminal view into the UI using WAAPI,
 * strictly honoring the < 500ms constraint.
 */
function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !textRef.current) return;

    // Typewriter effect simulation via CSS steps isn't viable in 400ms,
    // so we just animate the container out violently at 400ms.
    const anim = el.animate(
      [
        { opacity: 1, visibility: "visible", transform: "scale(1)" },
        { opacity: 0, visibility: "hidden", transform: "scale(1.1) translateY(-20px)" },
      ],
      { duration: 50, delay: 400, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
    return () => anim.cancel();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-start justify-end bg-noir p-6 font-mono text-[10px] uppercase tracking-widest text-forsythia"
      style={{ contain: "strict" }}
    >
      <div ref={textRef}>
        <div className="opacity-60">SYSTEM KERNEL 4.02 // NODAL.AI</div>
        <div>INITIALIZING NEURAL WEIGHTS... [OK]</div>
        <div>MOUNTING VIRTUAL DOM... [OK]</div>
        <div className="mt-2 text-arctic">WAITING FOR HANDSHAKE...</div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 hover-tx hover:opacity-80" onMouseEnter={playTick}>
          <img src={cube} alt="" aria-hidden className="size-5 [filter:invert(85%)_sepia(54%)_saturate(2476%)_hue-rotate(1deg)_brightness(105%)_contrast(101%)]" />
          <span className="font-mono text-sm font-medium tracking-wider text-arctic">nodal<span className="text-forsythia">.ai</span></span>
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-arctic/70 md:flex" aria-label="Primary">
          <a href="#features" className="hover-tx hover:text-arctic" onMouseEnter={playTick}>Capabilities</a>
          <a href="#pricing"  className="hover-tx hover:text-arctic" onMouseEnter={playTick}>Pricing</a>
          <a href="#proof"    className="hover-tx hover:text-arctic" onMouseEnter={playTick}>Customers</a>
          <a href="#faq"      className="hover-tx hover:text-arctic" onMouseEnter={playTick}>FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="Search" className="hover-glow grid size-9 place-items-center rounded-full border border-line hover:border-line-strong" onMouseEnter={playTick}>
            <img src={search} alt="" aria-hidden className="size-4 filter-[invert(1)]" />
          </button>
          <a
            href="#pricing"
            onMouseEnter={playTick}
            className="hover-glow inline-flex h-9 items-center gap-2 rounded-full bg-forsythia px-4 font-mono text-[11px] uppercase tracking-widest text-noir hover:brightness-95"
          >
            Start free
            <img src={chevRight} alt="" aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
      <div className="hair h-px w-full" />
    </header>
  );
}

function Hero() {
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Dispatch coordinates continuously for WebGL raycasting tracking
  // Using an animation frame loop attached to the window allows us
  // to broadcast position without React re-renders.
  useEffect(() => {
    let raf = 0;
    const track = () => {
      const el = ctaRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        window.dispatchEvent(new CustomEvent('cta-move', { detail: { x, y } }));
      }
      raf = requestAnimationFrame(track);
    };
    track();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-noir pt-16">
      {/* Cinematic Digital Sun */}
      <div className="absolute inset-x-0 bottom-0 top-1/4 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-saffron/40 via-forsythia/10 to-transparent pointer-events-none z-0" />
      
      {/* 3D Terrain Grid — lazy-loaded, client-only, non-blocking */}
      <div className="absolute inset-0 z-0">
        <ClientOnly>
          <Suspense fallback={null}>
            <HeroWaveGrid />
          </Suspense>
        </ClientOnly>
      </div>

      {/* gradient floor for legibility */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-noir via-noir/90 to-transparent z-10" />

      {/* Interactive Data Sphere — lazy-loaded, desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-1/2 z-10 hidden -translate-y-[45%] opacity-50 md:block"
        style={{ width: "min(42vw, 520px)", aspectRatio: "1" }}
      >
        <ClientOnly>
          <Suspense fallback={null}>
            <DataSphere />
          </Suspense>
        </ClientOnly>
      </div>

      {/* corner HUD */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-6 top-20 font-mono text-[10px] uppercase tracking-widest text-mute enter-fade delay-3">
          <div>SYS · NODAL.RUNTIME</div>
          <div>v 4.02 / mainnet</div>
        </div>
        <div className="absolute right-6 top-20 text-right font-mono text-[10px] uppercase tracking-widest text-mute enter-fade delay-3">
          <div>UPTIME · 99.998%</div>
          <div className="text-forsythia">● live</div>
        </div>
      </div>

      <div className="relative z-20 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-6 pb-24 pt-24">
        <div className="enter-rise delay-1">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-forsythia/30 bg-forsythia/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-forsythia backdrop-blur-md">
            <span className="size-1.5 animate-pulse rounded-full bg-forsythia" />
            V2.0 is live
          </span>
        </div>

        <h1 className="enter-rise delay-2 mt-6 max-w-5xl text-balance text-6xl font-black leading-[1.1] sm:text-7xl md:text-8xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl px-12 py-8 shadow-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500">
            POWER YOUR FUTURE WITH AI
          </span>
        </h1>
        <p className="enter-rise delay-2 mt-8 max-w-xl text-lg text-arctic/75">
          Nodal turns brittle prompts into observable, versioned agents — wired into your data, your tools, and your incident channel. From prototype to production in an afternoon.
        </p>

        <div className="enter-rise delay-3 mt-10 flex flex-wrap items-center gap-5">
          <a ref={ctaRef} href="#pricing" onMouseEnter={playTick} className="hover:scale-[1.05] transition-all duration-150 ease-out inline-flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-700 shadow-[0_0_25px_rgba(6,182,212,0.6)] px-8 font-mono text-sm font-bold uppercase tracking-widest text-white hover:brightness-110">
            BUILD A WORKFLOW
            <img src={chevRight} alt="" aria-hidden className="size-4 filter-[invert(1)]" />
          </a>
          <a href="#features" onMouseEnter={playTick} className="transition-all duration-150 ease-out inline-flex h-14 items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 font-mono text-sm uppercase tracking-widest text-white hover:bg-white/10">
            SEE THE ARCHITECTURE
          </a>
        </div>

        {/* live metric strip */}
        <dl className="enter-rise delay-4 mt-16 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
          {[
            ["12.4M", "runs / day"],
            ["38ms", "p50 routing"],
            ["230+", "integrations"],
            ["SOC 2", "type II"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-2xl text-arctic tabular-nums">{k}</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-mute">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-mute enter-fade delay-5">
        scroll ↓
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["composable agents", "observable runs", "policy-as-code", "tariff-aware routing", "self-healing retries", "200+ integrations"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-noir-soft/30 py-5" aria-hidden>
      <div className="flex w-[200%] gap-12 font-mono text-xs uppercase tracking-[0.4em] text-arctic/40" style={{ animation: "lp-marquee 28s linear infinite" }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            {t}
            <span className="text-forsythia">◇</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SocialProof() {
  const logos = ["Helix Labs", "Quanta", "Northwind", "Parallel", "Mercer&Co", "Loom Systems", "Atlas/9", "Foundry"];
  const quotes = [
    { q: "Nodal replaced four glued-together notebooks and a chron job. Our on-call has gone quiet.", a: "Priya Shah", r: "Staff ML Engineer, Helix Labs" },
    { q: "Tariff-aware routing alone paid for the year. We cut model spend 41% without touching accuracy.", a: "Marcus Vidal", r: "Head of Platform, Quanta" },
    { q: "First runtime that treats agents the way we treat services. Versioned, traced, owned.", a: "Anya Petrov", r: "Director of Eng, Northwind" },
  ];
  return (
    <section id="proof" className="border-t border-line bg-noir px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <InView>
          <header className="mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-forsythia">[ 04 / In production at ]</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-tight sm:text-5xl">
              Trusted by teams who measure agent uptime in nines.
            </h2>
          </header>
        </InView>

        <InView delay={100}>
          <ul className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line-strong sm:grid-cols-4">
          {logos.map((l) => (
            <li key={l} className="grid h-20 place-items-center bg-noir font-mono text-sm tracking-wider text-arctic/55">
              {l}
            </li>
          ))}
          </ul>
        </InView>

        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <InView key={q.a} delay={i * 100}>
              <figure className="hover-glow card flex h-full flex-col p-7 hover:border-line-strong">
                <img src={refresh} alt="" aria-hidden className="size-5 [filter:invert(80%)_sepia(64%)_saturate(2200%)_hue-rotate(1deg)_brightness(100%)]" />
                <blockquote className="mt-5 flex-1 text-arctic/90">
                  <p className="text-pretty leading-relaxed">"{q.q}"</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <div className="font-medium text-arctic">{q.a}</div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-mute">{q.r}</div>
                </figcaption>
              </figure>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    { q: "Do I need to rip out my orchestration?", a: "No. Nodal sits beside Airflow, Temporal, or your own service mesh. Most teams start by porting one agent and grow from there." },
    { q: "How is pricing actually computed?", a: "A base tier rate × regional tariff × billing-cycle discount. The dropdowns on this page write to an external store; the prices update via direct text-node mutation — zero re-renders." },
    { q: "Where does my data live?", a: "Your VPC by default. We never train on customer payloads and ship a read-only audit pipe for compliance." },
    { q: "What about latency?", a: "p50 routing is 38ms. Most production agents see end-to-end latency dominated by the model provider, not the runtime." },
  ];
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line bg-noir px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_2fr]">
        <InView>
          <header>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-forsythia">[ 05 / FAQ ]</span>
            <h2 className="mt-5 text-4xl font-medium leading-tight">Answered upfront.</h2>
          </header>
        </InView>

        <InView delay={100}>
          <div className="divide-y divide-line border-y border-line">
            {items.map((it, i) => {
              const isOpen = active === i;
              return (
                <div key={it.q} className="group">
                  <button
                    onClick={() => setActive(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="hover-tx flex w-full items-center justify-between py-6 text-left hover:text-arctic/80"
                  >
                    <span className="font-mono text-sm font-medium tracking-wide text-arctic">{it.q}</span>
                    <span
                      className="feature-tx ml-6 font-mono text-forsythia"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      ↓
                    </span>
                  </button>
                  <div
                    className="grid struct-tx"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-8 text-arctic/70">{it.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </InView>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-nocturnal px-6 py-32">
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-forsythia/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 size-[28rem] rounded-full bg-saffron/20 blur-3xl" />
      <InView className="relative mx-auto max-w-5xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-arctic/60">[ 06 / Ship today ]</span>
        <h2 className="mt-6 text-5xl font-medium leading-[1] tracking-tight sm:text-7xl">
          Production-grade agents, by Friday.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-arctic/75">
          Free for 14 days. No card, no sales motion. Bring one workflow — we'll wire the rest.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <a href="#pricing" className="hover-glow inline-flex h-12 items-center rounded-full bg-forsythia px-7 font-mono text-xs uppercase tracking-widest text-noir hover:brightness-95">
            Create a workspace
          </a>
          <a href="#features" className="hover-glow inline-flex h-12 items-center rounded-full border border-arctic/30 px-7 font-mono text-xs uppercase tracking-widest text-arctic hover:border-forsythia hover:text-forsythia">
            Read the docs
          </a>
        </div>
      </InView>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-noir px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <img src={cube} alt="" aria-hidden className="size-5 [filter:invert(85%)_sepia(54%)_saturate(2476%)_hue-rotate(1deg)_brightness(105%)_contrast(101%)]" />
          <span className="font-mono text-sm">nodal<span className="text-forsythia">.ai</span></span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-arctic/60">
          <a href="#features" className="hover-tx hover:text-arctic">Capabilities</a>
          <a href="#pricing" className="hover-tx hover:text-arctic">Pricing</a>
          <a href="#proof" className="hover-tx hover:text-arctic">Customers</a>
          <a href="#faq" className="hover-tx hover:text-arctic">FAQ</a>
          <a href="#" className="hover-tx hover:text-arctic">Status</a>
          <a href="#" className="hover-tx hover:text-arctic">Changelog</a>
        </nav>
        <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
          © 2026 nodal.ai — built for the FB Round 1 speed run.
        </span>
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <div className="grain relative min-h-screen bg-noir text-arctic">
      <Loader />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-forsythia focus:px-3 focus:py-2 focus:text-noir">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <BentoFeatures />
        <PricingSection />
        <SocialProof />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
