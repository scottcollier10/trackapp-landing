import Image from "next/image";
import Link from "next/link";
import trackLogo from "@/public/images/trackapp-logo.png";

const COACH_DEMO_URL = "https://trackapp-portal.vercel.app/coach";
const PILOT_MAILTO =
  "mailto:me@scott-collier.com?subject=Track%20App%20Pilot%20Access";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-slate-50"
  >
    {children}
  </Link>
);

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/40 bg-slate-950/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-8">
        {/* Left: brand + audience switcher */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image
                src={trackLogo}
                alt="Track App logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Track App
              </span>
              <span className="text-[11px] text-slate-500">
                Program-level coaching workflow
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-800 bg-slate-950/40 p-1">
            <NavLink href="/">HPDE Overview</NavLink>
            <NavLink href="/chin">Chin Pilot</NavLink>
            <NavLink href="/case-study">Case Study</NavLink>
          </div>
        </div>

        {/* Right: primary CTAs */}
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

      {/* Mobile-only audience links (below header row) */}
      <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden sm:px-6 md:px-8">
        <div className="flex items-center justify-center gap-2">
          <Link
            href="/"
            className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-slate-600"
          >
            HPDE
          </Link>
          <Link
            href="/chin"
            className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-slate-600"
          >
            Chin
          </Link>
          <Link
            href="/case-study"
            className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-slate-600"
          >
            Case Study
          </Link>
        </div>
      </div>
    </header>
  );
}
