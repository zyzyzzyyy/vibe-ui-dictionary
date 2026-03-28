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
    <button
      onClick={toggle}
      className={`dark-toggle relative inline-flex items-center cursor-pointer select-none ${className}`}
      title={isDark ? '切换亮色模式' : '切换深色模式'}
      aria-label={isDark ? '切换亮色模式' : '切换深色模式'}
    >
      {/* Track */}
      <div className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
        isDark ? 'bg-slate-700' : 'bg-amber-400'
      }`}>
        {/* Left label - sun */}
        <span className={`absolute left-1.5 top-1/2 -translate-y-1/2 text-xs transition-all duration-300 ${
          isDark ? 'opacity-30' : 'opacity-100'
        }`}>☀️</span>
        
        {/* Right label - moon */}
        <span className={`absolute right-1.5 top-1/2 -translate-y-1/2 text-xs transition-all duration-300 ${
          isDark ? 'opacity-100' : 'opacity-30'
        }`}>🌙</span>

        {/* Thumb */}
        <div
          className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 ${
            isDark
              ? 'left-7 bg-slate-200'
              : 'left-0.5 bg-white'
          }`}
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.25), 0 0 6px rgba(255,200,0,0.3)',
          }}
        >
          {/* Sun rays - only visible in light mode */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}>
            <div className="relative w-3.5 h-3.5">
              {/* Sun center */}
              <div className="absolute inset-1.5 bg-amber-500 rounded-full" />
              {/* Sun rays */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 bg-amber-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    height: '3px',
                    transformOrigin: '50% 100%',
                    transform: `translate(-50%, -100%) rotate(${deg}deg) translateY(-6px)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Moon - only visible in dark mode */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="relative w-3.5 h-3.5">
              {/* Moon body */}
              <div className="absolute inset-0 bg-slate-300 rounded-full" style={{ boxShadow: '0 0 4px rgba(200,220,255,0.6)' }} />
              {/* Moon crater */}
              <div className="absolute w-2 h-2 bg-slate-600 rounded-full" style={{ top: '1px', right: '0' }} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
