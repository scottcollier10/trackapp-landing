"use client";

import Link from "next/link";
import Image from "next/image";
import trackLogo from "@/public/images/trackapp-logo.png";

export default function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-900/40 bg-slate-950/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center">
            <Image
              src={trackLogo}
              alt="Track App logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Track App
            </span>
            <span className="text-[11px] text-slate-500">
              Racing Analytics & Coaching Platform
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
          <a href="/#features" className="hover:text-slate-50">
            Features
          </a>
          <a href="/#stack" className="hover:text-slate-50">
            Tech Stack
          </a>
          <a href="/#numbers" className="hover:text-slate-50">
            Performance
          </a>
          <a href="/#story" className="hover:text-slate-50">
            Story
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <a
              href="https://trackapp-portal.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-blue-600/70 hover:text-white md:inline-flex"
            >
              Live demo
            </a>
          <a
                href="https://trackapp-landing.vercel.app/session/"
                target="_self"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/40 hover:bg-white"
              >
              Beta Features
            </a>
        </div>
      </div>
    </header>
  );
}