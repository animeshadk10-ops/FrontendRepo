import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as IcosahedronGeometry, c as MeshPhysicalMaterial, d as PointLight, f as SRGBColorSpace, l as PerspectiveCamera, n as AmbientLight, o as Mesh, p as Scene, s as MeshBasicMaterial, t as WebGLRenderer } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DataSphere-DVIhhC6M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var RADIUS = 1.8;
var DETAIL = 4;
var WIREFRAME_DETAIL = 3;
var ROTATION_Y = .15;
var ROTATION_X = .08;
var MOUSE_LERP = .05;
function DataSphere() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const mouse = {
			x: 0,
			y: 0
		};
		const smooth = {
			x: 0,
			y: 0
		};
		const onMove = (e) => {
			mouse.x = e.clientX / window.innerWidth * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		let lastScrollY = window.scrollY;
		let scrollVelocity = 0;
		const onScroll = () => {
			const currentY = window.scrollY;
			const delta = currentY - lastScrollY;
			scrollVelocity += delta * .05;
			lastScrollY = currentY;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		const renderer = new WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
			powerPreference: "high-performance"
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		renderer.setClearColor(0, 0);
		renderer.outputColorSpace = SRGBColorSpace;
		const scene = new Scene();
		const camera = new PerspectiveCamera(45, 1, .1, 50);
		camera.position.z = 5.5;
		const ambient = new AmbientLight(1133658, .8);
		scene.add(ambient);
		const keyLight = new PointLight(16762881, 2, 20);
		keyLight.position.set(3, 3, 4);
		scene.add(keyLight);
		const rimLight = new PointLight(16750898, 1, 15);
		rimLight.position.set(-3, -2, 3);
		scene.add(rimLight);
		const coolFill = new PointLight(1133658, .8, 15);
		coolFill.position.set(0, -3, -3);
		scene.add(coolFill);
		const geo = new IcosahedronGeometry(RADIUS, DETAIL);
		const origPositions = new Float32Array(geo.attributes.position.array);
		const mat = new MeshPhysicalMaterial({
			color: 1133658,
			metalness: .55,
			roughness: .28,
			clearcoat: .7,
			clearcoatRoughness: .15,
			emissive: 665136,
			emissiveIntensity: .25
		});
		const sphere = new Mesh(geo, mat);
		scene.add(sphere);
		const wireGeo = new IcosahedronGeometry(RADIUS * 1.015, WIREFRAME_DETAIL);
		const wireMat = new MeshBasicMaterial({
			color: 16762881,
			wireframe: true,
			transparent: true,
			opacity: .07
		});
		const wireframe = new Mesh(wireGeo, wireMat);
		scene.add(wireframe);
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
		let running = true;
		const onVis = () => {
			running = !document.hidden;
			if (running) raf = requestAnimationFrame(tick);
		};
		document.addEventListener("visibilitychange", onVis);
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let raf = 0;
		const posAttr = geo.attributes.position;
		const vertexCount = posAttr.count;
		function tick() {
			if (!running) return;
			const t = reduced ? 0 : performance.now() * .001;
			smooth.x += (mouse.x - smooth.x) * MOUSE_LERP;
			smooth.y += (mouse.y - smooth.y) * MOUSE_LERP;
			scrollVelocity *= .92;
			sphere.rotation.y = t * ROTATION_Y;
			sphere.rotation.x = t * ROTATION_X;
			wireframe.rotation.y = -t * ROTATION_Y * .7;
			wireframe.rotation.x = t * ROTATION_X * .75;
			const positions = posAttr.array;
			for (let i = 0; i < vertexCount; i++) {
				const i3 = i * 3;
				const ox = origPositions[i3];
				const oy = origPositions[i3 + 1];
				const oz = origPositions[i3 + 2];
				const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
				const nx = ox / len;
				const ny = oy / len;
				const nz = oz / len;
				const d1 = Math.sin(nx * 4 + t * .5) * Math.cos(ny * 3 + t * .4) * .06;
				const d2 = Math.sin(nz * 5 + t * .3) * Math.sin(nx * 2 - t * .6) * .04;
				const d3 = Math.cos((nx + ny) * 3.5 + t * .7) * .035;
				const mx = Math.sin(nx * smooth.x * 4 + t) * .04 + Math.cos(ny * smooth.y * 4 + t) * .04;
				const scrollDistort = Math.sin(ny * 6 + t * 2) * Math.abs(scrollVelocity) * .02;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": true,
		className: "pointer-events-none size-full"
	});
}
//#endregion
export { DataSphere as default };
