import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B1-VyRCP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useInView(options) {
	const ref = (0, import_react.useRef)(null);
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.unobserve(el);
			}
		}, {
			rootMargin: "0px",
			threshold: .15,
			...options
		});
		observer.observe(el);
		return () => {
			if (el) observer.unobserve(el);
		};
	}, [options]);
	return {
		ref,
		isVisible
	};
}
/**
* Zero-dependency audio synthesizer for micro-interactions.
* Creates procedural sounds so no assets are downloaded.
* AudioContext is initialized on first user interaction to
* comply with browser autoplay policies.
*/
var ctx = null;
function initAudio() {
	if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
	if (ctx.state === "suspended") ctx.resume();
}
if (typeof window !== "undefined") window.addEventListener("click", initAudio, { once: true });
function playTick() {
	if (!ctx) return;
	const t = ctx.currentTime;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = "sine";
	osc.frequency.setValueAtTime(60, t);
	osc.frequency.exponentialRampToValueAtTime(30, t + .05);
	gain.gain.setValueAtTime(0, t);
	gain.gain.linearRampToValueAtTime(.05, t + .01);
	gain.gain.exponentialRampToValueAtTime(.001, t + .05);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(t);
	osc.stop(t + .05);
}
function playClick() {
	if (!ctx) return;
	const t = ctx.currentTime;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = "triangle";
	osc.frequency.setValueAtTime(800, t);
	osc.frequency.exponentialRampToValueAtTime(100, t + .04);
	gain.gain.setValueAtTime(0, t);
	gain.gain.linearRampToValueAtTime(.1, t + .005);
	gain.gain.exponentialRampToValueAtTime(.001, t + .04);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(t);
	osc.stop(t + .04);
}
var cube_16_solid_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='512'%20height='512'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill='%23000000'%20d='M8.372%201.349a.75.75%200%200%200-.744%200l-4.81%202.748L8%207.131l5.182-3.034zM14%205.357L8.75%208.43v6.005l4.872-2.784A.75.75%200%200%200%2014%2011zm-6.75%209.078V8.43L2%205.357V11c0%20.27.144.518.378.651z'/%3e%3c/svg%3e";
var chart_pie_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='256'%20height='256'%20viewBox='0%200%2024%2024'%20fill='%23000000'%3e%3cg%20fill='none'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.5'%3e%3cpath%20d='M10.5%206a7.5%207.5%200%201%200%207.5%207.5h-7.5V6Z'/%3e%3cpath%20d='M13.5%2010.5H21A7.5%207.5%200%200%200%2013.5%203v7.5Z'/%3e%3c/g%3e%3c/svg%3e";
var arrow_trending_up_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='512'%20height='512'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='none'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.5'%20d='M2.25%2018L9%2011.25l4.306%204.307a11.95%2011.95%200%200%201%205.814-5.519l2.74-1.22m0%200l-5.94-2.28m5.94%202.28l-2.28%205.941'/%3e%3c/svg%3e";
var cog_8_tooth_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='256'%20height='256'%20viewBox='0%200%2024%2024'%20fill='%23000000'%3e%3cg%20fill='none'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.5'%3e%3cpath%20d='M10.343%203.94c.09-.542.56-.94%201.11-.94h1.093c.55%200%201.02.398%201.11.94l.149.894c.07.424.384.764.78.93c.398.164.855.142%201.205-.108l.737-.527a1.125%201.125%200%200%201%201.45.12l.773.774c.39.389.44%201.002.12%201.45l-.527.737c-.25.35-.272.806-.107%201.204c.165.397.505.71.93.78l.893.15c.543.09.94.56.94%201.109v1.094c0%20.55-.397%201.02-.94%201.11l-.893.149c-.425.07-.765.383-.93.78c-.165.398-.143.854.107%201.204l.527.738c.32.447.269%201.06-.12%201.45l-.774.773a1.125%201.125%200%200%201-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107c-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55%200-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93c-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125%201.125%200%200%201-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204c-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78c.165-.398.143-.854-.107-1.204l-.527-.738a1.125%201.125%200%200%201%20.12-1.45l.773-.773a1.125%201.125%200%200%201%201.45-.12l.737.527c.35.25.807.272%201.204.107c.397-.165.71-.505.78-.929l.15-.894Z'/%3e%3cpath%20d='M15%2012a3%203%200%201%201-6%200a3%203%200%200%201%206%200Z'/%3e%3c/g%3e%3c/svg%3e";
var arrow_path_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='256'%20height='256'%20viewBox='0%200%2024%2024'%20fill='%23000000'%3e%3cpath%20fill='none'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.5'%20d='M16.023%209.348h4.992v-.001M2.985%2019.644v-4.992m0%200h4.992m-4.993%200l3.181%203.183a8.25%208.25%200%200%200%2013.803-3.7M4.031%209.865a8.25%208.25%200%200%201%2013.803-3.7l3.181%203.182m0-4.991v4.99'/%3e%3c/svg%3e";
var link_solid_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='256'%20height='256'%20viewBox='0%200%2024%2024'%20fill='%23000000'%3e%3cpath%20fill='%23000000'%20fill-rule='evenodd'%20d='M19.902%204.098a3.75%203.75%200%200%200-5.304%200l-4.5%204.5a3.75%203.75%200%200%200%201.035%206.037a.75.75%200%200%201-.646%201.353a5.25%205.25%200%200%201-1.449-8.45l4.5-4.5a5.25%205.25%200%201%201%207.424%207.424l-1.757%201.757a.75.75%200%201%201-1.06-1.06l1.757-1.757a3.75%203.75%200%200%200%200-5.304Zm-7.389%204.267a.75.75%200%200%201%201-.353a5.25%205.25%200%200%201%201.449%208.45l-4.5%204.5a5.25%205.25%200%201%201-7.424-7.424l1.757-1.757a.75.75%200%201%201%201.06%201.06l-1.757%201.757a3.75%203.75%200%201%200%205.304%205.304l4.5-4.5a3.75%203.75%200%200%200-1.035-6.037a.75.75%200%200%201-.354-1Z'%20clip-rule='evenodd'/%3e%3c/svg%3e";
var chevron_down_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='512'%20height='512'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='none'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.5'%20d='m19.5%208.25l-7.5%207.5l-7.5-7.5'/%3e%3c/svg%3e";
var NODES = [
	{
		icon: cube_16_solid_default,
		label: "Composable agents",
		title: "Drop-in nodes that compose into pipelines",
		body: "Each agent is a typed contract — chain them into deterministic graphs with branching, retries, and audit trails baked in."
	},
	{
		icon: chart_pie_default,
		label: "Observability",
		title: "Trace every token across every run",
		body: "Spans, costs, latencies, and prompt diffs streamed live. Replay any production failure with one click."
	},
	{
		icon: arrow_trending_up_default,
		label: "Adaptive routing",
		title: "Cheapest model that hits your SLO",
		body: "Router benchmarks providers per task, fails over silently, and learns your accuracy bar over time."
	},
	{
		icon: cog_8_tooth_default,
		label: "Policy engine",
		title: "Guardrails as code, not vibes",
		body: "PII scrubbing, schema validation, and tool-use ACLs evaluated before any external call leaves the boundary."
	},
	{
		icon: arrow_path_default,
		label: "Self-healing runs",
		title: "Retries that understand the failure",
		body: "Classify, backoff, reroute. Production agents stay live through provider outages and rate-limit waves."
	},
	{
		icon: link_solid_default,
		label: "200+ integrations",
		title: "Wire into the stack you already own",
		body: "First-class connectors for Postgres, Snowflake, Slack, Stripe, Linear, S3, and the long tail through generic HTTP + OAuth."
	}
];
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
function BentoFeatures() {
	const [isMobile, setIsMobile] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const sync = () => {
			if (!document.startViewTransition) setIsMobile(mq.matches);
			else document.startViewTransition(() => {
				setIsMobile(mq.matches);
			});
		};
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "features",
		className: "relative overflow-hidden border-t border-line bg-noir px-6 py-24 sm:py-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -left-40 top-1/3 size-125 rounded-full bg-forsythia/6 blur-[120px]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -right-32 bottom-1/4 size-100 rounded-full bg-saffron/4 blur-[100px]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs uppercase tracking-[0.4em] text-forsythia",
						children: "[ 02 / Capabilities ]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 max-w-2xl text-4xl font-medium leading-tight sm:text-5xl",
						children: "A spine for production-grade agents."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-arctic/70",
						children: "Six primitives. Composed, they cover the full lifecycle from prototype to incident postmortem."
					})]
				}), isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileAccordion, {
					active,
					setActive
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopBento, {
					active,
					setActive
				})]
			})
		]
	});
}
/**
* Zero dependencies. All transitions are native CSS via the
* `.feature-tx` class (360ms ease-in-out). Entrance animations
* use the Web Animations API (WAAPI) with staggered delays.
*
* Glassmorphism: backdrop-blur-xl + gradient overlays + golden
* border glow on active cards. All via Tailwind utility classes.
*/
function DesktopBento({ active, setActive }) {
	const gridRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const grid = gridRef.current;
		if (!grid) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const cards = grid.children;
		const anims = Array.from(cards).map((card, i) => card.animate([{
			opacity: 0,
			transform: "translateY(24px) scale(0.97)"
		}, {
			opacity: 1,
			transform: "translateY(0) scale(1)"
		}], {
			duration: reduced ? 1 : 420,
			delay: reduced ? 0 : i * 70,
			easing: "cubic-bezier(0.22, 1, 0.36, 1)",
			fill: "both"
		}));
		return () => anims.forEach((a) => a.cancel());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: gridRef,
		className: "group/bento grid grid-cols-6 gap-4 auto-rows-[minmax(160px,auto)]",
		children: NODES.map((n, i) => {
			const isActive = active === i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onMouseEnter: () => {
					setActive(i);
					playTick();
				},
				onFocus: () => setActive(i),
				"aria-label": n.title,
				style: { viewTransitionName: isActive ? "feature-morph" : "none" },
				className: `feature-card group feature-tx relative overflow-hidden rounded-3xl border p-7 text-left backdrop-blur-xl bg-white/[0.03] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-200 group-has-[.feature-card:hover]/bento:[&:not(:hover)]:opacity-40 ${bentoSpan(i)} ${isActive ? "border-forsythia/50 -translate-y-1 shadow-[0_12px_40px_-12px_rgba(6,182,212,0.4)]" : "border-white/[0.08] hover:border-forsythia/50"}`,
				children: [
					i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -right-4 -top-4 opacity-50 feature-tx group-hover:opacity-100 group-hover:scale-105 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "200",
							height: "200",
							viewBox: "0 0 100 100",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "50",
									cy: "50",
									r: "40",
									stroke: "var(--color-forsythia)",
									strokeWidth: "0.5",
									strokeDasharray: "2 4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "50",
									cy: "50",
									r: "25",
									stroke: "var(--color-saffron)",
									strokeWidth: "1",
									opacity: "0.8"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22",
									stroke: "var(--color-forsythia)",
									strokeWidth: "0.5",
									opacity: "0.4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "50",
									cy: "50",
									r: "4",
									fill: "var(--color-arctic)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "78",
									cy: "22",
									r: "2",
									fill: "var(--color-saffron)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "22",
									cy: "78",
									r: "2",
									fill: "var(--color-forsythia)"
								})
							]
						})
					}),
					i === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -bottom-6 -right-6 opacity-30 feature-tx group-hover:opacity-80 group-hover:-translate-y-2 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "220",
							height: "180",
							viewBox: "0 0 100 100",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M10 90 L30 60 L50 70 L80 20",
									stroke: "var(--color-saffron)",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M10 90 L30 60 L50 70 L80 20 L80 90 Z",
									fill: "url(#grad1)",
									opacity: "0.2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "grad1",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--color-saffron)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "transparent"
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "30",
									cy: "60",
									r: "3",
									fill: "var(--color-forsythia)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "50",
									cy: "70",
									r: "3",
									fill: "var(--color-forsythia)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "80",
									cy: "20",
									r: "4",
									fill: "var(--color-arctic)",
									shadow: "0 0 10px #fff"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid size-9 place-items-center rounded-lg feature-tx ${isActive ? "bg-forsythia shadow-[0_0_16px_rgba(255,200,1,0.35)]" : "bg-arctic/6 backdrop-blur-sm"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: n.icon,
										alt: "",
										"aria-hidden": true,
										className: `size-4 ${isActive ? "" : "filter-[invert(1)]"}`
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] uppercase tracking-widest text-mute",
									children: n.label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-medium leading-snug text-arctic",
								children: n.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-arctic/65",
								children: n.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: `pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-forsythia/15 blur-2xl feature-tx ${isActive ? "opacity-100" : "opacity-0"}`
							})
						]
					})
				]
			}, n.label);
		})
	});
}
/** Asymmetric bento layout: [3,3] → [2,2,2] → [6] */
function bentoSpan(i) {
	return [
		"col-span-3",
		"col-span-3",
		"col-span-2",
		"col-span-2",
		"col-span-2",
		"col-span-6"
	][i] ?? "col-span-3";
}
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
function MobileAccordion({ active, setActive }) {
	const listRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const list = listRef.current;
		if (!list) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const items = list.children;
		const anims = Array.from(items).map((item, i) => item.animate([{
			opacity: 0,
			transform: "translateY(16px)"
		}, {
			opacity: 1,
			transform: "translateY(0)"
		}], {
			duration: reduced ? 1 : 380,
			delay: reduced ? 0 : i * 50,
			easing: "cubic-bezier(0.22, 1, 0.36, 1)",
			fill: "both"
		}));
		return () => anims.forEach((a) => a.cancel());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		ref: listRef,
		className: "border-t border-line",
		children: NODES.map((n, i) => {
			const open = active === i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				style: { viewTransitionName: open ? "feature-morph" : "none" },
				className: `border-b border-line feature-tx ${open ? "bg-arctic/2.5 backdrop-blur-lg" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActive(open ? -1 : i),
					onMouseEnter: playTick,
					"aria-expanded": open,
					className: "flex w-full items-center justify-between gap-4 px-2 py-5 text-left hover-tx",
					style: { minHeight: "56px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `grid size-10 shrink-0 place-items-center rounded-lg feature-tx ${open ? "bg-forsythia shadow-[0_0_12px_rgba(255,200,1,0.3)]" : "bg-arctic/6 backdrop-blur-sm"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: n.icon,
								alt: "",
								"aria-hidden": true,
								className: `size-4 ${open ? "" : "filter-[invert(1)]"}`
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-mono text-[10px] uppercase tracking-widest text-mute",
							children: n.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-base font-medium text-arctic",
							children: n.title
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: chevron_down_default,
						alt: "",
						"aria-hidden": true,
						className: "size-4 shrink-0 filter-[invert(1)] feature-tx",
						style: { transform: open ? "rotate(180deg)" : "rotate(0deg)" }
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid struct-tx",
					style: { gridTemplateRows: open ? "1fr" : "0fr" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pb-6 pl-15 pr-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-arctic/70",
								children: n.body
							})
						})
					})
				})]
			}, n.label);
		})
	});
}
/**
* Every dimension of pricing is factored into its own axis:
*   1. Tier axis     → base rate per plan (abstract USD units)
*   2. Currency axis → regional tariff multiplier + formatting
*   3. Cycle axis    → discount multiplier (annual = 0.80)
*
* To add a new currency, add ONE entry to `tariffs`.
* To add a new tier, add ONE entry to `tiers`.
* To change the annual discount, update ONE scalar.
*/
var PRICING_MATRIX = {
	/** Billing cycle discount multipliers */
	cycles: {
		monthly: {
			discount: 1,
			label: "Monthly",
			suffix: "/mo"
		},
		annual: {
			discount: .8,
			label: "Annual",
			suffix: "/mo · billed yearly"
		}
	},
	/** Annual savings percentage — derived from discount for display */
	annualSavingsPercent: 20,
	/** Base monthly rate per tier — abstract USD units before tariff */
	tiers: {
		starter: {
			base: 19,
			label: "Starter",
			tagline: "For solo operators wiring their first agents.",
			cta: "Start Starter",
			highlighted: false
		},
		growth: {
			base: 79,
			label: "Growth",
			tagline: "For teams shipping production automations.",
			cta: "Start Growth",
			highlighted: true
		},
		scale: {
			base: 249,
			label: "Scale",
			tagline: "For enterprises with regulated data planes.",
			cta: "Start Scale",
			highlighted: false
		}
	},
	/** Regional tariff multipliers + locale formatting config */
	tariffs: {
		USD: {
			factor: 1,
			symbol: "$",
			locale: "en-US",
			code: "USD"
		},
		EUR: {
			factor: .93,
			symbol: "€",
			locale: "de-DE",
			code: "EUR"
		},
		INR: {
			factor: 83.2,
			symbol: "₹",
			locale: "en-IN",
			code: "INR"
		}
	},
	/** Feature lists per tier — also driven from config, not hardcoded in JSX */
	features: {
		starter: [
			"5 active automations",
			"1,000 task runs / month",
			"Community support",
			"Standard model routing"
		],
		growth: [
			"Unlimited automations",
			"50,000 task runs / month",
			"Priority email + chat",
			"Custom model fine-tunes",
			"Versioned deploys"
		],
		scale: [
			"Everything in Growth",
			"1M+ task runs / month",
			"Dedicated VPC & SOC 2",
			"24/7 incident response",
			"On-prem model gateway"
		]
	}
};
/** List of tier keys for iteration — avoids repeating in UI code */
var TIER_KEYS = [
	"starter",
	"growth",
	"scale"
];
/** List of currencies for iteration */
var CURRENCIES = [
	"USD",
	"EUR",
	"INR"
];
/** List of cycles for iteration */
var CYCLES = ["monthly", "annual"];
var listeners = /* @__PURE__ */ new Set();
var state = {
	cycle: "monthly",
	currency: "USD"
};
var pricingStore = {
	get: () => state,
	set: (next) => {
		const prev = state;
		state = {
			...state,
			...next
		};
		if (prev.cycle !== state.cycle || prev.currency !== state.currency) for (const l of listeners) l(state);
	},
	subscribe: (l) => {
		listeners.add(l);
		return () => {
			listeners.delete(l);
		};
	}
};
function computePrice(tier, s = state) {
	const { base } = PRICING_MATRIX.tiers[tier];
	const tariff = PRICING_MATRIX.tariffs[s.currency];
	const { discount } = PRICING_MATRIX.cycles[s.cycle];
	return base * tariff.factor * discount;
}
function formatPrice(value, currency) {
	const t = PRICING_MATRIX.tariffs[currency];
	const rounded = value >= 100 ? Math.round(value) : Math.round(value * 100) / 100;
	const formatted = new Intl.NumberFormat(t.locale, {
		maximumFractionDigits: rounded >= 100 ? 0 : 2,
		minimumFractionDigits: 0
	}).format(rounded);
	return `${t.symbol}${formatted}`;
}
/** Get the billing suffix string for a cycle */
function cycleSuffix(cycle) {
	return PRICING_MATRIX.cycles[cycle].suffix;
}
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
function Price({ tier }) {
	const priceRef = (0, import_react.useRef)(null);
	const suffixRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const write = (s) => {
			if (priceRef.current) {
				const value = computePrice(tier, s);
				priceRef.current.textContent = formatPrice(value, s.currency);
			}
			if (suffixRef.current) suffixRef.current.textContent = cycleSuffix(s.cycle);
		};
		write(pricingStore.get());
		return pricingStore.subscribe(write);
	}, [tier]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-baseline gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			ref: priceRef,
			className: "font-mono text-5xl font-medium tracking-tight tabular-nums text-arctic"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			ref: suffixRef,
			className: "font-mono text-xs text-mute uppercase tracking-widest"
		})]
	});
}
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
function PricingControls() {
	const [cycle, setCycle] = (0, import_react.useState)(pricingStore.get().cycle);
	const [currency, setCurrency] = (0, import_react.useState)(pricingStore.get().currency);
	const thumbRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		pricingStore.set({
			cycle,
			currency
		});
	}, [cycle, currency]);
	const handleCycleChange = (0, import_react.useCallback)((c) => {
		setCycle(c);
		playClick();
	}, []);
	const handleCurrencyChange = (0, import_react.useCallback)((c) => {
		setCurrency(c);
		playClick();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-center gap-3 sm:gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "tablist",
			"aria-label": "Billing cycle",
			className: "pricing-toggle-group relative inline-flex rounded-full border border-line bg-noir-soft/40 p-1 font-mono text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				ref: thumbRef,
				"aria-hidden": true,
				className: "pricing-toggle-thumb absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-forsythia",
				style: {
					left: cycle === "monthly" ? "4px" : "calc(50% + 0px)",
					transition: "left 200ms var(--ease-out)"
				}
			}), CYCLES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				role: "tab",
				"aria-selected": cycle === c,
				onClick: () => handleCycleChange(c),
				className: `pricing-cycle-btn relative z-10 px-5 py-2 uppercase tracking-widest hover-tx ${cycle === c ? "text-noir" : "text-arctic/70 hover:text-arctic"}`,
				children: [PRICING_MATRIX.cycles[c].label, c === "annual" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `ml-2 rounded-sm px-1.5 py-0.5 text-[10px] hover-tx ${cycle === "annual" ? "bg-noir/15 text-noir" : "bg-forsythia/15 text-forsythia"}`,
					children: [
						"−",
						PRICING_MATRIX.annualSavingsPercent,
						"%"
					]
				})]
			}, c))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "radiogroup",
			"aria-label": "Currency",
			className: "pricing-toggle-group inline-flex rounded-full border border-line bg-noir-soft/40 p-1 font-mono text-xs",
			children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				role: "radio",
				"aria-checked": currency === c,
				onClick: () => handleCurrencyChange(c),
				className: `pricing-currency-btn rounded-full px-4 py-2 uppercase tracking-widest hover-tx ${currency === c ? "bg-arctic text-noir" : "text-arctic/70 hover:text-arctic"}`,
				children: c
			}, c))
		})]
	});
}
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
var TierCard = (0, import_react.memo)(function TierCard({ tier }) {
	const meta = PRICING_MATRIX.tiers[tier];
	const features = PRICING_MATRIX.features[tier];
	const highlighted = meta.highlighted;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `card relative flex flex-col p-7 hover-tx ${highlighted ? "border-forsythia/40 shadow-[0_0_0_1px_rgba(255,200,1,0.18),0_30px_80px_-40px_rgba(255,200,1,0.35)]" : ""}`,
		children: [
			highlighted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -top-3 right-6 rounded-full bg-forsythia px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-noir",
				children: "Most picked"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-mono text-sm uppercase tracking-[0.3em] text-mute",
					children: meta.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm text-arctic/70",
					children: meta.tagline
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { tier })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3 text-sm",
				children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3 text-arctic/85",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "mt-2 inline-block size-1.5 rounded-full bg-forsythia"
					}), f]
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `mt-8 inline-flex h-11 items-center justify-center rounded-full font-mono text-xs uppercase tracking-widest hover-tx ${highlighted ? "bg-forsythia text-noir hover:brightness-95" : "border border-line-strong text-arctic hover:border-forsythia hover:text-forsythia"}`,
				children: meta.cta
			})
		]
	});
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
function PricingSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "border-t border-line bg-noir px-6 py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mx-auto mb-12 max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs uppercase tracking-[0.4em] text-forsythia",
							children: "[ 03 / Pricing matrix ]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 text-4xl font-medium leading-tight sm:text-5xl",
							children: "Priced for the run-rate, not the seat count."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-arctic/70",
							children: "Toggle billing cycle and currency — values recompute against a tariff matrix without re-rendering the surrounding layout."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingControls, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: TIER_KEYS.map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierCard, { tier }, tier))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-10 text-center font-mono text-[11px] uppercase tracking-widest text-mute",
					children: [
						"base × tariff(",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-arctic",
							children: "currency"
						}),
						") × discount(",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-arctic",
							children: "cycle"
						}),
						") — 0 hardcoded values"
					]
				})
			]
		})
	});
}
var search_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='512'%20height='512'%20viewBox='0%200%2020%2020'%3e%3cpath%20fill='%23000000'%20d='M12.9%2014.32a8%208%200%201%201%201.41-1.41l5.35%205.33l-1.42%201.42l-5.33-5.34zM8%2014A6%206%200%201%200%208%202a6%206%200%200%200%200%2012z'/%3e%3c/svg%3e";
var chevron_right_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='512'%20height='512'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='none'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.5'%20d='m8.25%204.5l7.5%207.5l-7.5%207.5'/%3e%3c/svg%3e";
var HeroWaveGrid = (0, import_react.lazy)(() => import("./HeroWaveGrid-s6TUcAqp.mjs"));
var DataSphere = (0, import_react.lazy)(() => import("./DataSphere-DVIhhC6M.mjs"));
/** Client-only gate — prevents SSR execution of WebGL code */
function ClientOnly({ children }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/** Helper component to wrap elements with scroll animations */
function InView({ children, delay = 0, className = "" }) {
	const { ref, isVisible } = useInView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: `scroll-fade-up ${isVisible ? "scroll-visible" : ""} ${className}`,
		style: { transitionDelay: `${delay}ms` },
		children
	});
}
/**
* Sentient Boot Sequence (450ms)
* Violently shatters from a terminal view into the UI using WAAPI,
* strictly honoring the < 500ms constraint.
*/
function Loader() {
	const ref = (0, import_react.useRef)(null);
	const textRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || !textRef.current) return;
		const anim = el.animate([{
			opacity: 1,
			visibility: "visible",
			transform: "scale(1)"
		}, {
			opacity: 0,
			visibility: "hidden",
			transform: "scale(1.1) translateY(-20px)"
		}], {
			duration: 50,
			delay: 400,
			easing: "cubic-bezier(0.22, 1, 0.36, 1)",
			fill: "forwards"
		});
		return () => anim.cancel();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"aria-hidden": true,
		className: "fixed inset-0 z-[100] flex flex-col items-start justify-end bg-noir p-6 font-mono text-[10px] uppercase tracking-widest text-forsythia",
		style: { contain: "strict" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: textRef,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "opacity-60",
					children: "SYSTEM KERNEL 4.02 // NODAL.AI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "INITIALIZING NEURAL WEIGHTS... [OK]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "MOUNTING VIRTUAL DOM... [OK]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-arctic",
					children: "WAITING FOR HANDSHAKE..."
				})
			]
		})
	});
}
function Header() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed top-0 left-0 right-0 z-40 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-2 hover-tx hover:opacity-80",
					onMouseEnter: playTick,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cube_16_solid_default,
						alt: "",
						"aria-hidden": true,
						className: "size-5 [filter:invert(85%)_sepia(54%)_saturate(2476%)_hue-rotate(1deg)_brightness(105%)_contrast(101%)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-sm font-medium tracking-wider text-arctic",
						children: ["nodal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-forsythia",
							children: ".ai"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-arctic/70 md:flex",
					"aria-label": "Primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "hover-tx hover:text-arctic",
							onMouseEnter: playTick,
							children: "Capabilities"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pricing",
							className: "hover-tx hover:text-arctic",
							onMouseEnter: playTick,
							children: "Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#proof",
							className: "hover-tx hover:text-arctic",
							onMouseEnter: playTick,
							children: "Customers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#faq",
							className: "hover-tx hover:text-arctic",
							onMouseEnter: playTick,
							children: "FAQ"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Search",
						className: "hover-glow grid size-9 place-items-center rounded-full border border-line hover:border-line-strong",
						onMouseEnter: playTick,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: search_default,
							alt: "",
							"aria-hidden": true,
							className: "size-4 filter-[invert(1)]"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#pricing",
						onMouseEnter: playTick,
						className: "hover-glow inline-flex h-9 items-center gap-2 rounded-full bg-forsythia px-4 font-mono text-[11px] uppercase tracking-widest text-noir hover:brightness-95",
						children: ["Start free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: chevron_right_default,
							alt: "",
							"aria-hidden": true,
							className: "size-3.5"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hair h-px w-full" })]
	});
}
function Hero() {
	const ctaRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const track = () => {
			const el = ctaRef.current;
			if (el) {
				const rect = el.getBoundingClientRect();
				const x = rect.left + rect.width / 2;
				const y = rect.top + rect.height / 2;
				window.dispatchEvent(new CustomEvent("cta-move", { detail: {
					x,
					y
				} }));
			}
			raf = requestAnimationFrame(track);
		};
		track();
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative min-h-[100dvh] overflow-hidden bg-noir pt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 top-1/4 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-saffron/40 via-forsythia/10 to-transparent pointer-events-none z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroWaveGrid, {})
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-noir via-noir/90 to-transparent z-10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute right-[2%] top-1/2 z-10 hidden -translate-y-[45%] opacity-50 md:block",
				style: {
					width: "min(42vw, 520px)",
					aspectRatio: "1"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataSphere, {})
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-6 top-20 font-mono text-[10px] uppercase tracking-widest text-mute enter-fade delay-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "SYS · NODAL.RUNTIME" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "v 4.02 / mainnet" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute right-6 top-20 text-right font-mono text-[10px] uppercase tracking-widest text-mute enter-fade delay-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "UPTIME · 99.998%" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-forsythia",
						children: "● live"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-6 pb-24 pt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "enter-rise delay-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mb-4 inline-flex items-center gap-2 rounded-full border border-forsythia/30 bg-forsythia/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-forsythia backdrop-blur-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-forsythia" }), "V2.0 is live"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "enter-rise delay-2 mt-6 max-w-5xl text-balance text-5xl sm:text-6xl md:text-8xl font-black leading-[1.1] backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl px-6 py-6 sm:px-12 sm:py-8 shadow-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500",
							children: "POWER YOUR FUTURE WITH AI"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "enter-rise delay-2 mt-8 max-w-xl text-lg text-arctic/75",
						children: "Nodal turns brittle prompts into observable, versioned agents — wired into your data, your tools, and your incident channel. From prototype to production in an afternoon."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "enter-rise delay-3 mt-10 flex flex-col sm:flex-row flex-wrap items-center gap-4 sm:gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							ref: ctaRef,
							href: "#pricing",
							onMouseEnter: playTick,
							className: "hover:scale-[1.05] transition-all duration-150 ease-out flex w-full sm:w-auto h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-700 shadow-[0_0_25px_rgba(6,182,212,0.6)] px-8 font-mono text-sm font-bold uppercase tracking-widest text-white hover:brightness-110",
							children: ["BUILD A WORKFLOW", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: chevron_right_default,
								alt: "",
								"aria-hidden": true,
								className: "size-4 filter-[invert(1)]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							onMouseEnter: playTick,
							className: "transition-all duration-150 ease-out flex w-full sm:w-auto h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 font-mono text-sm uppercase tracking-widest text-white hover:bg-white/10",
							children: "SEE THE ARCHITECTURE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "enter-rise delay-4 mt-16 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-4",
						children: [
							["12.4M", "runs / day"],
							["38ms", "p50 routing"],
							["230+", "integrations"],
							["SOC 2", "type II"]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-2xl text-arctic tabular-nums",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-mute",
							children: v
						})] }, k))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-mute enter-fade delay-5",
				children: "scroll ↓"
			})
		]
	});
}
function Marquee() {
	const items = [
		"composable agents",
		"observable runs",
		"policy-as-code",
		"tariff-aware routing",
		"self-healing retries",
		"200+ integrations"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border-y border-line bg-noir-soft/30 py-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-[200%] gap-12 font-mono text-xs uppercase tracking-[0.4em] text-arctic/40",
			style: { animation: "lp-marquee 28s linear infinite" },
			children: [...items, ...items].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-12 whitespace-nowrap",
				children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-forsythia",
					children: "◇"
				})]
			}, i))
		})
	});
}
function SocialProof() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "proof",
		className: "border-t border-line bg-noir px-6 py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InView, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs uppercase tracking-[0.4em] text-forsythia",
						children: "[ 04 / In production at ]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 max-w-2xl text-4xl font-medium leading-tight sm:text-5xl",
						children: "Trusted by teams who measure agent uptime in nines."
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InView, {
					delay: 100,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line-strong sm:grid-cols-4",
						children: [
							"Helix Labs",
							"Quanta",
							"Northwind",
							"Parallel",
							"Mercer&Co",
							"Loom Systems",
							"Atlas/9",
							"Foundry"
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "grid h-20 place-items-center bg-noir font-mono text-sm tracking-wider text-arctic/55",
							children: l
						}, l))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: [
						{
							q: "Nodal replaced four glued-together notebooks and a chron job. Our on-call has gone quiet.",
							a: "Priya Shah",
							r: "Staff ML Engineer, Helix Labs"
						},
						{
							q: "Tariff-aware routing alone paid for the year. We cut model spend 41% without touching accuracy.",
							a: "Marcus Vidal",
							r: "Head of Platform, Quanta"
						},
						{
							q: "First runtime that treats agents the way we treat services. Versioned, traced, owned.",
							a: "Anya Petrov",
							r: "Director of Eng, Northwind"
						}
					].map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InView, {
						delay: i * 100,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "hover-glow card flex h-full flex-col p-7 hover:border-line-strong",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: arrow_path_default,
									alt: "",
									"aria-hidden": true,
									className: "size-5 [filter:invert(80%)_sepia(64%)_saturate(2200%)_hue-rotate(1deg)_brightness(100%)]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
									className: "mt-5 flex-1 text-arctic/90",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-pretty leading-relaxed",
										children: [
											"\"",
											q.q,
											"\""
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "mt-6 border-t border-line pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-arctic",
										children: q.a
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[11px] uppercase tracking-widest text-mute",
										children: q.r
									})]
								})
							]
						})
					}, q.a))
				})
			]
		})
	});
}
function Faq() {
	const items = [
		{
			q: "Do I need to rip out my orchestration?",
			a: "No. Nodal sits beside Airflow, Temporal, or your own service mesh. Most teams start by porting one agent and grow from there."
		},
		{
			q: "How is pricing actually computed?",
			a: "A base tier rate × regional tariff × billing-cycle discount. The dropdowns on this page write to an external store; the prices update via direct text-node mutation — zero re-renders."
		},
		{
			q: "Where does my data live?",
			a: "Your VPC by default. We never train on customer payloads and ship a read-only audit pipe for compliance."
		},
		{
			q: "What about latency?",
			a: "p50 routing is 38ms. Most production agents see end-to-end latency dominated by the model provider, not the runtime."
		}
	];
	const [active, setActive] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "border-t border-line bg-noir px-6 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InView, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs uppercase tracking-[0.4em] text-forsythia",
				children: "[ 05 / FAQ ]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 text-4xl font-medium leading-tight",
				children: "Answered upfront."
			})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InView, {
				delay: 100,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-line border-y border-line",
					children: items.map((it, i) => {
						const isOpen = active === i;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActive(isOpen ? null : i),
								"aria-expanded": isOpen,
								className: "hover-tx flex w-full items-center justify-between py-6 text-left hover:text-arctic/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-sm font-medium tracking-wide text-arctic",
									children: it.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "feature-tx ml-6 font-mono text-forsythia",
									style: { transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" },
									children: "↓"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid struct-tx",
								style: { gridTemplateRows: isOpen ? "1fr" : "0fr" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "pb-6 pr-8 text-arctic/70",
										children: it.a
									})
								})
							})]
						}, it.q);
					})
				})
			})]
		})
	});
}
function Cta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden border-t border-line bg-nocturnal px-6 py-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-forsythia/30 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-40 -left-32 size-[28rem] rounded-full bg-saffron/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InView, {
				className: "relative mx-auto max-w-5xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs uppercase tracking-[0.4em] text-arctic/60",
						children: "[ 06 / Ship today ]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 text-5xl font-medium leading-[1] tracking-tight sm:text-7xl",
						children: "Production-grade agents, by Friday."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-xl text-arctic/75",
						children: "Free for 14 days. No card, no sales motion. Bring one workflow — we'll wire the rest."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pricing",
							className: "hover-glow inline-flex h-12 items-center rounded-full bg-forsythia px-7 font-mono text-xs uppercase tracking-widest text-noir hover:brightness-95",
							children: "Create a workspace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "hover-glow inline-flex h-12 items-center rounded-full border border-arctic/30 px-7 font-mono text-xs uppercase tracking-widest text-arctic hover:border-forsythia hover:text-forsythia",
							children: "Read the docs"
						})]
					})
				]
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-line bg-noir px-6 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cube_16_solid_default,
						alt: "",
						"aria-hidden": true,
						className: "size-5 [filter:invert(85%)_sepia(54%)_saturate(2476%)_hue-rotate(1deg)_brightness(105%)_contrast(101%)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-sm",
						children: ["nodal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-forsythia",
							children: ".ai"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Footer",
					className: "flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-arctic/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "hover-tx hover:text-arctic",
							children: "Capabilities"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pricing",
							className: "hover-tx hover:text-arctic",
							children: "Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#proof",
							className: "hover-tx hover:text-arctic",
							children: "Customers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#faq",
							className: "hover-tx hover:text-arctic",
							children: "FAQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover-tx hover:text-arctic",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover-tx hover:text-arctic",
							children: "Changelog"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-widest text-mute",
					children: "© 2026 nodal.ai — built for the FB Round 1 speed run."
				})
			]
		})
	});
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grain relative min-h-screen bg-noir text-arctic",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-forsythia focus:px-3 focus:py-2 focus:text-noir",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BentoFeatures, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProof, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cta, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = Landing;
//#endregion
export { SplitComponent as component };
