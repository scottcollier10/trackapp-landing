'use client';

import { useState } from "react";
import Image from "next/image";

import trackLogo from "@/public/images/trackapp-logo.png";
import heroBurst from "@/public/images/hero-burst.webp";
import heroCoach from "@/public/images/trackapp-hero-coach-tablet.webp";

import coreMulti from "@/public/images/core-multidevice.webp";
import coreProgress from "@/public/images/core-longitudinal-progress.webp";
import coreSession from "@/public/images/core-session-analysis.webp";
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
// CONTENT
// ============================================================================

const programCards = [
  {
    title: "Roster View (Lead Instructor Mode)",
    description:
      "A program-level roster you can scan fast: best laps, trends, consistency, and quick flags. Built for oversight across 10 to 15 drivers, not single-driver deep dives.",
    image: coreMulti,
  },
  {
    title: "Returning Driver History",
    description:
      "Keep continuity across weekends. See progress over time, track what was coached last event, and avoid starting from zero when instructors rotate.",
    image: coreProgress,
  },
  {
    title: "Session Snapshot",
    description:
      "A quick read on what changed in a session, where the driver settled, and what needs attention next session. Useful between runs when time is limited.",
    image: coreSession,
  },
  {
    title: "CSV Import + Export",
    description:
      "Drivers keep using RaceChrono, TrackAddict, AiM, SoloStorm, or any timing system. Track App organizes it into a comprehensive coaching workflow and exports clean views for debriefs.",
    image: coreCsv,
  },
];

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

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is Track App another lap timer app?",
      answer:
        "No. Track App does not replace lap timers. It sits above them and turns exports into a program-level coaching workflow, including roster view, driver history, notes, and progress tracking.",
    },
    {
      question: "What does it do that RaceChrono or TrackAddict does not?",
      answer:
        "Timing apps are great at capturing laps. Track App is built for coaching continuity and program oversight, helping a lead instructor review multiple drivers quickly, keep notes consistent, and track improvement across weekends.",
    },
    {
      question: "How does data get into the system?",
      answer:
        "CSV-first. Export session data from the timing system drivers already use, upload to the portal, and Track App validates and maps it into the correct driver and session context.",
    },
    {
      question: "Does everyone need to adopt it at once?",
      answer:
        "No. A pilot can start with a subset of drivers who already export CSVs. The roster view and history still create value, and adoption can expand over time.",
    },
    {
      question: "What would a pilot look like?",
      answer:
        "One event, small scope. Start with 10 to 20 drivers, import CSVs, use the roster and history during and after sessions, and export summary views for debrief and follow-up.",
    },
  ];

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

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
          <h2 className="mb-3 text-3xl font-bold text-slate-50">
            Common Questions
          </h2>
          <p className="text-slate-400">How this fits HPDE weekend reality</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950/40"
              >
                <button
                  id={`faq-button-${index}`}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors duration-150 hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-inset"
                >
                  <span className="pr-4 text-lg font-semibold text-slate-50">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-orange-400 transition-transform duration-200 ease-out ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  id={`faq-content-${index}`}
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 pt-0 text-sm leading-relaxed text-slate-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN
// ============================================================================

export default function TrackAppHeroPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      

      {/* HERO */}
      <main className="relative z-10">
        <section className="relative overflow-hidden border-b border-slate-900/70">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <Image src={heroBurst} alt="" fill priority className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-slate-950/45" />
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 text-center sm:px-6 md:px-8 lg:pt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-300/80">
              HPDE programs • pilot-ready
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.75rem]">
              The coaching workflow layer for HPDE weekends
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-200 sm:text-base">
              Track App turns lap-timer exports into a fast, mobile-first program roster view so a lead instructor can review 10 to 15 drivers in minutes, keep notes consistent across weekends, and prove improvement.
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-300 sm:text-base">
              Drivers keep using RaceChrono, TrackAddict, AiM, SoloStorm, or any commercial timing system. Track App organizes it into a comprehensive coach workflow.
            </p>

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
              <li className="inline-flex items-center gap-2">
                <span className="text-amber-400">✓</span> CSV-first, no new app mandate
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="text-amber-400">✓</span> Built for lead instructor visibility
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="text-amber-400">✓</span> Works with partial adoption
              </li>
            </ul>

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
                    <span className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">
                      Program dashboard preview
                    </span>
                    <span className="text-[0.7rem] text-slate-200">
                      Roster view, history, coaching continuity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <Section
          id="workflow"
          eyebrow="WORKFLOW"
          title="CSV-First Import That Matches Real HPDE Weekends"
          kicker="No new capture system required. Start with what drivers already export, then run the weekend from a single program view."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">
                STEP 1
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Export CSV
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Export session CSVs from RaceChrono, TrackAddict, AiM, SoloStorm, or any timing system.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">
                STEP 2
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Upload &amp; Validate
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Upload to the portal. Track App validates and maps data into the right driver and session context.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-400">
                STEP 3
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Coach From One View
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Review the roster, history, and progress quickly, then export clean summary views for debrief and follow-up.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-xs text-slate-400">Want to test the workflow end-to-end?</p>
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

        {/* PROGRAM VIEW */}
        <Section
          id="program"
          eyebrow="PROGRAM VIEW"
          title="What a Program Gets"
          kicker="Everything is designed around lead instructor visibility and multi-event continuity, without changing what drivers already use."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {programCards.map((cap) => (
              <div
                key={cap.title}
                className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5"
              >
                <h3 className="text-sm font-semibold text-slate-50">{cap.title}</h3>
                <p className="text-xs text-slate-400">{cap.description}</p>
                <div className="relative mt-1 aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                  <Image
                    src={cap.image}
                    alt={`${cap.title} screenshot mock`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Optional visual demo link (kept small, not competing with the main story) */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Optional visual demo
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Video plus coaching notes in a single session view. Useful for visuals, not required for the pilot.
                </p>
              </div>
              <a
                href={BETA_SESSION_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-5 py-2 text-xs font-semibold text-slate-50 hover:border-slate-500 hover:text-white"
              >
                Open Beta Session Demo ↗
              </a>
            </div>
          </div>
        </Section>

        {/* CREDIBILITY */}
        <Section
          id="credibility"
          eyebrow="CREDIBILITY"
          title="Production-deployed. Trackside-fast."
          kicker='The only thing worse than “no tool” is a tool that breaks at the track. Track App is built to be stable, fast, and usable on mobile where coaches actually work.'
        >
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:p-8">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Built for real weekend execution
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Track App is production-deployed and mobile-first. It stays responsive in the paddock,
                    supports real weekend workflows, and keeps rosters, notes, and session history organized
                    without spreadsheets.
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-slate-400">
                    It is intentionally simple. Fast roster scanning and continuity come first, then features expand based on real pilot feedback.
                  </p>
                </div>

                <div className="text-left">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    What you can expect
                  </h3>
                  <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400/80" />
                      Mobile-first layouts that work on phones between sessions
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400/80" />
                      Fast search and filtering across drivers, tracks, and dates
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400/80" />
                      Clean CSV validation and reliable imports
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400/80" />
                      Designed to scale for large weekend rosters and repeat drivers
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* PILOT */}
        <Section
          id="pilot"
          eyebrow="PILOT"
          title="Pilot Programs, Small Scope"
          kicker="The goal is simple: validate whether this reduces admin and improves continuity for a real HPDE weekend."
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4 text-sm text-slate-300">
              <p className="text-sm font-semibold text-slate-100">
                Pilot scope (kept intentionally small):
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• One event</li>
                <li>• 10 to 20 drivers (start with drivers who already export data)</li>
                <li>• Use roster view and driver history during and after sessions</li>
                <li>• Export summary views for debrief and follow-up</li>
              </ul>
              <p className="text-xs text-slate-400">
                If it does not create obvious value in a weekend, it is not worth anyone’s time. That is the test.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-200">
              <p className="font-semibold text-slate-50">Pilot access</p>
              <p className="text-xs text-slate-400">
                CSV-first, program dashboard, feedback-driven iteration.
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

      {/* FOOTER */}
      <footer className="border-t border-slate-900/80 bg-slate-950 px-4 py-6 text-[11px] text-slate-500 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p>Track App • Program-level coaching workflow (HPDE)</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={COACH_DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300"
            >
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
