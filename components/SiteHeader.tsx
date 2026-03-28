'use client';

import Link from 'next/link';
import { DarkModeToggle } from './DarkModeToggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 dark:bg-slate-900/90 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl">🎨</span>
          <span className="font-bold text-gray-800 dark:text-white">Vibe UI</span>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
