# Plan: Interactive 3D Competition Showcase

Since you haven't shared the brief yet, I'll build a **theme-agnostic, judge-bait 3D landing experience** with content slots you can rebrand the moment the actual prompt lands. The architecture and craft are what win — content is a swap.

## Concept: "Signal"

A scroll-driven 3D narrative. A single hero object (a procedurally-deformed crystalline shard with custom GLSL shaders) reacts to scroll, cursor, and audio cues, transforming through 4 chapters. Around it: kinetic typography, a custom cursor, a loader, and page transitions. The kind of site that gets retweeted.

## Stack

- **React + Vite** (already in the project) + TypeScript
- **three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing**
- **GSAP + ScrollTrigger** for timeline-precise scroll choreography
- **Lenis** for buttery smooth scroll
- **Tailwind** + custom CSS tokens for the design system
- Custom **GLSL** shaders (vertex displacement + fresnel + chromatic aberration)

## Sections (scroll chapters)

```text
00  Loader            preload assets, animated counter, reveal
01  Hero              shard at rest, kinetic title, scroll hint
02  Manifesto         shard fractures, words fly through camera
03  Capabilities      shard becomes wireframe, 3 feature pillars
04  Showcase          shard orbits 3 floating "work" cards
05  Contact / CTA     shard reforms, oversized type, footer
```

## Craft details judges notice

- Custom **SDF-based cursor** that morphs over interactive elements
- **Postprocessing**: bloom + chromatic aberration + film grain + vignette
- **Magnetic buttons**, split-text reveals, marquee, number tickers
- **Reduced-motion** + **no-WebGPU/WebGL fallback** (static poster image)
- **Performance**: instanced meshes, DPR clamp, on-demand frameloop, lazy chapters
- **A11y**: semantic landmarks, focus states, skip-to-content, alt text
- **SEO**: unique title/meta, OG image, JSON-LD
- **Lighthouse target**: 95+ across the board

## File structure

```text
src/
  routes/
    __root.tsx                  head, fonts, cursor, lenis provider
    index.tsx                   page composition
  components/
    canvas/
      Scene.tsx                 R3F Canvas + postprocessing
      Shard.tsx                 hero mesh with shader material
      shaders/
        shard.vert.glsl
        shard.frag.glsl
      Lights.tsx
      Environment.tsx
    ui/
      Loader.tsx
      Cursor.tsx
      Nav.tsx
      SplitText.tsx
      MagneticButton.tsx
      Marquee.tsx
    sections/
      Hero.tsx
      Manifesto.tsx
      Capabilities.tsx
      Showcase.tsx
      Contact.tsx
  lib/
    scroll.ts                   Lenis + ScrollTrigger wiring
    motion.ts                   GSAP timelines per section
    useReducedMotion.ts
  styles.css                    design tokens, fonts, base
```

## Design direction (will be confirmed via rendered options before build)

Once you approve this plan, I'll generate **3 rendered design directions** (locked to a 3D-centric brief) and you pick one. Likely flavors:

1. **Obsidian / Aurora** — near-black canvas, iridescent shard, Space Grotesk + Fraunces
2. **Paper / Ink** — off-white, ink-black shard, editorial serif, brutalist grid
3. **Vapor Chrome** — Y2K iridescence, chrome shard, mono display type

## What I need from you eventually (not blocking)

- The actual competition theme/prompt → I rewrite copy + retint palette
- Any required logo/assets → drop them in and I wire them in
- Deadline → so I can prioritize polish vs. scope

## Out of scope (for v1)

- Backend, auth, CMS — pure frontend
- Multi-page routing — single scroll page (judges grade one URL)
- Audio (can add after if the brief calls for it)

Approve and I'll generate the 3 design directions next.