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
// DATA ARRAYS (Chin-focused copy)
// ============================================================================

const featureCards = [
  {
    title: "Program-Level Dashboard (Mobile-First)",
    body:
      "Built for lead instructors and organizers—not a desktop tool squeezed onto a phone. Quick scans between sessions: who needs help, who improved, who needs a follow-up.",
    image: featureMobile,
  },
  {
    title: "Fast Enough to Use Trackside",
    body:
      "If it isn’t instant, it doesn’t get used. The dashboard stays snappy on mobile even with large rosters and lots of history—so it works in the paddock, not just at home.",
    image: featurePerf,
  },
  {
    title: "Filters + CSV Workflow That Fits Chin Reality",
    body:
      "Search + multi-select filters by track, date, driver, and car—plus simple CSV import/export for weekend debriefs. Start with the drivers who already have data; expand later.",
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
    title: "What Matters to Chin",
    items: [
      "Trackside-ready (mobile-first UI)",
      "Program-level view (not 1:1 coaching)",
      "Works with partial data adoption",
    ],
  },
  {
    title: "What’s Live Today",
    items: [
      "Coach dashboard + driver history",
      "CSV import + validation flow",
      "Export for weekend / program analysis",
      "Live demo environment",
    ],
  },
  {
    title: "Implementation Reality",
    items: [
      "No hardware changes required",
      "No “everyone must install an app” requirement",
      "Pilot can start with 10–20 drivers",
      "Iterate based on Chin feedback",
    ],
  },
];

const coreCapabilities = [
  {
    title: "Roster View (Lead Instructor Mode)",
    description:
      "One screen to oversee a full weekend roster: best laps, trends, consistency, and quick flags—built for organizers and chief instructors managing multiple instructor/student pairs.",
    image: coreMulti,
  },
  {
    title: "Session Snapshot",
    description:
      "Fast, readable session breakdowns that help an instructor or lead coach answer: what changed, what’s improving, and what needs attention next session.",
    image: coreSession,
  },
  {
    title: "Driver-to-Driver Comparison",
    description:
      "Compare drivers cleanly when it’s useful (same track/day/car class). Helpful for triage and coaching conversations—not analysis for the sake of analysis.",
    image: coreCompare,
  },
  {
    title: "Returning Driver History",
    description:
      "The real value for a program: persistent history across events. See whether a driver is improving over time and keep coaching continuity even when instructors rotate.",
    image: coreProgress,
  },
  {
    title: "Program Filters That Don’t Fight You",
    description:
      "Filter by track, date, driver, car—save time finding the right context. Built to support quick decisions between sessions, not deep research later.",
    image: coreFilter,
  },
  {
    title: "CSV Import + Export (Work With What Drivers Already Use)",
    description:
      "Drivers can keep using RaceChrono, TrackAddict, AiM, SoloStorm—or any timing system. Track App organizes it into a comprehensive coach workflow, then exports clean views for debriefs.",
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
      question: "Is Track App trying to replace RaceChrono or TrackAddict?",
      answer:
        "No. Chin doesn’t need another lap timer war. Track App sits above timing apps and organizes whatever data exists into a program-level coaching workflow—rosters, history, notes, and progress across events.",
    },
    {
      question: "What if only some drivers have data/video?",
      answer:
        "That’s normal—especially at HPDE events. The pilot can start with the drivers who already export CSVs. The dashboard still provides value through roster organization, history, and continuity (and you can expand data coverage over time).",
    },
    {
      question: "Who is this actually for inside Chin?",
      answer:
        "Lead instructors, organizers, and anyone responsible for coaching quality across the weekend—not the 1:1 coach working two drivers and debriefing verbally. This is for oversight, continuity, and scale.",
    },
    {
      question: "Is there any AI in this, or is it just dashboards?",
      answer:
        "The core is intentionally non-gimmicky: fast roster views + history + notes + CSV workflows. AI is optional and only worth adding if it saves time (e.g., summarizing notes across sessions, surfacing recurring issues, or drafting debrief bullets).",
    },
    {
      question: "What would a Chin pilot look like (realistically)?",
      answer:
        "Simple: pick one event, start with a subset (10–20 drivers who already have data), import CSVs, and use the roster view + driver history during/after sessions. The goal is to validate whether it reduces admin and improves continuity—then refine.",
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
          <p className="text-slate-400">How this fits a Chin-style HPDE program</p>
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
              <span className="text-[11px] text-slate-500">Program-level coaching workflow</span>
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
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-300/80">
              Pilot concept • HPDE programs
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.75rem]">
              The coaching workflow layer for Chin-style weekends
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
              Drivers keep using RaceChrono, TrackAddict, AiM, SoloStorm (or any timing system).
              Track App organizes it into a program-level coach workflow: roster view, history, notes, and progress across events.
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
              <li className="inline-flex items-center gap-2"><span className="text-amber-400">✓</span> No new app requirement (CSV-first)</li>
              <li className="inline-flex items-center gap-2"><span className="text-amber-400">✓</span> Works even with partial data adoption</li>
              <li className="inline-flex items-center gap-2"><span className="text-amber-400">✓</span> Built for lead instructor visibility</li>
            </ul>

            {/* HERO IMAGE */}
            <div className="mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950/70 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={heroCoach}
                  alt="Track App coaching screens preview"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/0 to-slate-950/0" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-4 text-xs font-medium text-slate-200 md:px-8">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">Program dashboard preview</span>
                    <span className="text-[0.7rem] text-slate-200">Roster view • driver history • coaching continuity</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">WEEKEND IMPACT</p>
                <p className="mt-2 text-sm font-semibold text-slate-50">Less admin, better continuity</p>
                <p className="mt-1 text-sm text-slate-400">
                  Organize drivers and sessions in one place so instructors spend less time chasing context—and more time coaching.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">BUILT FOR</p>
                <p className="mt-2 text-sm font-semibold text-slate-50">Lead instructors + organizers</p>
                <p className="mt-1 text-sm text-slate-400">
                  Designed for programs coordinating multiple instructors and many drivers across a weekend (and across a season).
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">PLAYS NICE WITH</p>
                <p className="mt-2 text-sm font-semibold text-slate-50">Whatever drivers already run</p>
                <p className="mt-1 text-sm text-slate-400">
                  No hardware overhaul. No mandate. Start with CSV imports from common apps and build from there.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DATA IN */}
        <Section
          id="data-in"
          eyebrow="DATA IN"
          title="CSV-First Import That Matches Real HPDE Weekends"
          kicker="No new capture system required. Start with drivers who already export data—Track App organizes it into a program-level coaching workflow."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">STEP 1</p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">Export CSV</h3>
              <p className="mt-2 text-sm text-slate-300">
                Drivers can keep using RaceChrono, TrackAddict, AiM, SoloStorm—or any commercial timing system.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">STEP 2</p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">Upload &amp; Validate</h3>
              <p className="mt-2 text-sm text-slate-300">
                Upload to the coach portal. Track App validates and maps the file so it lands cleanly in the right driver/session context.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">STEP 3</p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">Run the Weekend From One View</h3>
              <p className="mt-2 text-sm text-slate-300">
                Lead instructors get the roster + history: who’s improving, who needs attention, and what was coached last time—without spreadsheets.
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

        {/* Features */}
        <Section
          id="features"
          eyebrow="FOCUS"
          title="Built Around Chin’s Real Use Case"
          kicker="This is not a “more telemetry” pitch. It’s a program-level workflow: roster visibility, continuity across instructors, and progress across events."
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

          {/* Optional / Beta callout (kept, but reframed) */}
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Optional • Beta
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Video + coaching notes session view (visual demo)
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Useful for showing what “coach notes tied to a moment” can look like. Not required for the Chin pilot—the roster + history is the core story.
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
          eyebrow="Credibility"
          title="Not a Garage Prototype"
          kicker="The only thing worse than “no tool” is a tool that breaks at the track. This is built to be stable, fast, and usable on mobile—where coaches actually work."
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Chin doesn’t need “AI magic.” It needs a reliable system that reduces admin, improves continuity, and makes it easier to run coaching at scale.
              </p>
              <p>
                Track App is production-deployed and mobile-first. It’s designed to stay responsive in the paddock, with clean filtering and CSV workflows that match how HPDE weekends actually operate.
              </p>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  What you can expect
                </h3>
                <ul className="mt-2 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                  <li>• Mobile-first layouts (cards on phone)</li>
                  <li>• Desktop tables when you want them</li>
                  <li>• Fast filtering + search</li>
                  <li>• CSV validation and clean imports</li>
                  <li>• Built to handle “lots of sessions”</li>
                  <li>• Iterates quickly with pilot feedback</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Optional AI (only if it saves time)
                </h3>
                <ul className="mt-2 space-y-2 text-xs text-slate-300">
                  <li>• Summarize coaching notes across a weekend</li>
                  <li>• Surface recurring themes (braking, turn-in, consistency)</li>
                  <li>• Draft a debrief bullet list per driver</li>
                  <li>• Nothing “AI” is required for the pilot</li>
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
          title="What Chin Actually Gets"
          kicker="A program-level workflow that supports weekend execution and multi-event continuity—without changing what drivers already use."
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
        <Section id="numbers" eyebrow="Execution" title="A Chin Pilot Package, Not a Fantasy Roadmap">
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
                <h3 className="text-sm font-semibold text-orange-400">The “it has to be fast” point</h3>
                <p className="mt-2 text-xs text-slate-300">
                  This isn’t about impressive charts. It’s about whether a lead instructor can actually use it between sessions.
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  The build is optimized for quick loading and quick scanning—so it behaves like trackside infrastructure, not a hobby app.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Story */}
        <Section id="story" eyebrow="Why this exists" title="Because “Good Coaching” Doesn’t Scale on Sticky Notes">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Most HPDE programs run on experience, people, and a lot of manual glue. That works—until you want continuity across instructors,
                better follow-up for returning drivers, and a program-level view of who needs attention.
              </p>
              <p>
                Track App is built for that missing layer: a shared system that keeps driver history, ties it to sessions, and makes it easy to run a weekend
                without jumping between spreadsheets, apps, and memory.
              </p>
              <p>
                If Chin never cares about “AI,” that’s fine. The value is the workflow: roster visibility + continuity + progress across events.
              </p>

              {/* Small CTA */}
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

        {/* Pilot section */}
        <Section id="pilot" eyebrow="Pilot proposal" title="Chin Pilot (One Event, Small Scope)">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                The goal isn’t to “sell software.” It’s to validate whether this reduces admin and improves continuity for a Chin-style weekend.
              </p>
              <p className="text-sm font-semibold text-slate-100">Pilot scope (kept intentionally small):</p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• One event</li>
                <li>• 10–20 drivers (start with drivers who already export data)</li>
                <li>• Use roster view + driver history during/after sessions</li>
                <li>• Export summary views for debrief / follow-up</li>
              </ul>
              <p className="text-xs text-slate-400">
                If it doesn’t create obvious value in a weekend, it’s not worth anyone’s time. That’s the test.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-200">
              <p className="font-semibold text-slate-50">Pilot access</p>
              <p className="text-xs text-slate-400">
                Keep it simple: CSV-first, program dashboard, feedback-driven iteration.
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
          <p>Track App • Program-level coaching workflow (HPDE pilot)</p>
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
