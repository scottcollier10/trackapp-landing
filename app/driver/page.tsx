'use client';

import React from "react";

const events = [
  {
    label: "Laguna Seca",
    date: "Dec 1, 2025",
    sessions: 2,
    bestLap: "1:33.800",
    consistency: 99,
    source: "RaceChrono",
  },
  {
    label: "Laguna Seca",
    date: "Nov 9, 2025",
    sessions: 2,
    bestLap: "1:36.100",
    consistency: 98,
    source: "RaceChrono",
  },
  {
    label: "Laguna Seca",
    date: "Oct 12, 2025",
    sessions: 2,
    bestLap: "1:32.800",
    consistency: 97,
    source: "RaceChrono",
  },
  {
    label: "Thunderhill",
    date: "Sep 11, 2025",
    sessions: 1,
    bestLap: "1:34.000",
    consistency: 95,
    source: "RaceChrono",
  },
];

export default function DriverPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-12 lg:py-14">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Progress mockup
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              Driver progress – Johnny Hayes
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400 md:text-base">
              Four HPDE events at Thunderhill over one season. Best-lap and
              consistency trends make improvement obvious and coaching
              conversations concrete.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              Same car, same configuration
            </span>
            <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1">
              Demo data · v2.4 layout
            </span>
          </div>
        </header>

        {/* Stat row */}
        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <ProgressStat
            label="Best lap progress"
            main="1:32.8 → 1:28.5"
            chip="+4.3s"
            description="Same car, same configuration, four visits to Thunderhill across four months."
          />
          <ProgressStat
            label="Consistency trend"
            main="82 → 95 /100"
            chip="Much more repeatable"
            description="Lap-to-lap variance drops as Johnny learns to manage tires, traffic, and pace."
          />
          <ProgressStat
            label="Peak window"
            main="Lap 9 → Lap 5"
            chip="Finding pace sooner"
            description="Best laps show up earlier in the stint as confidence and tire prep improve."
          />
        </section>

        {/* Charts */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Best lap by event */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-sky-900/30">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Best lap by event – Thunderhill
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Event-to-event improvement with a season goal overlay.
                </p>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] text-slate-300">
                Season target · 1:28.0
              </span>
            </div>

            <div className="mt-4 space-y-5">
              {/* Simple faux line chart using bars */}
              <div className="relative h-40 rounded-xl bg-slate-950/80 p-4">
                <div className="absolute inset-x-6 top-6 flex justify-between text-[10px] text-slate-500">
                  {events.map((e, i) => (
                    <span key={e.date}>E{i + 1}</span>
                  ))}
                </div>
                <div className="flex h-full items-end justify-between gap-2 pt-6">
                  {events.map((e, i) => {
                    // fake progression: earlier events = taller (slower)
                    const height = 60 + (events.length - i) * 10;
                    return (
                      <div key={e.date} className="flex flex-col items-center">
                        <div
                          className="mb-1 w-4 rounded-full bg-gradient-to-t from-sky-500 via-emerald-400 to-emerald-300"
                          style={{ height: `${height}px` }}
                        />
                        <span className="text-[10px] text-slate-400">
                          {e.bestLap}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="pointer-events-none absolute inset-x-6 top-10 border-t border-dashed border-amber-400/60" />
              </div>

              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>
                  • E1–E4: Thunderhill events 1–4, same car and class, 2–3
                  sessions respectively.
                </li>
                <li>
                  • E2: brake pad upgrade, more confidence on entry; E3: focus on
                  late apex; E4: tire pressures dialed in.
                </li>
                <li>
                  • Coach view: quickly prove improvement and set the target for
                  the next visit.
                </li>
              </ul>
            </div>
          </div>

          {/* Consistency score */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-emerald-900/30">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Consistency score by event
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Higher score = tighter grouping around best laps.
                </p>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] text-slate-300">
                Target range · 92–96
              </span>
            </div>

            <div className="mt-4 h-40 rounded-xl bg-slate-950/80 p-4">
              <div className="flex h-full items-end justify-between gap-4">
                {events.map((e, i) => {
                  const base = 70;
                  const height = base + (i + 1) * 8;
                  return (
                    <div key={e.date} className="flex flex-col items-center">
                      <div
                        className="mb-1 w-5 rounded-full bg-gradient-to-t from-slate-700 via-sky-500 to-emerald-400"
                        style={{ height: `${height}px` }}
                      />
                      <span className="text-[10px] text-slate-400">
                        E{i + 1}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {e.consistency}/100
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-400">
              By event four, consistency climbs into the mid-90s. Much easier to
              coach race craft at this level—mistakes stand out instead of being
              buried in variance.
            </p>
          </div>
        </section>

        {/* Session history table */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-900/40">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Session history
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Quick access to raw sessions for debrief. Tap into any event to
                drill into lap-by-lap detail.
              </p>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] text-slate-300">
              Filter: last 90 days
            </span>
          </div>

          <div className="space-y-3">
            {events.map((event, idx) => (
              <div
                key={event.date}
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-50">
                      {event.label}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {event.date} · {event.sessions} sessions ·{" "}
                      {event.source}
                    </p>
                  </div>
                  <div className="flex gap-4 text-[11px] text-slate-300">
                    <span className="font-mono">
                      Best lap:{" "}
                      <span className="text-emerald-400">{event.bestLap}</span>
                    </span>
                    <span>
                      Consistency:{" "}
                      <span className="text-sky-300">
                        {event.consistency}/100
                      </span>
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-sky-500 hover:text-sky-200">
                    View sessions
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-6 text-[11px] text-slate-500">
          This page is intentionally focused on layout and copy. In the live
          app, charts would be powered by real session data and linked directly
          from the coach dashboard.
        </p>
      </div>
    </main>
  );
}

function ProgressStat({
  label,
  main,
  chip,
  description,
}: {
  label: string;
  main: string;
  chip: string;
  description: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
        {label}
      </p>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <p className="text-xl font-semibold text-slate-50">{main}</p>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
          {chip}
        </span>
      </div>
      <p className="mt-2 text-xs text-slate-400">{description}</p>
    </div>
  );
}
