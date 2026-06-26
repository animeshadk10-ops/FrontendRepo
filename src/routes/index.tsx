import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nodal.ai — The AI runtime for production-grade automation" },
      {
        name: "description",
        content:
          "Nodal turns brittle prompts into observable, versioned agents wired into your data and tooling. Tariff-aware routing, policy-as-code, 200+ integrations.",
      },
      { name: "keywords", content: "AI automation, agents, LLM orchestration, observability, SaaS, AI runtime" },
      { name: "theme-color", content: "#172B36" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Nodal.ai — Production-grade AI automation runtime" },
      { property: "og:description", content: "Composable agents, observable runs, tariff-aware routing. Ship automation by Friday." },
      { property: "og:site_name", content: "Nodal.ai" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nodal.ai — Production-grade AI automation runtime" },
      { name: "twitter:description", content: "Composable agents, observable runs, tariff-aware routing." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Landing,
});
