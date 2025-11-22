'use client';

export default function TrackAppShowcase() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
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
       <section className="relative overflow-hidden border-b border-slate-900/80 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950/90">
        <div className="pointer-events-none absolute inset-y-0 right-[-20%] h-[140%] w-[60%] rotate-6 bg-gradient-to-br from-orange-500/25 via-red-500/18 to-purple-700/35 blur-3xl" />
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-14 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:pb-20 lg:pt-20">
          <div className="relative z-10 max-w-xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-300/80">
              Portfolio • Track App
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              AI Racing Coach for Amateur Drivers
            </h1>
            <p className="text-sm text-slate-300 sm:text-base">
              A production-grade platform for transforming track day data into
              AI-powered coaching. Architected with Next.js, Supabase, and
              Claude Sonnet 4.5 to support drivers, coaches, and future orgs.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://trackapp-portal.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
              >
                View Live Demo ↗
              </a>
              <a
                href="https://github.com/scottcollier10/track-app-mvp"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-500 bg-slate-950 px-4 py-2 text-xs font-medium text-slate-200 hover:border-purple-500"
              >
                See the Code
              </a>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 text-xs text-slate-300">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Timeline
                </p>
                <p>6 months (part-time)</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Scope
                </p>
                <p>Architecture, frontend, backend, AI pipeline</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Stack
                </p>
                <p>Next.js • Supabase • Claude</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex-1 space-y-4">
            <div className="flex aspect-video items-center justify-center rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-purple-900/40">
              <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-400">
                Hero screenshot placeholder – session detail + AI insights
              </span>
            </div>
            <div className="grid gap-3 text-[11px] text-slate-400 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Insight Engine
                </p>
                <p className="mt-1 text-xs text-emerald-300">
                  Consistency: 89 / 100
                </p>
                <p className="mt-1">
                  Structured prompts + telemetry for per-session coaching.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Data Layer
                </p>
                <p className="mt-1">
                  PostgreSQL with RLS, multi-tenant from day one.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Frontend
                </p>
                <p className="mt-1">
                  Next.js App Router + Tailwind, tuned for fast lap-time
                  browsing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple body: problem / solution / outcome */}
      <section className="border-b border-slate-900/80 bg-slate-950 px-4 py-14 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-orange-400/80">
              Problem
            </p>
            <p className="text-sm text-slate-200">
              Amateur drivers have plenty of data, but not much insight—and
              hiring a coach every weekend is unrealistic.
            </p>
            <p className="text-xs text-slate-400">
              Existing apps focus on logging laps, not guiding improvement over
              seasons or making AI coaching feel trustworthy.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-purple-300/80">
              Solution
            </p>
            <p className="text-sm text-slate-200">
              Track App scores every session for consistency, pace trends, and
              fatigue, then feeds that into AI coaching that&apos;s explainable,
              not mysterious.
            </p>
            <p className="text-xs text-slate-400">
              The system is architected like a platform: multi-tenant database,
              structured AI prompts, lean client bundle.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-300/80">
              Outcome
            </p>
            <p className="text-sm text-slate-200">
              A working MVP with a live demo, clean UI, and a foundation that
              makes new features—like coach dashboards—cheap to ship.
            </p>
            <p className="text-xs text-slate-400">
              It&apos;s both a product and a proof-of-execution for platform
              work in AI-assisted tools.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 pb-16 pt-10 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-4 text-sm text-slate-300">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              My Role
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>• Product definition and UX</li>
              <li>• Data model and Supabase schema</li>
              <li>• Next.js frontend + component system</li>
              <li>• Claude Sonnet 4.5 prompt design and integration</li>
              <li>• Deployments, monitoring, and iteration</li>
            </ul>
            <p>
              I approached this like a platform engagement: get the core
              architecture right, then make every future feature feel cheap.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Interested?
              </p>
              <p className="mt-2 text-sm text-slate-200">
                I&apos;m open to roles, collaborations, or pilots where this kind
                of platform thinking and execution speed matter.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <a
                  href="https://linkedin.com/in/scottcollier"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-950 px-4 py-2 font-medium text-slate-100 hover:border-orange-500"
                >
                  Connect on LinkedIn
                </a>
                <a
                  href="https://trackapp-portal.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-950 hover:bg-slate-200"
                >
                  Explore the Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
