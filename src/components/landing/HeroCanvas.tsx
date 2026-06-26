import { useEffect, useRef } from "react";

/**
 * Lightweight hero shader background — pure Canvas2D, no three.js.
 * Renders a slow generative gradient mesh. Cheap (one rAF, off when
 * tab hidden) and never blocks TTI; <500ms loader still applies.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onVis = () => { running = !document.hidden; if (running) tick(); };
    document.addEventListener("visibilitychange", onVis);

    const blobs = [
      { x: 0.25, y: 0.35, r: 0.55, c: "#FFC801", a: 0.42 },
      { x: 0.78, y: 0.55, r: 0.50, c: "#FF9932", a: 0.32 },
      { x: 0.55, y: 0.85, r: 0.48, c: "#114C5A", a: 0.85 },
      { x: 0.10, y: 0.85, r: 0.40, c: "#114C5A", a: 0.70 },
    ];

    const draw = (t: number) => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const ox = Math.sin(t * 0.0003 + i * 1.7) * 0.06;
        const oy = Math.cos(t * 0.00025 + i * 2.3) * 0.06;
        const cx = (b.x + ox) * w;
        const cy = (b.y + oy) * h;
        const rad = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, hexA(b.c, b.a));
        g.addColorStop(1, hexA(b.c, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = () => {
      if (!running) return;
      draw(performance.now());
      raf = reduced ? 0 : requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full opacity-90"
    />
  );
}

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}
