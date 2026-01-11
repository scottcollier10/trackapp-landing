'use client';

import { useState } from "react";
import Image from "next/image";
import trackLogo from "@/public/images/trackapp-logo.png";
import heroBurst from "@/public/images/hero-burst.webp";
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

// ============================================================================
// CTA CONSTANTS (single source of truth)
// ============================================================================

const COACH_DEMO_URL = "https://trackapp-portal.vercel.app/coach";
const CSV_IMPORT_URL = "https://trackapp-portal.vercel.app/import";
const BETA_SESSION_URL = "https://trackapp-landing.vercel.app/session";
const PILOT_MAILTO =
  "mailto:me@scott-collier.com?subject=Track%20App%20Pilot%20Access";

// ============================================================================
// DATA ARRAYS
// ============================================================================

const featureCards = [
  {
    title: "Mobile-First Dashboard",
    body: "Designed for phone first—not a desktop UI crushed onto a small screen. Card layouts on mobile, tables on desktop, so coaches can review 12 drivers in under 2 minutes between sessions.",
    image: featureMobile,
  },
  {
    title: "50x Performance Optimization",
    body: "Rebuilt the data layer to remove N+1 queries—50+ calls collapsed into a single optimized query. Sub-100ms page loads in production with headroom for 1,000+ sessions.",
    image: featurePerf,
  },
  {
    title: "Filtering + CSV Workflows",
    body: "Global search and multi-select filters for track, driver, and session—plus CSV import templates and export for full-weekend, coach-level analysis.",
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
    items: ["Started: Jul 2025", "v2.4 Shipped: Dec 2025", "Production-deployed & stable"],
  },
  {
    title: "What's Built",
    items: ["160+ files (95 TS, 52 Swift)", "14,000+ lines of code", "54 unit tests (iOS + web)", "Live at trackapp-portal.vercel.app"],
  },
  {
    title: "v2.4 Highlights",
    items: ["Mobile-first responsive design", "50x performance optimization", "Advanced filtering + CSV workflows", "Production-grade engineering"],
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
    title: "CSV Import + Export",
    description:
      "CSV-first workflow: export from RaceChrono/TrackAddict/AiM, upload to the coach portal, then export clean session views back out for spreadsheets and program-level analysis.",
    image: coreCsv,
  },
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is this another lap timer app?",
      answer:
        "Not exactly — Track App has an iOS capture app, but we're not trying to replace RaceChrono or TrackAddict. The real value is the coaching layer. If your drivers already use RaceChrono, they can keep using it and import that data. Either way, the focus is on coach workflows, not competing on telemetry features.",
    },
    {
      question: "What does it actually do that RaceChrono doesn't?",
      answer:
        "RaceChrono is built for individual drivers. Track App is built for coaches managing 10-15 drivers per weekend. Multi-driver dashboard, persistent coaching notes, and longitudinal progress tracking across events.",
    },
    {
      question: "How does data get into the system?",
      answer:
        "Two ways: (1) CSV import from any lap timer app (RaceChrono, TrackAddict, AiM, etc.), or (2) Native iOS capture app that uploads directly. Integrations may come later—but CSV works now.",
    },
    {
      question: "What's the pricing model?",
      answer:
        "Still figuring this out — that's why I need feedback from coaches. Considering coach seat licenses ($20-40/month) or school packages. What would make sense for your program?",
    },
    {
      question: "When can I actually use this?",
      answer:
        "It's a working demo now. Looking for 2-3 pilot programs in Q1 2026 to validate and refine before wider launch. If you're interested in testing, reach out.",
    },
  ];

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(index);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % faqs.length;
      document.getElementById(`faq-button-${nextIndex}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + faqs.length) % faqs.length;
      document.getElementById(`faq-button-${prevIndex}`)?.focus();
    }
  };

  return (
    <section
      id="faq"
      className="relative border-t border-slate-900/80 bg-gradient-to-b from-slate-950 to-slate-950/95 px-4 py-16 sm:px-6 md:px-8 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-50">Common Questions</h2>
          <p className="text-slate-400">Everything you need to know about Track App</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950/40">
                <button
                  id={`faq-button-${index}`}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors duration-150 hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-inset"
                >
                  <span className="pr-4 text-lg font-semibold text-slate-50">{faq.question}</span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-orange-400 transition-transform duration-200 ease-out ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  id={`faq-content-${index}`}
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 pt-0 text-sm leading-relaxed text-slate-300">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
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
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange-400/80">{eyebrow}</p>
          )}
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">{title}</h2>
          {kicker && <p className="mt-3 text-sm text-slate-400 md:text-base">{kicker}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TrackAppHeroPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-900/40 bg-slate-950/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image src={trackLogo} alt="Track App logo" width={32} height={32} className="h-8 w-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Track App</span>
              <span className="text-[11px] text-slate-500">Racing Analytics &amp; Coaching Platform</span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <a href="/" className="hover:text-slate-50">Home</a>
            <a href="#features" className="hover:text-slate-50">Features</a>
            <a href="#stack" className="hover:text-slate-50">Tech Stack</a>
            <a href="#numbers" className="hover:text-slate-50">Performance</a>
            <a href="#story" className="hover:text-slate-50">Story</a>
            <a href="#pilot" className="hover:text-slate-50">Pilot</a>
            <a href="#faq" className="hover:text-slate-50">FAQ</a>
          </nav>

          {/* Only 2 CTAs in header: Live Demo + Pilot */}
          <div className="flex items-center gap-2">
            <a
              href={COACH_DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/40 hover:bg-white"
            >
              Live Demo
            </a>
            <a
              href={PILOT_MAILTO}
              className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-slate-950/40 px-4 py-2 text-xs font-medium text-slate-50 hover:border-orange-400/80 hover:text-orange-100"
            >
              Request pilot access
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="relative z-10">
        <section className="relative overflow-hidden border-b border-slate-900/70">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <Image src={heroBurst} alt="" fill priority className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-slate-950/40" />
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 text-center sm:px-6 md:px-8 lg:pt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-300/80">Portfolio • Track App</p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.75rem]">
              The coaching OS for track-day programs
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
              Track App turns lap data into coach-ready insights in under a second. Export CSV from RaceChrono / TrackAddict / AiM → upload to the portal → coach from one mobile dashboard.
            </p>

            {/* HERO CTAs: keep it to 2 */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={COACH_DEMO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/40 hover:bg-white"
              >
                Live Demo ↗
              </a>
              <a
                href={PILOT_MAILTO}
                className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:border-orange-400/80 hover:text-orange-100"
              >
                Request pilot access
              </a>
            </div>

            <ul className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-2 text-xs text-slate-200 sm:flex-row sm:gap-6">
              <li className="inline-flex items-center gap-2"><span className="text-amber-400">✓</span> No iOS app required (CSV-first)</li>
              <li className="inline-flex items-center gap-2"><span className="text-amber-400">✓</span> Works with RaceChrono, TrackAddict, AiM</li>
              <li className="inline-flex items-center gap-2"><span className="text-amber-400">✓</span> Upload + validate in ~15 seconds</li>
            </ul>

            {/* HERO IMAGE: no longer a clickable Session Demo CTA */}
            <div className="mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950/70 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur">

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">WEEKEND IMPACT</p>
                <p className="mt-2 text-sm font-semibold text-slate-50">Less admin, more coaching</p>
                <p className="mt-1 text-sm text-slate-400">
                  Review 10–15 drivers between sessions without juggling apps or spreadsheets. One place for pace trends, best laps, and coaching notes.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">BUILT FOR</p>
                <p className="mt-2 text-sm font-semibold text-slate-50">HPDE &amp; track-day programs</p>
                <p className="mt-1 text-sm text-slate-400">
                  Designed around HPDE weekends, private coaching days, and multi-driver programs—not pie-in-the-sky telemetry or teams with data engineers.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">PLAYS NICE WITH</p>
                <p className="mt-2 text-sm font-semibold text-slate-50">Your existing timing apps</p>
                <p className="mt-1 text-sm text-slate-400">
                  Works alongside tools like RaceChrono, RaceBox, and AiM. No iOS app required—export CSV, upload, and start coaching from one dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DATA IN */}
        <Section
          id="data-in"
          eyebrow="DATA IN"
          title="CSV-First Import That Matches Real Weekend Workflows"
          kicker="Track App doesn’t replace your lap timer. It sits above it—organizing sessions, drivers, and coaching notes in one dashboard."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">STEP 1</p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">Export CSV</h3>
              <p className="mt-2 text-sm text-slate-300">
                Export session CSVs from RaceChrono, TrackAddict, AiM, SoloStorm (or any timing system).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">STEP 2</p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">Upload &amp; Validate</h3>
              <p className="mt-2 text-sm text-slate-300">
                Upload to the coach portal. Track App validates and maps the file so it lands cleanly in the right session view.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">STEP 3</p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">Coach From One Dashboard</h3>
              <p className="mt-2 text-sm text-slate-300">
                Review 10–15 drivers trackside on phone or tablet: pace trends, best laps, consistency, and notes—without spreadsheets.
              </p>
            </div>
          </div>

          {/* Contextual CTA: Try CSV Import lives here (not in hero) */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-xs text-slate-400">
              Want to test the workflow end-to-end?
            </p>
            <a
              href={CSV_IMPORT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-5 py-2 text-xs font-semibold text-slate-50 hover:border-slate-500 hover:text-white"
            >
              Try CSV Import ↗
            </a>
          </div>
        </Section>

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
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">{card.title}</h3>
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

          {/* Optional / Beta callout (not a main CTA) */}
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Optional • Beta
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Session-view sandbox (single-screen demo)
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  This is a standalone “session view” demo—helpful for visuals, but the real product story is the coach dashboard.
                </p>
              </div>
              <a
                href={BETA_SESSION_URL}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-4 py-2 text-xs font-semibold text-slate-50 hover:border-slate-500 hover:text-white"
              >
                Open Beta Session Demo ↗
              </a>
            </div>
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
                Track App v2.4 represents a major production milestone: mobile-first responsive design, 50x performance optimization, and advanced filtering with CSV export. This isn't a prototype—it's production-deployed coaching infrastructure.
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
                  <li>• Problem: 50+ database queries per page (N+1 issue, 3-5s loads)</li>
                  <li>• Solution: Single optimized query with Supabase aggregations</li>
                  <li>• Result: Sub-100ms page loads, scalable to 1,000+ sessions</li>
                  <li>• Same pattern across Home, Sessions, and Coach Dashboard pages</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Tech Stack</p>
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

        {/* Core capabilities */}
        <Section
          id="capabilities"
          eyebrow="CORE CAPABILITIES"
          title="Everything Coaches Need, Trackside"
          kicker="Mobile-optimized workflows for coaches reviewing 12–15 drivers between 20-minute sessions. Card-based layouts on phone, table layouts on desktop."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreCapabilities.map((cap) => (
              <div key={cap.title} className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <h3 className="text-sm font-semibold text-slate-50">{cap.title}</h3>
                <p className="text-xs text-slate-400">{cap.description}</p>
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
        <Section id="numbers" eyebrow="Execution Metrics" title="Production-Deployed & Performance-Optimized">
          <div className="grid gap-6 md:grid-cols-3">
            {metrics.map((block) => (
              <div key={block.title} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <h3 className="text-sm font-semibold text-slate-50">{block.title}</h3>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                  {block.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-blue-600/10 p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚡</span>
              <div>
                <h3 className="text-sm font-semibold text-orange-400">Performance Optimization Deep-Dive</h3>
                <p className="mt-2 text-xs text-slate-300">
                  <strong className="text-slate-100">The Problem:</strong> 50+ database queries per page load caused 3-5 second loads.
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  <strong className="text-slate-100">The Solution:</strong> Server-side Supabase aggregation (COUNT/MAX/JOIN) instead of client-side loops.
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  <strong className="text-slate-100">The Result:</strong> 50x improvement. Sub-100ms page loads. Scales to 1,000+ sessions.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Story */}
        <Section id="story" eyebrow="Why Mobile-First Matters" title="Built for Real Trackside Coaching Workflows">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Coaches don't work at desks with dual monitors. They work in paddocks between sessions, reviewing data on phones or tablets while drivers prep for the next run group.
              </p>
              <p>
                Track App v2.4 is built mobile-first—not a desktop app squeezed onto a phone. Card-based mobile layouts. Touch-optimized interactions. Advanced filtering without clutter.
              </p>
              <p>
                The 50x performance optimization isn’t just a tech flex—it means coaches can review 12 drivers fast enough for it to matter between sessions.
              </p>

              {/* Small, consistent CTA (text-link) to Live Demo */}
              <div className="pt-2">
                <a
                  href={COACH_DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-orange-300/90 hover:text-orange-200"
                >
                  Open the Live Demo ↗
                </a>
              </div>
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

        {/* Pilot section (was #faq before) */}
        <Section id="pilot" eyebrow="Ready for Pilot Testing" title="Pilot Programs (Q1 2026)">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Track App v2.4 is production-deployed and stable. The goal now is validating real weekend workflows with 2–3 pilot programs, then refining based on coach feedback.
              </p>
              <p className="text-sm font-semibold text-slate-100">Ideal for:</p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• HPDE coaches managing 12-20 drivers per event</li>
                <li>• Driving schools that want consistent notes + progress tracking</li>
                <li>• Programs that want to scale coaching quality without spreadsheets</li>
              </ul>
              <p className="text-xs text-slate-400">
                If you want to explore a pilot, reach out. I’ll tailor the workflow to your weekend reality.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-200">
              <p className="font-semibold text-slate-50">Pilot access</p>
              <p className="text-xs text-slate-400">
                Keep it simple: one coach dashboard, CSV-first workflow, and feedback-driven iteration.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={PILOT_MAILTO}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-blue-600 px-4 py-2 text-xs font-semibold text-slate-50 shadow-lg shadow-orange-500/40 hover:brightness-110"
                >
                  Request pilot access
                </a>
                <a
                  href={COACH_DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 hover:border-blue-600/60 hover:text-white"
                >
                  Open Live Demo ↗
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950 px-4 py-6 text-[11px] text-slate-500 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p>Production-Ready, Mobile-First Coach OS • Track App v2.4</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={COACH_DEMO_URL} target="_blank" rel="noreferrer" className="hover:text-slate-300">
              Live Demo
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <a href={PILOT_MAILTO} className="hover:text-slate-300">
              Request Pilot Access
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
