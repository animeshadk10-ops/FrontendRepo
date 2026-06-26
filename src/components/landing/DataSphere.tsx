import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────── */
/* Data Sphere — Interactive 3D Distorting Sphere                   */
/* ──────────────────────────────────────────────────────────────── */
/**
 * A continuously rotating icosahedron with real-time per-vertex
 * displacement driven by overlapping sine/cosine waves. Mouse
 * movement across the viewport creates subtle, reactive surface
 * distortion (tracked globally via window mousemove — no pointer
 * events needed on the canvas).
 *
 * Visual layers:
 *   1. Main sphere: MeshPhysicalMaterial (metallic, clearcoat)
 *   2. Wireframe overlay: low-poly IcosahedronGeometry for
 *      "data visualization" tech aesthetic
 *
 * Performance profile:
 *   - ~2562 vertices displaced per frame (IcosahedronGeometry detail=4)
 *   - Normals recomputed each frame for correct PBR reflections
 *   - DPR capped at 1.5, antialias on (single mesh — fast)
 *   - powerPreference: 'high-performance'
 *   - Pauses when tab hidden, respects prefers-reduced-motion
 *   - All GPU resources disposed on unmount
 *
 * MUST be loaded via React.lazy() with a ClientOnly gate.
 */

const RADIUS = 1.8;
const DETAIL = 4;
const WIREFRAME_DETAIL = 3;
const ROTATION_Y = 0.15;
const ROTATION_X = 0.08;
const MOUSE_LERP = 0.05;

export default function DataSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Mouse tracking (global — no pointer events on canvas) ── */
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    /* ── Scroll Velocity Tracking ── */
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      scrollVelocity += delta * 0.05; // Accumulate velocity
      lastScrollY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 5.5;

    /* ── Three-point lighting (warm/cool contrast) ── */
    const ambient = new THREE.AmbientLight(0x114c5a, 0.8);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0xffc801, 2, 20);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xff9932, 1, 15);
    rimLight.position.set(-3, -2, 3);
    scene.add(rimLight);

    const coolFill = new THREE.PointLight(0x114c5a, 0.8, 15);
    coolFill.position.set(0, -3, -3);
    scene.add(coolFill);

    /* ── Main sphere ── */
    const geo = new THREE.IcosahedronGeometry(RADIUS, DETAIL);
    const origPositions = new Float32Array(geo.attributes.position.array);

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x114c5a,
      metalness: 0.55,
      roughness: 0.28,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
      emissive: 0x0a2630,
      emissiveIntensity: 0.25,
    });
    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    /* ── Wireframe overlay (lower detail for visible hexagonal grid) ── */
    const wireGeo = new THREE.IcosahedronGeometry(RADIUS * 1.015, WIREFRAME_DETAIL);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffc801,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireframe);

    /* ── Resize ── */
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Visibility pause ── */
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVis);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ── Animation loop ── */
    let raf = 0;
    const posAttr = geo.attributes.position;
    const vertexCount = posAttr.count;

    function tick() {
      if (!running) return;
      const t = reduced ? 0 : performance.now() * 0.001;

      // Smooth mouse interpolation
      smooth.x += (mouse.x - smooth.x) * MOUSE_LERP;
      smooth.y += (mouse.y - smooth.y) * MOUSE_LERP;

      // Scroll physics dampening (friction)
      scrollVelocity *= 0.92;

      // Rotate sphere and wireframe at different speeds
      sphere.rotation.y = t * ROTATION_Y;
      sphere.rotation.x = t * ROTATION_X;
      wireframe.rotation.y = -t * ROTATION_Y * 0.7;
      wireframe.rotation.x = t * ROTATION_X * 0.75;

      // Per-vertex displacement
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3;
        const ox = origPositions[i3];
        const oy = origPositions[i3 + 1];
        const oz = origPositions[i3 + 2];

        // Normalized direction from center
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / len;
        const ny = oy / len;
        const nz = oz / len;

        // Multi-octave wave displacement (organic distortion)
        const d1 =
          Math.sin(nx * 4.0 + t * 0.5) *
          Math.cos(ny * 3.0 + t * 0.4) *
          0.06;
        const d2 =
          Math.sin(nz * 5.0 + t * 0.3) *
          Math.sin(nx * 2.0 - t * 0.6) *
          0.04;
        const d3 = Math.cos((nx + ny) * 3.5 + t * 0.7) * 0.035;

        // Mouse-reactive surface tension
        const mx =
          Math.sin(nx * smooth.x * 4 + t) * 0.04 +
          Math.cos(ny * smooth.y * 4 + t) * 0.04;

        // Scroll velocity distortion (stretches along y axis mostly)
        const scrollDistort = Math.sin(ny * 6.0 + t * 2.0) * Math.abs(scrollVelocity) * 0.02;

        const scale = 1 + d1 + d2 + d3 + mx + scrollDistort;

        positions[i3] = ox * scale;
        positions[i3 + 1] = oy * scale;
        positions[i3 + 2] = oz * scale;
      }

      posAttr.needsUpdate = true;
      geo.computeVertexNormals();

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none size-full"
    />
  );
}
