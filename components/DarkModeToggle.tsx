'use client';

import { useState, useEffect } from 'react';

interface DarkModeToggleProps {
  className?: string;
}

export function DarkModeToggle({ className = '' }: DarkModeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  // Init from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  return (
    <label
      className={`dark-toggle relative inline-flex items-center cursor-pointer select-none ${className}`}
      title={isDark ? '切换亮色模式' : '切换深色模式'}
    >
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className="sr-only"
        checked={isDark}
        onChange={toggle}
        aria-label="切换深色模式"
      />

      {/* Switch track */}
      <div className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
        isDark ? 'bg-slate-800' : 'bg-amber-400'
      }`}>
        {/* Switch thumb */}
        <div
          className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ${
            isDark
              ? 'left-7 bg-slate-200'
              : 'left-1 bg-white'
          }`}
          style={{
            boxShadow: '0 1px 4px rgba(0,0,0,0.2), 0 0 8px rgba(255,200,0,0.4)',
          }}
        >
          {/* Sun / Moon icon inside thumb */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isDark ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}>
            {/* Sun */}
            <div className="relative w-4 h-4">
              <div className="absolute inset-0 bg-amber-500 rounded-full" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-1 bg-amber-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '50% 100%',
                    transform: `translate(-50%, -100%) rotate(${deg}deg) translateY(-6px)`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}>
            {/* Moon */}
            <div className="relative w-4 h-4">
              <div className="absolute inset-0 bg-slate-200 rounded-full" style={{ boxShadow: '0 0 6px rgba(200,220,255,0.6)' }} />
              <div className="absolute w-3 h-3 bg-slate-800 rounded-full" style={{ top: '-1px', right: '-1px' }} />
            </div>
          </div>
        </div>

        {/* Track label - light side */}
        <div className={`absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ${isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
          <span className="text-xs text-amber-900 font-bold">☀</span>
        </div>
        {/* Track label - dark side */}
        <div className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 ${isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <span className="text-xs text-slate-300 font-bold">🌙</span>
        </div>
      </div>
    </label>
  );
}
