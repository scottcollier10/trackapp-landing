"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-400" />
              <span className="text-lg font-semibold text-slate-50">
                Track App
              </span>
            </div>
            <span className="hidden sm:inline-block ml-3 text-xs font-medium text-slate-400">
              Racing Analytics & Coaching Platform
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#tech-stack"
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Tech Stack
            </Link>
            <Link
              href="/#performance"
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Performance
            </Link>
            <Link
              href="/#story"
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Story
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/sand"
              className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-emerald-400 transition-colors"
            >
              Live demo
            </Link>
            <a
              href="https://github.com/scottcollier10/trackapp-landing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-semibold hover:bg-emerald-400 transition-colors"
            >
              See the code
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
