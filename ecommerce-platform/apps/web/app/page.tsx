import Link from "next/link";
import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";
import { CapabilityBoard } from "../components/capability-board";
import { StageTimeline } from "../components/stage-timeline";
import {
  architectureLayers,
  deliveryPrinciples,
  platformMetrics,
} from "../lib/platform-content";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-8 sm:px-10 lg:px-12">
      <section className="grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.4fr_0.9fr] lg:p-10">
        <div className="space-y-6">
          <Badge tone="accent">Enterprise storefront foundation</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Full stack e-commerce architecture built for scale,
              security, and reusable delivery.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              This workspace now starts from a clean monorepo
              foundation with a modular Next.js frontend, an
              Express API organized around services and
              repositories, and workspace tooling aligned to pnpm
              and Turborepo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="http://localhost:5000/api/v1/health"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              View API health endpoint
            </Link>
            <Link
              href="#capabilities"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
            >
              Explore platform capabilities
            </Link>
          </div>
        </div>

        <Card tone="accent" className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
              Delivery standards
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Platform guardrails
            </h2>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-slate-200">
            {deliveryPrinciples.map((principle) => (
              <li
                key={principle}
                className="rounded-2xl border border-cyan-500/20 bg-slate-950/60 px-4 py-3"
              >
                {principle}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {platformMetrics.map((metric) => (
          <Card key={metric.label} className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              {metric.label}
            </p>
            <p className="text-3xl font-semibold text-white">
              {metric.value}
            </p>
            <p className="text-sm leading-6 text-slate-300">
              {metric.description}
            </p>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <Badge>Clean architecture mapping</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Layered for maintainability
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Each layer has a single responsibility so features can
            evolve independently without leaking business logic
            into framework entry points.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {architectureLayers.map((layer) => (
            <Card key={layer.title} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  {layer.subtitle}
                </p>
                <h3 className="text-xl font-semibold text-white">
                  {layer.title}
                </h3>
                <p className="text-sm leading-6 text-slate-300">
                  {layer.description}
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-200">
                {layer.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 text-cyan-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <CapabilityBoard />
      <StageTimeline />
    </main>
  );
}
