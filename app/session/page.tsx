"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import trackLogo from "@/public/images/track-logo.png";
import { SpeedChart } from "@/components/charts/SpeedChart";
import { ThrottleChart } from "@/components/charts/ThrottleChart";
import { BrakeChart } from "@/components/charts/BrakeChart";
import { CompositeTelemetryChart } from "@/components/charts/CompositeTelemetryChart";
import {
  speedData,
  throttleData,
  brakeData,
  compositeData,
} from "@/lib/mockTelemetryData";
import heroBurst from "@/public/images/hero-burst.webp";

type Severity = "info" | "warn" | "critical";

interface Annotation {
  id: string;
  t: number; // seconds in video
  pos: number; // 0–1 around the lap
  type: string;
  severity: Severity;
  tags: string[];
  text: string;
  publish: boolean;
  createdAt: string;
}

interface DraftNote {
  t: number;
  pos: number;
  type: string;
  severity: Severity;
  tags: string;
  text: string;
  publish: boolean;
}

const STORAGE_KEY = "trackapp-demo-session-notes-v1";

function formatTime(t: number): string {
  if (!isFinite(t) || t < 0) return "0:00";
  const totalSeconds = Math.floor(t);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function loadStoredAnnotations(): Annotation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Annotation[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveAnnotations(annotations: Annotation[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
  } catch {
    // ignore
  }
}

function severityColor(severity: Severity): string {
  switch (severity) {
    case "info":
      return "text-sky-300 border-sky-500/40 bg-sky-500/5";
    case "warn":
      return "text-amber-300 border-amber-500/40 bg-amber-500/5";
    case "critical":
      return "text-rose-300 border-rose-500/40 bg-rose-500/5";
    default:
      return "text-sky-300 border-sky-500/40 bg-sky-500/5";
  }
}

function severityDot(severity: Severity): string {
  switch (severity) {
    case "info":
      return "bg-sky-400";
    case "warn":
      return "bg-amber-400";
    case "critical":
      return "bg-rose-400";
    default:
      return "bg-sky-400";
  }
}

/**
 * Simple oval track map with note pins.
 * pos (0–1) is mapped around the oval perimeter.
 */
function TrackMap({
  annotations,
  activePos,
  onAddAtPos,
}: {
  annotations: Annotation[];
  activePos: number | null;
  onAddAtPos: (pos: number) => void;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = rect.width * 0.32;
    const ry = rect.height * 0.38;

    // Convert (x,y) to angle around center
    const dx = x - cx;
    const dy = y - cy;
    let theta = Math.atan2(dy / ry, dx / rx); // -π..π
    if (theta < 0) theta += Math.PI * 2;
    const pos = theta / (Math.PI * 2); // 0..1
    onAddAtPos(pos);
  };

  // Helper: map 0–1 pos back to (x,y) for pins
  const pointForPos = (pos: number) => {
    const cx = 200;
    const cy = 120;
    const rx = 110;
    const ry = 70;
    const theta = pos * Math.PI * 2;
    const x = cx + rx * Math.cos(theta);
    const y = cy + ry * Math.sin(theta);
    return { x, y };
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 240"
      className="w-full h-56 rounded-3xl border border-slate-900/80 bg-slate-950/70 shadow-[0_0_80px_rgba(16,185,255,0.15)] cursor-crosshair"
      onClick={handleClick}
    >
      {/* Outer glow */}
      <defs>
        <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>

      <rect
        x="0"
        y="0"
        width="400"
        height="240"
        rx="32"
        className="fill-slate-950"
      />

      {/* Track outline (oval) */}
      <g transform="translate(200 120)">
        <ellipse
          rx="120"
          ry="78"
          fill="none"
          stroke="rgba(15,23,42,0.9)"
          strokeWidth={22}
        />
        <ellipse
          rx="110"
          ry="68"
          fill="none"
          stroke="url(#trackGradient)"
          strokeWidth={6}
        />
      </g>

      {/* Pins */}
      {annotations.map((a) => {
        const { x, y } = pointForPos(a.pos);
        const isActive =
          activePos !== null && Math.abs(a.pos - activePos) < 0.01;
        return (
          <g key={a.id} transform={`translate(${x},${y})`}>
            <circle
              r={8}
              className="fill-slate-950"
              strokeWidth={2}
              stroke="rgba(15,23,42,0.9)"
            />
            <circle
              r={5}
              className={
                "transition-all " +
                (a.severity === "critical"
                  ? "fill-rose-400"
                  : a.severity === "warn"
                  ? "fill-amber-300"
                  : "fill-sky-300")
              }
            />
            {isActive && (
              <circle
                r={11}
                className="fill-transparent stroke-sky-300/70 stroke-[1.5] animate-ping"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function SessionReviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const [videoSrc, setVideoSrc] = useState<string>("https://72wwpkyupbfa6lbi.public.blob.vercel-storage.com/demo/demo-lap.mp4");
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState<DraftNote | null>(null);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [annotateMode, setAnnotateMode] = useState<boolean>(true);
  const [overlayOn, setOverlayOn] = useState<boolean>(true);

  // Load stored notes
  useEffect(() => {
    setAnnotations(loadStoredAnnotations());
  }, []);

  // Persist notes
  useEffect(() => {
    saveAnnotations(annotations);
  }, [annotations]);

  const progress = duration > 0 ? currentTime / duration : 0;

  const openComposer = (draftOverride?: Partial<DraftNote>) => {
    const base: DraftNote = {
      t: currentTime,
      pos: progress || 0,
      type: "Coach note",
      severity: "info",
      tags: "",
      text: "",
      publish: false,
    };
    setDraft({ ...base, ...draftOverride });
    setComposerOpen(true);
  };

  const handleAddAtPlayhead = () => {
    if (!duration) return;
    openComposer({
      t: currentTime,
      pos: progress || 0,
    });
  };

  const handleSaveDraft = () => {
    if (!draft) return;
    const id = `a_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const tags = draft.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const ann: Annotation = {
      id,
      t: draft.t,
      pos: draft.pos,
      type: draft.type || "Coach note",
      severity: draft.severity || "info",
      tags,
      text: draft.text.trim(),
      publish: draft.publish,
      createdAt: new Date().toISOString(),
    };

    setAnnotations((prev) =>
      [...prev, ann].sort((a, b) => a.t - b.t)
    );
    setComposerOpen(false);
    setDraft(null);
    setActiveNoteId(id);
  };

  const handleDeleteNote = (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);
  };

  const handleClickNote = (a: Annotation) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = a.t;
    videoRef.current.play().catch(() => {});
    setCurrentTime(a.t);
    setActiveNoteId(a.id);
  };

  const handleUploadVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setCurrentTime(0);
    setDuration(0);
    setAnnotations([]); // fresh notes for this clip in demo
  };

  const handleTimelineClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = timelineRef.current;
    const vid = videoRef.current;
    if (!el || !vid || !duration) return;
    const rect = el.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    const clamped = Math.min(1, Math.max(0, frac));
    const t = clamped * duration;
    vid.currentTime = t;
    setCurrentTime(t);
  };

  const handleTrackAddAtPos = (pos: number) => {
    if (!annotateMode || !duration) return;
    const t = pos * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = t;
    }
    setCurrentTime(t);
    openComposer({ t, pos });
  };

  // Keyboard shortcuts similar-ish to the old HTML:
  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      if ((evt.target as HTMLElement)?.tagName === "INPUT" ||
          (evt.target as HTMLElement)?.tagName === "TEXTAREA") return;

      if (evt.key === "o" || evt.key === "O") {
        setOverlayOn((v) => !v);
      } else if (evt.key === "a" || evt.key === "A") {
        setAnnotateMode((v) => !v);
      } else if (evt.key === "n" || evt.key === "N") {
        handleAddAtPlayhead();
      } else if (evt.key === " ") {
        evt.preventDefault();
        const vid = videoRef.current;
        if (!vid) return;
        if (vid.paused) vid.play().catch(() => {});
        else vid.pause();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const exportJson = () => {
    const payload = {
      session: "COTA · Jul 4, 2025 · Lap 7",
      exportedAt: new Date().toISOString(),
      annotations,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trackapp-session-annotations.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const activeAnnotation =
    activeNoteId && annotations.find((a) => a.id === activeNoteId);
  const activePos = activeAnnotation ? activeAnnotation.pos : null;

  return (
    <div className="min-h-screen text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Burst Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src={heroBurst}
          alt=""
          fill
          priority
          className="object-cover opacity-80"
        />
        {/* Darken overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      {/* Main Content - add top padding for fixed nav */}
      <main className="pt-28 mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 lg:px-6">
        {/* Header */}
        <section>
          <p className="text-xs font-semibold tracking-[0.35em] text-amber-400/80">
            SESSION REVIEW · COACH DEMO
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              COTA · Jul 4, 2025 · Lap 7
            </h1>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1">
                Annotate:{" "}
                <span className="font-medium text-sky-300">
                  {annotateMode ? "ON" : "OFF"}
                </span>{" "}
                <span className="text-slate-500">(A)</span>
              </span>
              <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1">
                Overlay:{" "}
                <span className="font-medium text-sky-300">
                  {overlayOn ? "ON" : "OFF"}
                </span>{" "}
                <span className="text-slate-500">(O)</span>
              </span>
            </div>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-slate-400">
            Review video, drop coaching notes, and sync them with telemetry in a
            single view. Built for 20-minute sessions and 12–15 drivers per
            weekend.
          </p>
        </section>

        {/* Summary cards */}
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 px-4 py-3 shadow-lg shadow-sky-900/30">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Best lap
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-slate-50">
                2:08.53
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] font-medium text-emerald-300">
                -0.42 vs PB
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              HPDE 3 · dry · baseline aero
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 px-4 py-3 shadow-lg shadow-sky-900/30">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Avg speed
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-slate-50">
                118
              </span>
              <span className="text-sm text-slate-400">mph</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Front straight speed, last push lap.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 px-4 py-3 shadow-lg shadow-sky-900/30">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Laps this session
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-slate-50">7</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">3 push laps, 4 warm-up.</p>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 px-4 py-3 shadow-lg shadow-sky-900/30">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Driver
            </p>
            <div className="mt-2 text-lg font-semibold text-slate-50">
              Marc Richardson
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Thunderhill Raceway · HPDE 3
            </p>
          </div>
        </section>

        {/* Video + notes */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)]">
          {/* Video panel */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 shadow-[0_0_80px_rgba(15,23,42,0.9)]">
            <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                  Session video
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Upload any onboard clip. Notes &amp; timeline stay in sync.
                </p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 shadow">
                <span>Upload video</span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleUploadVideo}
                />
              </label>
            </div>

            <div className="px-4 pb-4 pt-4">
              <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="h-64 w-full bg-black"
                  controls
                  onLoadedMetadata={(e) =>
                    setDuration(e.currentTarget.duration || 0)
                  }
                  onTimeUpdate={(e) =>
                    setCurrentTime(e.currentTarget.currentTime)
                  }
                />
              </div>

              {/* Timeline + controls */}
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleAddAtPlayhead}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-400/70 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 shadow-sm shadow-emerald-500/20 hover:bg-emerald-500/20"
                  >
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-500/20 text-[0.6rem]">
                      +
                    </span>
                    <span>Add note at playhead</span>
                    <span className="text-[0.65rem] text-emerald-200/70">
                      (N)
                    </span>
                  </button>

                  <div className="flex items-center gap-3 text-[0.7rem] text-slate-500">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-slate-700">/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div
                  ref={timelineRef}
                  className="relative h-3 cursor-pointer rounded-full bg-slate-900/80"
                  onClick={handleTimelineClick}
                >
                  {/* Progress */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-300"
                    style={{
                      width: `${(progress || 0) * 100}%`,
                    }}
                  />

                  {/* Notes pins */}
                  {overlayOn &&
                    annotations.map((a) => (
                      <div
                        key={a.id}
                        className="absolute inset-y-0 flex items-center"
                        style={{ left: `${(a.t / (duration || 1)) * 100}%` }}
                      >
                        <div
                          className={`h-4 w-[2px] -translate-x-1/2 rounded-full ${
                            a.severity === "critical"
                              ? "bg-rose-400"
                              : a.severity === "warn"
                              ? "bg-amber-300"
                              : "bg-sky-300"
                          }`}
                        />
                      </div>
                    ))}

                  {/* Handle */}
                  <div
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-sky-400/80 bg-slate-950 shadow shadow-sky-500/40"
                    style={{ left: `${(progress || 0) * 100}%`, transform: "translate(-50%, -50%)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes panel */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 shadow-[0_0_60px_rgba(15,23,42,0.9)]">
            <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                  Coaching notes
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Click any note to jump the video and highlight the moment.
                </p>
              </div>
              <button
                type="button"
                onClick={exportJson}
                className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-sky-500/70 hover:text-sky-200"
              >
                Export JSON
              </button>
            </div>

            <div className="flex max-h-[23rem] flex-col gap-2 overflow-y-auto px-4 py-3">
              {annotations.length === 0 && (
                <p className="py-8 text-center text-xs text-slate-500">
                  No notes yet. Add one at the playhead or click the track to
                  drop a pin.
                </p>
              )}

              {annotations.map((a) => (
                <div
                  key={a.id}
                  onClick={() => handleClickNote(a)}
                  className={`group flex flex-col gap-1 rounded-2xl border px-3 py-2 text-left text-xs transition cursor-pointer ${
                    activeNoteId === a.id
                      ? "border-sky-400/80 bg-sky-500/10"
                      : "border-slate-800/80 bg-slate-950/80 hover:border-sky-500/60 hover:bg-slate-900/80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${severityDot(
                          a.severity
                        )}`}
                      />
                      <span className="font-medium text-slate-100">
                        {a.text || "Untitled note"}
                      </span>
                    </div>
                    <span className="text-[0.65rem] text-slate-400">
                      {formatTime(a.t)}
                    </span>
                  </div>

                  {a.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {a.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.6rem] text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-1 flex items-center justify-between text-[0.65rem] text-slate-500">
                    <span>{a.publish ? "Published to driver" : "Coach · demo"}</span>
                    <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(a.id);
                        }}
                        className="rounded-full border border-slate-700/70 px-2 py-0.5 text-[0.6rem] text-slate-400 hover:border-rose-500/70 hover:text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Track map + legend */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Track map · COTA (demo)
            </p>
            <TrackMap
              annotations={annotations}
              activePos={activePos}
              onAddAtPos={handleTrackAddAtPos}
            />
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-300 shadow-[0_0_60px_rgba(15,23,42,0.8)]">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Legend
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Pins appear at the same time on the timeline &amp; map.
            </p>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span>Good execution</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                <span>Coaching opportunity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span>Critical issue · review in debrief</span>
              </div>
            </div>

            <p className="mt-4 text-[0.7rem] text-slate-500">
              Click anywhere on the lap while Annotate is ON to drop a note at
              that position and sync it with the video.
            </p>
          </div>
        </section>

        {/* Mini telemetry cards */}
        <section className="grid gap-6 md:grid-cols-3">
          <SpeedChart data={speedData} />
          <ThrottleChart data={throttleData} />
          <BrakeChart data={brakeData} />
        </section>

        {/* Telemetry summary */}
        <section>
          <CompositeTelemetryChart data={compositeData} />
        </section>
      </main>

      {/* Composer drawer */}
      {composerOpen && draft && (
        <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-slate-800 bg-slate-950/95 px-4 pb-6 pt-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                New annotation
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {formatTime(draft.t)} · Lap position {Math.round(
                  draft.pos * 100
                )}
                %
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setComposerOpen(false);
                setDraft(null);
              }}
              className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-1 text-xs text-slate-300 hover:border-slate-500"
            >
              Close
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 text-xs text-slate-200">
            <div className="flex flex-col gap-1">
              <label className="text-[0.7rem] text-slate-400">Type</label>
              <input
                value={draft.type}
                onChange={(e) =>
                  setDraft((d) => (d ? { ...d, type: e.target.value } : d))
                }
                className="rounded-xl border border-slate-700/80 bg-slate-950/80 px-2.5 py-1.5 text-xs outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[0.7rem] text-slate-400">Severity</label>
              <div className="flex gap-2">
                {(["info", "warn", "critical"] as Severity[]).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() =>
                      setDraft((d) => (d ? { ...d, severity: sev } : d))
                    }
                    className={`flex-1 rounded-xl border px-2 py-1.5 text-[0.7rem] ${
                      draft.severity === sev
                        ? severityColor(sev) +
                          " border-opacity-80 font-medium"
                        : "border-slate-700/80 bg-slate-950/80 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {sev === "info"
                      ? "Info"
                      : sev === "warn"
                      ? "Warn"
                      : "Critical"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[0.7rem] text-slate-400">
                Tags (comma-separated)
              </label>
              <input
                value={draft.tags}
                onChange={(e) =>
                  setDraft((d) => (d ? { ...d, tags: e.target.value } : d))
                }
                className="rounded-xl border border-slate-700/80 bg-slate-950/80 px-2.5 py-1.5 text-xs outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[0.7rem] text-slate-400">Note</label>
              <textarea
                rows={4}
                value={draft.text}
                onChange={(e) =>
                  setDraft((d) => (d ? { ...d, text: e.target.value } : d))
                }
                className="rounded-xl border border-slate-700/80 bg-slate-950/80 px-2.5 py-1.5 text-xs outline-none focus:border-sky-500"
                placeholder="Write a concise coaching note…"
              />
            </div>

            <label className="mt-1 inline-flex items-center gap-2 text-[0.75rem] text-slate-300">
              <input
                type="checkbox"
                checked={draft.publish}
                onChange={(e) =>
                  setDraft((d) => (d ? { ...d, publish: e.target.checked } : d))
                }
                className="h-3.5 w-3.5 rounded border border-slate-600 bg-slate-950 text-pink-500 focus:ring-0"
              />
              <span>Publish to driver</span>
            </label>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow shadow-pink-500/40 hover:brightness-110"
              >
                Save note
              </button>
              <button
                type="button"
                onClick={() => {
                  setComposerOpen(false);
                  setDraft(null);
                }}
                className="rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}