"use client";

import { useState } from "react";
import Link from "next/link";

const overviewStats = [
  { label: "Project Type", value: "Full-Stack SaaS Platform" },
  { label: "Role", value: "Founder, Solo Developer" },
  { label: "Timeline", value: "May 2024 – Nov 2024 (6 months)" },
  { label: "Status", value: "Live in Production" },
];

const metrics = [
  {
    title: "Product",
    items: [
      "12+ production features",
      "Sessions list + detail with AI insights",
      "Track directory with all-time records",
      "Driver profile & stats dashboard",
    ],
  },
  {
    title: "Code & Quality",
    items: [
      "70+ files • ~7,000 lines of TypeScript/Swift",
      "54 unit tests (state machines, analytics, utilities)",
      "TypeScript strict mode across the stack",
    ],
  },
  {
    title: "Performance & Cost",
    items: [
      "<2s AI insight generation",
      "<50ms API responses via Vercel Edge",
      "<1s page loads with server components",
      "$234 total initial budget",
    ],
  },
];

const stack = [
  {
    label: "Frontend",
    value: "Next.js 14 (App Router), React, TypeScript, Tailwind",
  },
  {
    label: "Backend",
    value: "Supabase (PostgreSQL), Row-Level Security, pgvector-ready",
  },
  {
    label: "AI",
    value: "Anthropic Claude Sonnet 4.5 – structured prompts & JSON outputs",
  },
  {
    label: "Tooling",
    value: "Vercel, Vitest, React Testing Library, GitHub CI",
  },
];

const timelinePhases = [
  {
    phase: "Months 1–2",
    label: "Foundation",
    items: [
      "Next.js + Supabase integration",
      "Database schema for drivers, sessions, laps, tracks",
      "Auth & Row-Level Security for multi-tenant access",
    ],
  },
  {
    phase: "Months 3–4",
    label: "Product Features",
    items: [
      "Sessions list + detail views",
      "Lap analysis with statistical summaries",
      "Track directory & driver profile pages",
    ],
  },
  {
    phase: "Month 5",
    label: "Intelligence Layer",
    items: [
      "Consistency scoring & pace trend detection",
      "Fatigue pattern analysis",
      "AI coaching pipeline with Claude Sonnet 4.5",
      "Cost & latency telemetry for each AI call",
    ],
  },
  {
    phase: "Month 6",
    label: "Polish & Production",
    items: [
      "Coach dashboard (multi-driver)",
      "Filtering, sorting, and track history views",
      "54 automated tests",
      "Production deployment to Vercel",
    ],
  },
];

const tabs = [
  {
    id: "problem",
    label: "Problem",
    eyebrow: "Drivers Know They're Slow, Not Why",
    body: [
      "Amateur motorsport drivers are flooded with data—lap times, GPS traces, video overlays—but lack clear guidance on what to change.",
      "Professional coaching runs $500-2,000 per event, so most drivers get coached only once or twice a year.",
      "Existing apps (RaceChrono, TrackAddict, Harry’s LapTimer) are excellent recorders, but they don’t translate telemetry into concrete next steps.",
    ],
  },
  {
    id: "solution",
    label: "Solution",
    eyebrow: "AI-First Coaching Platform",
    body: [
      "Track App automatically scores each session for consistency, pace trends, and late-session fatigue patterns.",
      "An AI layer (Claude Sonnet 4.5) converts raw metrics into prioritized coaching notes: where you’re losing time, how your consistency is trending, and what to focus on next.",
      "The platform is built multi-tenant from day one so coaches can manage multiple drivers and organizations can run schools or clubs on top of it.",
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    eyebrow: "80% Architecture, 20% Features",
    body: [
      "Chose PostgreSQL over Firebase to support relational queries like “compare last 10 sessions at this track” and longitudinal driver analytics.",
      "Implemented multi-tenant design with Row-Level Security so drivers, coaches, and organizations share one schema without data leaks.",
      "Wrapped AI behind a telemetry-aware pipeline that tracks latency, cost, and quality, instead of dropping raw prompts into the UI.",
    ],
  },
  {
    id: "results",
    label: "Results",
    eyebrow: "Production-Grade MVP on a $234 Budget",
    body: [
      "Shipped 12+ production features in 6 months, part-time, with 54 automated tests and strict TypeScript.",
      "Hit sub-2-second AI insight times and sub-1-second page loads via server components and Vercel Edge.",
      "Laid a foundation where adding new features—like long-term coaching history or AI memory—is now an hours-level task, not a rewrite.",
    ],
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

function ProblemSolutionTabs() {
  const [active, setActive] = useState<TabId>("problem");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 shadow-lg shadow-purple-900/20">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                tab.id === active
                  ? "bg-purple-500/20 text-purple-100 border border-purple-400 shadow-[0_0_0_1px_rgba(168,85,247,0.5)]"
                  : "bg-slate-900/70 text-slate-300 border border-slate-700 hover:border-purple-500/60 hover:text-purple-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-slate-500">
          Tap to switch between problem, solution, architecture, and results.
        </span>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 md:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {current.eyebrow}
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          {current.body.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-purple-500" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  kicker,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative border-t border-slate-900/80 bg-gradient-to-b from-slate-950 to-slate-950/95 px-4 py-16 sm:px-6 md:px-8 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange-400/80">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            {title}
          </h2>
          {kicker && (
            <p className="mt-3 text-sm text-slate-400 md:text-base">{kicker}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-xs text-slate-500">
      <span className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1">
        {label} – Placeholder
      </span>
    </div>
  );
}

export default function TrackAppCaseStudyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-64 bg-gradient-to-b from-orange-500/25 via-red-500/18 to-purple-700/20 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-900/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 text-xs font-semibold tracking-tight text-slate-50 shadow-lg shadow-orange-500/40">
              TA
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Track App
              </span>
              <span className="text-[11px] text-slate-500">
                Portfolio Case Study
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <a href="#overview" className="hover:text-slate-50">
              Overview
            </a>
            <a href="#problem-solution" className="hover:text-slate-50">
              Problem & Solution
            </a>
            <a href="#architecture" className="hover:text-slate-50">
              Architecture
            </a>
            <a href="#results" className="hover:text-slate-50">
              Results
            </a>
            <a href="#learnings" className="hover:text-slate-50">
              Learnings
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://trackapp-portal.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-purple-500/70 hover:text-white md:inline-flex"
            >
              Live Demo
            </a>
            <a
              href="https://github.com/scottcollier10/track-app-mvp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 px-3.5 py-1.5 text-xs font-semibold text-slate-50 shadow-lg shadow-orange-500/50 hover:brightness-110"
            >
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero / Overview */}
        <section
          id="overview"
          className="border-b border-slate-900/80 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95 px-4 pb-16 pt-10 sm:px-6 md:px-8 lg:px-12 lg:pb-20 lg:pt-16"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-orange-400/80">
                Case Study • Full-Stack SaaS Platform
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Track App: AI-Powered Racing Analytics & Coaching
              </h1>
              <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                Track App is an AI-powered racing analytics and coaching
                platform for amateur drivers. It bridges the gap between rich
                telemetry and actionable coaching by combining PostgreSQL,
                Supabase, and Claude Sonnet 4.5 into a production-ready SaaS.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="https://trackapp-portal.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-slate-50 shadow-lg shadow-orange-500/40 hover:brightness-110"
                >
                  View Live Demo ↗
                </a>
                <a
                  href="https://trackapp-portal.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-medium text-slate-200 hover:border-purple-500/70 hover:text-white"
                >
                  Open Coaching Dashboard
                </a>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 sm:grid-cols-4">
                {overviewStats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {stat.label}
                    </p>
                    <p className="text-xs text-slate-100">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <PlaceholderImage label="Session Detail + AI Coaching Panel" />
              <ProblemSolutionTabs />
            </div>
          </div>
        </section>

        {/* Architecture & Stack */}
        <Section
          id="architecture"
          eyebrow="Technical Approach"
          title="Platform Architecture, Not a Prototype"
          kicker="I deliberately spent most of the project on foundations: data model, multi-tenant access, and an AI pipeline with telemetry."
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Most track apps are built like mobile games: move fast, ship a
                timer, and worry about data modeling later. Track App takes the
                opposite approach—PostgreSQL, Row-Level Security, and a
                multi-tenant schema form the foundation for long-term coaching
                and analytics.
              </p>
              <p>
                That decision makes high-level features cheap: comparing a
                driver&apos;s last 10 sessions at a track, running coach-wide
                performance reports, or feeding a driver&apos;s history into AI
                are all natural SQL queries instead of complex rewrites.
              </p>
              <p className="text-xs text-slate-400">
                Example: selecting each driver&apos;s best lap at every track
                plus number of sessions is a single aggregate query, not a
                manual aggregation across nested JSON blobs.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Tech Stack
                </p>
                <div className="mt-3 space-y-2 text-xs text-slate-200">
                  {stack.map((row) => (
                    <div key={row.label}>
                      <p className="font-semibold text-slate-100">
                        {row.label}
                      </p>
                      <p className="text-slate-300">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <PlaceholderImage label="High-Level Architecture Diagram" />
            </div>
          </div>
        </Section>

        {/* Timeline */}
        <Section
          id="timeline"
          eyebrow="Execution"
          title="Six Months, Twelve Features, One Foundation"
          kicker="I treated this like a real production engagement: clear phases, measurable outcomes, and a deployable artifact at every step."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {timelinePhases.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {phase.phase}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-50">
                  {phase.label}
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                  {phase.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Metrics */}
        <Section
          id="results"
          eyebrow="Results"
          title="Production-Ready on a Startup Budget"
          kicker="Track App is live in production and ready to support drivers, coaches, and racing organizations today."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {metrics.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5"
              >
                <h3 className="text-sm font-semibold text-slate-50">
                  {block.title}
                </h3>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                  {block.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Learnings & Next */}
        <Section
          id="learnings"
          eyebrow="Reflection"
          title="Key Learnings & Next Steps"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-3 text-sm text-slate-300">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                What I Learned
              </h3>
              <ul className="space-y-2 text-xs text-slate-200">
                <li>
                  • Architecture compounds: investing early in PostgreSQL,
                  multi-tenant design, and an AI pipeline made later features
                  dramatically cheaper.
                </li>
                <li>
                  • AI is a pipeline, not a button: structured prompts, context
                  management, telemetry, and cost control are as important as
                  model choice.
                </li>
                <li>
                  • Multi-tenant early or never: Row-Level Security from day one
                  avoids painful rewrites when organizations enter the picture.
                </li>
              </ul>
              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                What&apos;s Next
              </h3>
              <ul className="space-y-2 text-xs text-slate-200">
                <li>• iOS/Android apps for on-track data capture</li>
                <li>• Video integration with GoPro and in-car footage</li>
                <li>• AI coach memory using pgvector and RAG</li>
                <li>• Remote coaching marketplace for drivers and schools</li>
              </ul>
            </div>
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Open to Opportunities
              </p>
              <p>
                Track App is both a real product and a demonstration of how I
                approach full-stack, AI-powered platforms: validate problems,
                design for scale, and ship working software on realistic
                budgets.
              </p>
              <p className="font-semibold text-slate-100">
                I&apos;m especially interested in:
              </p>
              <ul className="space-y-1.5">
                <li>• Product & platform roles on AI-driven teams</li>
                <li>• Partnerships with clubs, schools, or track operators</li>
                <li>• Collaborations on AI-powered coaching tools</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://linkedin.com/in/scottcollier"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-600 bg-slate-950 px-4 py-2 font-medium text-slate-100 hover:border-orange-500"
                >
                  Connect on LinkedIn
                </a>
                <Link
                  href="/"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-950 hover:bg-slate-200"
                >
                  Back to Landing
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-900/80 bg-slate-950 px-4 py-6 text-[11px] text-slate-500 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p>Track App • AI Racing Coach – Portfolio Case Study</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://trackapp-portal.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300"
            >
              Live Demo
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <a
              href="https://github.com/scottcollier10/track-app-mvp"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
