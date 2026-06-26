import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as FogExp2, l as PerspectiveCamera, m as ShaderMaterial, o as Mesh, p as Scene, r as Color, t as WebGLRenderer, u as PlaneGeometry } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HeroWaveGrid-s6TUcAqp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A volumetric 3D wireframe terrain using a custom ShaderMaterial
* on a dense PlaneGeometry.
*
* Performance:
*   - ShaderMaterial offloads vertex displacement (mountains) to GPU.
*   - 150x150 segments.
*   - Wireframe mode with additive blending.
*   - Pauses when tab is hidden.
*/
var GRID_SIZE = 100;
var SEGMENTS = 150;
function HeroWaveGrid() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const renderer = new WebGLRenderer({
			canvas,
			alpha: true,
			antialias: false,
			powerPreference: "high-performance"
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		renderer.setClearColor(0, 0);
		const scene = new Scene();
		const camera = new PerspectiveCamera(60, 1, .1, 200);
		camera.position.set(0, 5, 20);
		camera.lookAt(0, 0, 0);
		const geo = new PlaneGeometry(GRID_SIZE, GRID_SIZE, SEGMENTS, SEGMENTS);
		geo.rotateX(-Math.PI / 2);
		const material = new ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uColor: { value: new Color(440020) }
			},
			vertexShader: `
        uniform float uTime;
        varying float vElevation;
        
        // Simplex 2D noise helper
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          
          // Move the texture coordinate forward on Z to simulate endless flight
          vec2 noiseCoord = worldPos.xz * 0.15 + vec2(0.0, -uTime * 3.0);
          
          // Overlapping noise octaves for rolling mountains
          float elevation = snoise(noiseCoord) * 3.0;
          elevation += snoise(noiseCoord * 2.0) * 1.5;
          elevation += snoise(noiseCoord * 4.0) * 0.5;
          
          // Flatten the center valley for UI readability
          float valleyDist = abs(worldPos.x);
          float valleyMask = smoothstep(2.0, 15.0, valleyDist);
          elevation *= valleyMask;
          
          worldPos.y += elevation;
          vElevation = elevation;
          
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
			fragmentShader: `
        uniform vec3 uColor;
        varying float vElevation;
        
        void main() {
          // Brighten peaks
          float intensity = clamp(vElevation * 0.15 + 0.2, 0.0, 1.0);
          vec3 color = uColor * intensity;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
			wireframe: true,
			transparent: true,
			opacity: .35,
			blending: 2
		});
		const mesh = new Mesh(geo, material);
		scene.add(mesh);
		scene.fog = new FogExp2(198418, .025);
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
		function tick() {
			if (!running) return;
			const t = reduced ? 0 : performance.now() * .001;
			material.uniforms.uTime.value = t;
			renderer.render(scene, camera);
			raf = requestAnimationFrame(tick);
		}
		tick();
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			document.removeEventListener("visibilitychange", onVis);
			renderer.dispose();
			geo.dispose();
			material.dispose();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 size-full opacity-60"
	});
}
//#endregion
export { HeroWaveGrid as default };
