'use client';

import { useState } from "react";
import Image from "next/image";
import heroCoach from "@/public/images/trackapp-hero-coach-tablet.webp";
import heroCoachCu from "@/public/images/trackapp-hero-coach-tablet-cu.webp";
import featureMobile from "@/public/images/feature-mobile-dashboard.webp";
import featurePerf from "@/public/images/feature-50x-performance.webp";
import featureFilters from "@/public/images/feature-advanced-filters.webp";
import mobileDashboard from "@/public/images/mobile-dashboard-card.webp";
import coreMulti from "@/public/images/core-multidevice.webp";
import coreSession from "@/public/images/core-session-analysis.webp";
import coreCompare from "@/public/images/core-driver-compare.webp";
import coreProgress from "@/public/images/core-longitudinal-progress.webp";
import coreFilter from "@/public/images/core-advanced-filtering.webp";
import coreCsv from "@/public/images/core-csv-export.webp";


const stats = [
  { label: "50x Faster", value: "Sub-100ms page loads" },
  { label: "14,000+ LOC", value: "Production-ready code" },
  { label: "Mobile-First", value: "Phone, tablet, desktop" },
  { label: "Pilot-Ready", value: "Deployed & stable" },
];

const featureCards = [
  {
    icon: "📱",
    title: "Mobile-First Dashboard",
    body: "Designed for phone first—not a desktop UI crushed onto a small screen. Card layouts on mobile, tables on desktop, so coaches can review 12 drivers in under 2 minutes between sessions.",
	  image: featureMobile,
  },
  {
    icon: "⚡",
    title: "50x Performance Optimization",
    body: "Rebuilt the data layer to remove N+1 queries—50+ calls collapsed into a single optimized query. Sub-100ms page loads in production with headroom for 1,000+ sessions.",
	  image: featurePerf,
  },
  {
    icon: "🔍",
    title: "Advanced Filtering & Export",
    body: "Global search and multi-select filters for track, driver, date, and class. Sortable columns, sticky filters, and CSV export for full-weekend and program-level analysis.",
	  image: featureFilters,
  },
];

const techStack = [
  "Next.js 14",
  "Supabase",
  "PostgreSQL",
  "Swift/SwiftUI",
  "Vercel Edge",
  "TypeScript",
  "XCTest + Vitest",
  "Tailwind CSS",
];

const metrics = [
  {
    title: "Development Timeline",
    items: [
      "Started: May 2024",
      "v2.4 Shipped: Dec 2024",
      "Production-deployed & stable",
    ],
  },
  {
    title: "What's Built",
    items: [
      "160+ files (95 TS, 52 Swift)",
      "14,000+ lines of code",
      "54 unit tests (iOS + web)",
      "Live at trackapp-portal.vercel.app",
    ],
  },
  {
    title: "v2.4 Highlights",
    items: [
      "Mobile-first responsive design",
      "50x performance optimization",
      "Advanced filtering & export",
      "Production-grade engineering",
    ],
  },
];

const coreCapabilities = [
  {
    title: "Multi-Driver Overview",
    description:
      "Monitor 12–15 drivers at once on phone or tablet. Card-based layouts keep key metrics readable and thumb-reachable in the paddock.",
    image: coreMulti,
  },
  {
    title: "Session Analysis",
    description:
      "Lap-by-lap progression with consistency scores, pace trends, and session patterns. Spot where a driver settles in or starts to fade at a glance.",
    image: coreSession,
  },
  {
    title: "Driver Comparison",
    description:
      "Head-to-head lap analysis with time deltas, sector gains, and best-lap overlays. See exactly where one driver is faster and why.",
    image: coreCompare,
  },
  {
    title: "Longitudinal Progress",
    description:
      "Track a single driver across multiple events. Compare weekends, highlight gains, and back up coaching feedback with real data.",
    image: coreProgress,
  },
  {
    title: "Advanced Filtering",
    description:
      "Global search plus multi-select filters for track, driver, date, and car. Sortable columns and sticky filters so views stay put between sessions.",
    image: coreFilter,
  },
  {
    title: "CSV Export",
    description:
      "One-click export of session data—driver, track, laps, best lap, and consistency. Excel and Google Sheets ready for program-level analysis.",
    image: coreCsv,
  },
];


const insightModes = [
  {
    id: "consistency",
    label: "Consistency",
    badge: "89 / 100",
    description:
      "Driver maintaining lap times within 0.8s of best lap across 12 laps. Strong foundation—coaching focus: tighten mid-session variance and work on late-session concentration.",
    meta: "Stable across session",
  },
  {
    id: "pace",
    label: "Pace Trend",
    badge: "Improving",
    description:
      "Last 3 laps averaging 0.4s faster than opening laps. Driver building confidence through session—next coaching priority: braking consistency into technical sections.",
    meta: "Progressive improvement",
  },
  {
    id: "fatigue",
    label: "Session Pattern",
    badge: "Late Fade",
    description:
      "Performance drop in final laps suggests mental fatigue rather than mechanical issues. Coaching recommendation: reset focus protocol before push laps, hydration check.",
    meta: "Concentration management",
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
          Optional AI Assist
        </h3>
        <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          Assistive layer
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
              Coaching Focus
            </p>
            <p className="text-sm font-medium text-slate-100">{current.label}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Session Metric</p>
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
        AI summaries help speed up note-writing—coaches can edit, ignore, or rewrite entirely.
        Metrics are calculated deterministically; AI is the assistive layer, not the decision-maker.
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
                Production-Ready Coach OS
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
              Performance
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
              href="mailto:me@scott-collier.com?subject=Track%20App%20Pilot%20Program"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 px-3.5 py-1.5 text-xs font-semibold text-slate-50 shadow-lg shadow-orange-500/50 hover:brightness-110"
            >
              <span>Request Demo</span>
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
                Production-Ready • Mobile-First • 50x Optimized
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Coach OS for Grassroots Racing
              </h1>
              <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                Production-ready, mobile-first coaching dashboard for HPDE programs. 
                Manage 12-15 drivers trackside on phone or tablet—no laptop needed in paddock. 
                50x performance optimization with sub-100ms page loads.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:me@scott-collier.com?subject=Track%20App%20Demo%20Request"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-slate-50 shadow-lg shadow-orange-500/40 hover:brightness-110"
                >
                  Request Pilot Program Demo
                  <span className="ml-1.5 text-xs">→</span>
                </a>
                <a
                  href="https://trackapp-portal.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-medium text-slate-200 hover:border-purple-500/70 hover:text-white"
                >
                  View Live Demo
                </a>
                <span className="text-[11px] text-slate-500">
                  Production-deployed at trackapp-portal.vercel.app—ready for pilot testing.
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
  <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
    <Image
      src={heroCoach}
      alt="Track coach reviewing the Track App dashboard on a tablet in the paddock"
      fill
      className="object-cover"
      priority
      sizes="(min-width: 1024px) 480px, 100vw"
    />
  </div>

  <InsightDemo />
</div>
          </div>
        </section>

        {/* What it does */}
        <Section
          id="features"
          eyebrow="NEW in v2.4"
          title="Production-Ready for Trackside Coaching"
          kicker="Not just an MVP anymore—this is production-deployed coaching infrastructure. Mobile-first design means coaches review 12 drivers on iPhone in the paddock in under 2 minutes. No laptop required."
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
                <div className="relative mt-1 aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
  <Image
    src={card.image}
    alt={`${card.title} UI mock`}
    fill
    className="object-cover"
    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
  />
</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Tech stack */}
        <Section
          id="stack"
          eyebrow="Production-Grade Engineering"
          title="Built Mobile-First, Optimized for Performance"
          kicker="Complete mobile responsive design across all pages. Card layouts on phone, table layouts on desktop. 50x query optimization eliminates N+1 problem. Sub-100ms page loads on production."
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Track App v2.4 represents a major production milestone: mobile-first 
                responsive design, 50x performance optimization, and advanced filtering 
                with CSV export. This isn't a prototype—it's production-deployed 
                coaching infrastructure.
              </p>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Mobile-First Architecture
                </h3>
                <ul className="mt-2 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                  <li>• Responsive breakpoints: mobile/tablet/desktop</li>
                  <li>• Card layouts on phone (&lt;768px)</li>
                  <li>• Table layouts on desktop (≥1024px)</li>
                  <li>• Touch-optimized interactions (48px targets)</li>
                  <li>• Professional loading skeleton states</li>
                  <li>• Collapsible sections for mobile efficiency</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Performance Optimization (50x Improvement)
                </h3>
                <ul className="mt-2 space-y-2 text-xs text-slate-300">
                  <li>
                    • Problem: 50+ database queries per page (N+1 issue, 3-5s loads)
                  </li>
                  <li>
                    • Solution: Single optimized query with Supabase aggregations
                  </li>
                  <li>
                    • Result: Sub-100ms page loads, scalable to 1,000+ sessions
                  </li>
                  <li>
                    • Consistent data layer architecture across Home, Sessions, Coach Dashboard
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Tech Stack
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
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
    <Image
      src={mobileDashboard}
      alt="Mobile-first responsive dashboard mock"
      fill
      className="object-cover"
      sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 100vw"
    />
  </div>
            </div>
          </div>
        </Section>

        {/* Feature grid */}
<Section
  eyebrow="Core Capabilities"
  title="Everything Coaches Need, Trackside"
>
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {coreCapabilities.map((cap, idx) => (
      <div
        key={cap.title}
        className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {String(idx + 1).padStart(2, "0")}
        </p>

        <h3 className="text-sm font-semibold text-slate-50">
          {cap.title}
        </h3>

        <p className="text-xs text-slate-400">
          {cap.description}
        </p>

        <div className="relative mt-1 aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <Image
            src={cap.image}
            alt={`${cap.title} screenshot mock`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      </div>
    ))}
  </div>
</Section>


        {/* Numbers */}
        <Section
          id="numbers"
          eyebrow="Execution Metrics"
          title="Production-Deployed & Performance-Optimized"
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
          
          <div className="mt-8 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-purple-600/10 p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚡</span>
              <div>
                <h3 className="text-sm font-semibold text-orange-400">
                  Performance Optimization Deep-Dive
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  <strong className="text-slate-100">The Problem:</strong> Early builds suffered from N+1 query problems—
                  50+ database queries per page load resulted in 3-5 second load times. Unusable on mobile, frustrating on desktop.
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  <strong className="text-slate-100">The Solution:</strong> Rebuilt data layer with Supabase aggregations. 
                  Single optimized query using COUNT, MAX, and JOIN operations. Server-side aggregation instead of client-side loops.
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  <strong className="text-slate-100">The Result:</strong> 50x performance improvement. 
                  Sub-100ms page loads on production. Scalable to 1,000+ sessions. Same pattern applied across Home, Sessions, and Coach Dashboard pages.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Story */}
        <Section
          id="story"
          eyebrow="Why Mobile-First Matters"
          title="Built for Real Trackside Coaching Workflows"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Coaches don't work at desks with dual monitors. They work in paddocks 
                between 20-minute sessions, reviewing data on phones or tablets while 
                drivers prep for the next run group.
              </p>
              <p>
                Track App v2.4 is built mobile-first from the ground up—not a desktop 
                app squeezed onto a phone. Card-based mobile layouts. Touch-optimized 
                interactions. Advanced filtering without cluttering small screens. 
                Professional loading states that don't jarring flash blank screens.
              </p>
              <p>
                The 50x performance optimization isn't just a tech flex—it means coaches 
                can review 12 drivers in under a minute, not 10+ minutes waiting for pages 
                to load. That's the difference between useful coaching infrastructure and 
                another abandoned dashboard.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
  <Image
    src={heroCoachCu}
    alt="Coach using Track App on a tablet in the paddock"
    fill
    className="object-cover"
    sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 100vw"
  />
</div>
          </div>
        </Section>

        {/* Open to opportunities */}
        <Section
          eyebrow="Ready for Pilot Testing"
          title="Production-Deployed for HPDE Programs"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Track App v2.4 is production-deployed and stable at trackapp-portal.vercel.app. 
                This isn't a prototype—it's ready for real coaching use with real programs.
              </p>
              <p className="text-sm font-semibold text-slate-100">
                Ideal for:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• HPDE coaches managing 12-20 drivers per event</li>
                <li>• Driving schools looking for professional coaching infrastructure</li>
                <li>• Club racing programs that need mobile-first dashboards</li>
                <li>• Karting academies focused on longitudinal driver development</li>
              </ul>
              <p className="text-xs text-slate-400">
                Pilot program available—let's validate the workflow with your program 
                and refine features based on real weekend feedback.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-200">
              <p className="font-semibold text-slate-50">
                Request Pilot Program Access
              </p>
              <p className="text-xs text-slate-400">
                Production-ready coaching infrastructure. Mobile-first design. 
                50x performance optimization. Ready to test with your program.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="mailto:me@scott-collier.com?subject=Track%20App%20Pilot%20Program"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 px-4 py-2 text-xs font-semibold text-slate-50 shadow-lg shadow-orange-500/40 hover:brightness-110"
                >
                  Email: me@scott-collier.com
                </a>
                <a
                  href="https://trackapp-portal.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 hover:border-purple-500/60 hover:text-white"
                >
                  View Live Demo
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
          <p>Production-Ready, Mobile-First Coach OS • Track App v2.4</p>
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
              href="mailto:me@scott-collier.com"
              className="hover:text-slate-300"
            >
              Request Pilot Access
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
