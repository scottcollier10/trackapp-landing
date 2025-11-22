'use client';

import { useState } from "react";

const stats = [
  { label: "12+ Features", value: "Shipped to production" },
  { label: "54 Tests", value: "Unit test coverage" },
  { label: "<2s Response", value: "AI insight generation" },
  { label: "0 Dependencies", value: "Pure Swift iOS (no 3rd party libs)" },
];

const featureCards = [
  {
    icon: "🎯",
    title: "Automated Session Analysis",
    body: "Every track session automatically scored for consistency, pace trends, and fatigue patterns—no spreadsheets required.",
  },
  {
    icon: "🤖",
    title: "AI Coaching Insights",
    body: "Claude Sonnet 4.5 turns your data into prioritized recommendations—like having a junior coach review every session.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    body: "See long-term improvement with track-specific records, filters, and driver stats in a clean, modern dashboard.",
  },
];

const techStack = [
  "Next.js 14",
  "Supabase",
  "PostgreSQL",
  "Anthropic Claude 4.5 Sonnet",
  "Vercel",
  "TypeScript",
  "Vitest",
  "Tailwind CSS",
];

const metrics = [
  {
    title: "Development Timeline",
    items: [
      "Started: May 2024",
      "MVP Shipped: Nov 2024",
      "6 months, part-time",
    ],
  },
  {
    title: "What I Built",
    items: [
      "70+ files created",
      "7,000+ lines of code",
      "12+ production features",
      "54 unit tests (and growing)",
    ],
  },
  {
    title: "Budget & Scale",
    items: [
      "$234 initial budget",
      "Production-ready, not a prototype",
      "Built to support coaches + drivers",
    ],
  },
];

const insightModes = [
  {
    id: "consistency",
    label: "Consistency",
    badge: "89 / 100",
    description:
      "Lap times within 0.8s of best lap. Strong base to build from—work on tightening mid-session variance.",
    meta: "Stable across 12 laps",
  },
  {
    id: "pace",
    label: "Pace Trend",
    badge: "Improving",
    description:
      "Last 3 laps average 0.4s faster than first 3. You’re building confidence—next step is braking consistency into Turn 11.",
    meta: "-0.4s vs early session",
  },
  {
    id: "fatigue",
    label: "Late-Session",
    badge: "Slight Fade",
    description:
      "Small drop-off in the final two laps. Likely mental fatigue rather than mechanical—reset focus before push laps.",
    meta: "+0.2s final two laps",
  },
] as const;

type InsightId = (typeof insightModes)[number]["id"];

function InsightDemo() {
  const [active, setActive] = useState<InsightId>("consistency");
  const current = insightModes.find((m) => m.id === active)!;

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:p-6 shadow-lg shadow-purple-900/20">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
          AI Coaching Preview
        </h3>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live from session data
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {insightModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActive(mode.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              mode.id === active
                ? "border-purple-400 bg-purple-500/20 text-purple-100 shadow-[0_0_0_1px_rgba(168,85,247,0.4)]"
                : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-purple-500/60 hover:text-purple-100"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-400 to-purple-400" />
            {mode.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Focus Area
            </p>
            <p className="text-sm font-medium text-slate-100">{current.label}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Session Insight</p>
            <p className="text-sm font-mono font-semibold text-emerald-300">
              {current.badge}
            </p>
            <p className="text-[11px] text-slate-500">{current.meta}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-200">
          {current.description}
        </p>
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        Powered by structured prompts, Supabase telemetry, and Claude Sonnet
        4.5—this is the same insight engine used in the live Track App portal.
      </p>
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
            <p className="mt-3 text-sm text-slate-400 md:text-base">
              {kicker}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function PlaceholderImage({
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-xs text-slate-500">
      <span className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1">
        {label} – Placeholder
      </span>
    </div>
  );
}

export default function TrackAppLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-64 bg-gradient-to-b from-orange-500/15 via-purple-600/12 to-transparent blur-3xl" />

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
                AI Racing Coach for Amateur Drivers
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <a href="#features" className="hover:text-slate-50">
              Features
            </a>
            <a href="#stack" className="hover:text-slate-50">
              Tech Stack
            </a>
            <a href="#numbers" className="hover:text-slate-50">
              Execution
            </a>
            <a href="#story" className="hover:text-slate-50">
              Story
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
              <span>See the Code</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="border-b border-slate-900/80 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95 px-4 pb-16 pt-10 sm:px-6 md:px-8 lg:px-12 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-orange-400/80">
                AI Racing Coach • Founder Build
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Track App: AI Racing Coach for Amateur Drivers
              </h1>
              <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                Turn your track day data into actionable coaching insights. Built
                with Next.js, Supabase, and Claude AI—designed to help drivers
                improve faster without paying pro-coach rates every session.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="https://trackapp-portal.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-slate-50 shadow-lg shadow-orange-500/40 hover:brightness-110"
                >
                  View Live Demo
                  <span className="ml-1.5 text-xs">↗</span>
                </a>
                <a
                  href="https://github.com/scottcollier10/track-app-mvp"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-medium text-slate-200 hover:border-purple-500/70 hover:text-white"
                >
                  View the Code
                </a>
                <span className="text-[11px] text-slate-500">
                  No signup required. Explore the session dashboard in your
                  browser.
                </span>
              </div>

              {/* Stats bar */}
              <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {stat.label}
                    </p>
                    <p className="text-xs text-slate-100">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="space-y-4">
              <PlaceholderImage label="Session Detail + AI Coaching Screenshot" />
              <InsightDemo />
            </div>
          </div>
        </section>

        {/* What it does */}
        <Section
          id="features"
          eyebrow="What It Does"
          title="Built for Drivers Who Want to Improve"
          kicker="Every feature is designed around actual track-day pain points: fragmented data, vague coaching, and no way to measure progress across seasons."
        >
          <div className="grid gap-8 md:grid-cols-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/60"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 text-lg">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{card.body}</p>
                </div>
                <PlaceholderImage label={`${card.title} UI`} />
              </div>
            ))}
          </div>
        </Section>

        {/* Tech stack */}
        <Section
          id="stack"
          eyebrow="How It's Built"
          title="Modern Stack, Scalable Foundation"
          kicker="Built like a platform from day one—not a throwaway prototype."
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Track App was built with production-grade tools from day one.
                The goal wasn&apos;t just to ship an app—it was to prove a
                scalable architecture for AI-assisted coaching.
              </p>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  The Stack
                </h3>
                <ul className="mt-2 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                  <li>• Frontend: Next.js 14 (App Router, RSC)</li>
                  <li>• Backend: Supabase (PostgreSQL, RLS, real-time)</li>
                  <li>• AI: Claude Sonnet 4.5 with structured outputs</li>
                  <li>• Deployment: Vercel Edge Network</li>
                  <li>• Type Safety: TypeScript strict mode</li>
                  <li>• Testing: Vitest + React Testing Library</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Why These Choices Matter
                </h3>
                <ul className="mt-2 space-y-2 text-xs text-slate-300">
                  <li>
                    • PostgreSQL enables real cross-session queries and
                    longitudinal performance tracking.
                  </li>
                  <li>
                    • Multi-tenant design supports coaches managing multiple
                    drivers from day one.
                  </li>
                  <li>
                    • Server components keep the client bundle lean and fast.
                  </li>
                  <li>
                    • AI pipeline ships with cost and latency telemetry baked
                    in.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Tech Stack Snapshot
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {techStack.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <PlaceholderImage label="Architecture / Folder Structure" />
            </div>
          </div>
        </Section>

        {/* Feature grid */}
        <Section
          eyebrow="Capabilities"
          title="What You Can Do Right Now"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Session Management",
              "Track Directory",
              "Lap Analysis",
              "Driver Profile",
              "Session Insights",
              "AI Coaching",
            ].map((title, idx) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
                <p className="text-xs text-slate-400">
                  {/* Short descriptive blurbs tailored per feature */}
                  {title === "Session Management" &&
                    "View all track sessions in one place—sortable by date, track, best lap, or lap count."}
                  {title === "Track Directory" &&
                    "Browse circuits with history, all-time records, and stats per track."}
                  {title === "Lap Analysis" &&
                    "Inspect every lap with formatted times, deltas, and visual consistency scoring."}
                  {title === "Driver Profile" &&
                    "See total sessions, all-time best lap, and favorite tracks at a glance."}
                  {title === "Session Insights" &&
                    "Automatic consistency scoring, pace trends, and fatigue analysis."}
                  {title === "AI Coaching" &&
                    "Prioritized recommendations so you always know what to work on next."}
                </p>
                <PlaceholderImage label={`${title} Screenshot`} />
              </div>
            ))}
          </div>
        </Section>

        {/* Numbers */}
        <Section
          id="numbers"
          eyebrow="Execution"
          title="Shipped Fast, Built to Last"
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

        {/* Story */}
        <Section
          id="story"
          eyebrow="Founder Story"
          title="Building a Platform, Not Just an App"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Most track apps are built like mobile games: ship fast, worry
                about scale later. Track App took the opposite approach—80% of
                the effort in architecture, 20% in features.
              </p>
              <p>
                That means PostgreSQL instead of Firebase, multi-tenant design
                for coaches and drivers, and an AI pipeline with structured
                prompts and telemetry baked in.
              </p>
              <p>
                The result? Features that now ship in hours instead of months.
                Comparing a driver&apos;s last 10 sessions at the same track is
                just a clean SQL query—not a refactor.
              </p>
            </div>
            <PlaceholderImage label="Legacy vs Track App Architecture Diagram" />
          </div>
        </Section>

        {/* Open to opportunities */}
        <Section
          eyebrow="Why Share This?"
          title="Open to Opportunities"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Track App started as a way to solve my own problem as an
                amateur racer—and became a proof of concept for a scalable,
                AI-assisted coaching platform.
              </p>
              <p className="text-sm font-semibold text-slate-100">
                I&apos;m especially interested in:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• Partnerships with racing clubs and driving schools</li>
                <li>• Collaborators who want to ship real product</li>
                <li>• Feedback from drivers and coaches</li>
                <li>• Roles where platform thinking and execution speed matter</li>
              </ul>
              <p className="text-xs text-slate-400">
                Not looking for funding yet—product-market fit comes first.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-200">
              <p className="font-semibold text-slate-50">
                Let&apos;s talk if you&apos;re:
              </p>
              <ul className="space-y-1.5">
                <li>• An employer looking for a builder with end-to-end chops</li>
                <li>• A team exploring AI-powered motorsport tools</li>
                <li>• A coach who wants scalable, data-driven insights</li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://trackapp-portal.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-purple-500/60 hover:text-white"
                >
                  Try the Live Demo
                </a>
                <a
                  href="https://linkedin.com/in/scottcollier"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:border-orange-500/70 hover:text-white"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950 px-4 py-6 text-[11px] text-slate-500 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p>Built in public • Track App MVP</p>
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
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <a
              href="https://linkedin.com/in/scottcollier"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
