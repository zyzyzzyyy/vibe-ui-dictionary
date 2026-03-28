'use client';

import { useState, useRef, useEffect } from 'react';
import { Effect } from '@/lib/effects';
import { toggleFavorite, isFavorite as checkIsFavorite } from '@/lib/favorites';

interface EffectCardProps {
  effect: Effect;
  isModalPreview?: boolean;
  modalIsPlaying?: boolean;
  onCardClick?: () => void;
}

export function EffectCard({ effect, isModalPreview = false, modalIsPlaying, onCardClick }: EffectCardProps) {
  const [copied, setCopied] = useState(false);
  const [internalPlaying, setInternalPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);

  // For modal: use external playing state; otherwise use internal
  const isPlaying = modalIsPlaying !== undefined ? modalIsPlaying : internalPlaying;

  useEffect(() => {
    setIsFav(checkIsFavorite(effect.id));
  }, [effect.id]);

  const handleFavorite = () => {
    const newState = toggleFavorite(effect.id);
    setIsFav(newState);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(effect.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(effect.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDemoClick = () => {
    if (isModalPreview) {
      onCardClick?.();
      return;
    }
    if (effect.trigger === 'click') {
      setInternalPlaying(true);
      setHasInteracted(true);
      setTimeout(() => setInternalPlaying(false), 1000);
    }
  };

  const handleDemoMouseEnter = () => {
    if (!isModalPreview && effect.trigger === 'hover') {
      setInternalPlaying(true);
      setHasInteracted(true);
    }
  };

  const handleDemoMouseLeave = () => {
    if (!isModalPreview && effect.trigger === 'hover') {
      setInternalPlaying(false);
    }
  };

  const getTriggerBadge = () => {
    const styles: Record<string, { bg: string; icon: string; label: string }> = {
      hover: { bg: 'bg-blue-100 text-blue-700', icon: '👆', label: '鼠标覆盖' },
      click: { bg: 'bg-orange-100 text-orange-700', icon: '🖱️', label: '点击触发' },
      auto: { bg: 'bg-green-100 text-green-700', icon: '✨', label: '自动播放' },
      scroll: { bg: 'bg-purple-100 text-purple-700', icon: '↓', label: '滚动触发' },
    };
    const s = styles[effect.trigger] || styles.auto;
    return (
      <span className={`text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5 ${s.bg}`} title={s.label}>
        <span>{s.icon}</span>
      </span>
    );
  };

  // In modal preview mode: auto-play hover/auto animations
  const modalPlaying = isModalPreview 
    ? (effect.trigger === 'auto' || effect.trigger === 'hover' || effect.trigger === 'scroll' || isPlaying)
    : isPlaying;

  if (isModalPreview) {
    return (
      <div 
        className="w-full flex items-center justify-center cursor-pointer"
        onClick={handleDemoClick}
      >
        <EffectDemo effect={effect} isPlaying={modalPlaying} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* 效果演示区域 */}
      <div 
        ref={demoRef}
        className="h-32 bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden cursor-pointer relative group"
        onClick={handleDemoClick}
        onMouseEnter={handleDemoMouseEnter}
        onMouseLeave={handleDemoMouseLeave}
      >
        {/* Demo Content - 根据触发类型决定是否播放动画 */}
        <EffectDemo effect={effect} isPlaying={isPlaying} />

        {/* Interaction hint overlay */}
        {(effect.trigger === 'hover' || effect.trigger === 'click') && !hasInteracted && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-gray-600 bg-white/90 px-2 py-1 rounded shadow-sm">
              {effect.trigger === 'hover' ? '👆 悬停查看' : '👆 点击播放'}
            </span>
          </div>
        )}
        
        {/* Scroll indicator */}
        {effect.trigger === 'scroll' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-gray-500 animate-bounce">↓ 滚动查看</span>
          </div>
        )}
      </div>
      
      {/* 名称和描述 */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-800">{effect.name}</h3>
          {getTriggerBadge()}
        </div>
        <span
          onClick={handleFavorite}
          className="text-lg hover:scale-110 transition-transform cursor-pointer"
        >
          {isFav ? '❤️' : '🤍'}
        </span>
      </div>
      
      {/* 复制按钮 */}
      <div className="flex gap-2">
        <button
          onClick={copyPrompt}
          className="flex-1 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          {copied ? '✓ 已复制' : '📋 提示词'}
        </button>
        <button
          onClick={copyCode}
          className="flex-1 text-xs px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors"
        >
          💻 代码
        </button>
      </div>
    </div>
  );
}

// 独立的 Demo 组件，处理动画逻辑
function EffectDemo({ effect, isPlaying }: { effect: Effect; isPlaying: boolean }) {
  // auto 和 hover/click 被触发时播放动画
  const shouldPlay = isPlaying || effect.trigger === 'auto';
  
  // 点击触发的动画播放一次后重置
  const [clickPlayed, setClickPlayed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (effect.trigger === 'click') {
      setClickPlayed(true);
      setTimeout(() => setClickPlayed(false), 1500);
    }
  };

  const getStyle = (animationName: string, duration: string, fillMode?: string): React.CSSProperties => {
    if (!shouldPlay && effect.trigger !== 'click') {
      return {};
    }
    if (effect.trigger === 'click' && !clickPlayed) {
      return {};
    }
    return {
      animation: fillMode 
        ? `${animationName} ${duration} ${fillMode}`
        : `${animationName} ${duration}`
    };
  };

  switch (effect.id) {
    // ===== 翻转类 - hover触发 =====
    case 'flip-bounce':
      return <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg" style={getStyle('flip-bounce', '1s', 'forwards')} />;
    case 'flip-shake':
      return <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg" style={getStyle('flip-shake', '0.8s', 'forwards')} />;
    case 'flip-swing':
      return <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg" style={getStyle('flip-swing', '1.2s', 'forwards')} />;

    // ===== 按压反馈 - click触发 =====
    case 'press-feedback':
      return <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg cursor-pointer" onClick={handleClick} style={clickPlayed ? { animation: 'press 0.2s ease-out forwards' } : {}} />;
    case 'press-depth':
      return <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg cursor-pointer" onClick={handleClick} style={clickPlayed ? { animation: 'press-depth 0.3s ease-out forwards' } : {}} />;
    case 'press-ink':
      return <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg cursor-pointer" onClick={handleClick} style={clickPlayed ? { animation: 'press-ink 0.4s ease-out forwards' } : {}} />;

    // ===== 悬停效果 - hover触发 =====
    case 'hover-lift':
      return <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg" style={shouldPlay ? { animation: 'lift 0.3s ease-out forwards', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' } : {}} />;
    case 'hover-glow':
      return <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg" style={shouldPlay ? { animation: 'glow 0.4s ease-out forwards' } : {}} />;
    case 'hover-magnify':
      return <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg" style={shouldPlay ? { animation: 'magnify 0.3s ease-out forwards' } : {}} />;

    // ===== 弹性 - hover触发或自动 =====
    case 'spring-bounce':
      return <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg" style={getStyle('spring-bounce', '0.8s', 'forwards')} />;
    case 'spring-wobble':
      return <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-lg" style={getStyle('wobble', '0.6s', 'forwards')} />;
    case 'spring-squash':
      return <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-red-500 rounded-lg" style={getStyle('squash', '0.6s', 'forwards')} />;

    // ===== 脉冲/呼吸 - 自动播放 =====
    case 'pulse-glow':
      return <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />;
    case 'pulse-scale':
      return <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg" style={{ animation: 'pulse-scale 1.5s ease-in-out infinite' }} />;
    case 'breathe':
      return <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-gray-500 rounded-lg" style={{ animation: 'breathe 4s ease-in-out infinite' }} />;

    // ===== 滑入/滑出 - hover触发 =====
    case 'slide-in':
      return <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg" style={getStyle('slide-in', '0.4s', 'forwards')} />;
    case 'slide-out':
      return <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg" style={getStyle('slide-out', '0.3s', 'forwards')} />;
    case 'float-in':
      return <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg" style={getStyle('float-in', '0.5s', 'forwards')} />;
    case 'drop-in':
      return <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg" style={getStyle('drop-in', '0.4s', 'forwards')} />;
    case 'slide-away':
      return <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-slate-500 rounded-lg" style={getStyle('slide-away', '0.3s', 'forwards')} />;
    case 'push-in':
      return <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg" style={getStyle('push-in', '0.3s', 'forwards')} />;

    // ===== 拖拽交互 =====
    case 'drag-snap':
      return <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-lg" style={getStyle('snap', '0.4s', 'forwards')} />;
    case 'drag-throw':
      return <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg" style={{ animation: 'bounce-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite' }} />;
    case 'drag-tilt':
      return <div className="w-14 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg" style={{ animation: 'tilt-demo 2s ease-in-out infinite' }} />;

    // ===== 滚动类 - 需要滚动上下文，显示示意 =====
    case 'scroll-parallax':
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">🏔️</span>
          <span className="text-xs text-gray-400">视差滚动</span>
        </div>
      );
    case 'scroll-sticky':
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">📌</span>
          <span className="text-xs text-gray-400">粘性定位</span>
        </div>
      );
    case 'scroll-snap':
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">⟷</span>
          <span className="text-xs text-gray-400">吸附滚动</span>
        </div>
      );

    // ===== 加载/状态 =====
    case 'loading-spin':
      return <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} />;
    case 'loading-dots':
      return (
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-indigo-500 rounded-full" style={{ animation: 'dot-bounce 1.4s infinite' }} />
          <div className="w-3 h-3 bg-indigo-500 rounded-full" style={{ animation: 'dot-bounce 1.4s 0.2s infinite' }} />
          <div className="w-3 h-3 bg-indigo-500 rounded-full" style={{ animation: 'dot-bounce 1.4s 0.4s infinite' }} />
        </div>
      );
    case 'skeleton':
      return <div className="w-16 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded" style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />;
    case 'check-draw':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" className="cursor-pointer" onClick={handleClick}>
          <circle cx="20" cy="20" r="16" fill="none" stroke="#10b981" strokeWidth="3" 
            strokeDasharray="100" strokeDashoffset={clickPlayed ? "0" : "100"} 
            style={clickPlayed ? { animation: 'draw 0.6s forwards' } : {}} />
          <path d="M12 20 L18 26 L28 14" fill="none" stroke="#10b981" strokeWidth="3"
            strokeDasharray="30" strokeDashoffset={clickPlayed ? "0" : "30"} strokeLinecap="round" strokeLinejoin="round"
            style={clickPlayed ? { animation: 'draw 0.4s 0.3s forwards' } : {}} />
        </svg>
      );
    case 'success-flash':
      return <div className="w-10 h-10 bg-green-500 rounded-full cursor-pointer" onClick={handleClick} style={clickPlayed ? { animation: 'flash 0.6s ease-out forwards' } : {}} />;
    case 'error-shake':
      return <div className="w-10 h-10 bg-red-500 rounded-lg cursor-pointer" onClick={handleClick} style={clickPlayed ? { animation: 'shake 0.5s ease-out forwards' } : {}} />;

    // ===== 高级动效 =====
    case 'morph-blob':
      return (
        <div className="relative" style={{ filter: 'url(#goo-morph)' }}>
          <svg className="absolute inset-0 w-full h-full opacity-0 pointer-events-none">
            <defs>
              <filter id="goo-morph">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
              </filter>
            </defs>
          </svg>
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full" style={{ animation: 'blob-move 2s ease-in-out infinite' }} />
            <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full" style={{ animation: 'blob-move-right 2s ease-in-out infinite' }} />
          </div>
        </div>
      );
    case 'ripple':
      return (
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full relative cursor-pointer" onClick={handleClick}>
          <div className="absolute inset-0 rounded-full border-2 border-teal-400" style={{ animation: clickPlayed ? 'ripple 1s ease-out forwards' : 'ripple 1s ease-out infinite' }} />
        </div>
      );
    case 'jelly':
      return <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full" style={{ animation: 'jelly 1.2s ease-in-out infinite' }} />;
    case 'star':
      return (
        <div className="flex gap-1">
          {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
            <div key={i} className="w-3 h-3 bg-amber-400 rounded-sm" style={{ animation: `twinkle 1.5s ${delay}s ease-in-out infinite` }} />
          ))}
        </div>
      );
    case 'gloss':
      return (
        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'gloss 2s ease-in-out infinite' }} />
        </div>
      );
    case 'glass':
      return <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/30" style={{ animation: 'glass-bounce 2s ease-in-out infinite' }} />;

    // ===== 路径动画 - hover触发 =====
    case 'svg-circle':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#667eea" strokeWidth="2" 
            strokeDasharray="100" strokeDashoffset={shouldPlay ? "0" : "100"} 
            style={{ transition: shouldPlay ? 'stroke-dashoffset 1s ease-out' : 'none' }} />
        </svg>
      );
    case 'svg-heart':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M20 35 C5 22 5 12 15 8 C18 6 20 8 20 10 C20 8 22 6 25 8 C35 12 35 22 20 35" 
            fill="none" stroke="#f5576c" strokeWidth="2" strokeDasharray="100" strokeDashoffset={shouldPlay ? "0" : "100"}
            style={{ transition: shouldPlay ? 'stroke-dashoffset 1s ease-out' : 'none' }} />
        </svg>
      );
    case 'svg-star':
      return (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M20 5 L24 15 L35 15 L26 22 L30 33 L20 26 L10 33 L14 22 L5 15 L16 15 Z" 
            fill="none" stroke="#667eea" strokeWidth="2" strokeDasharray="100" strokeDashoffset={shouldPlay ? "0" : "100"}
            style={{ transition: shouldPlay ? 'stroke-dashoffset 1s ease-out' : 'none' }} />
        </svg>
      );

    // ===== UI 设计类 - 静态展示 =====
    case 'ui-soft-shadow':
      return <div className="w-12 h-12 bg-white rounded-lg" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }} />;
    case 'ui-neon-glow':
      return <div className="w-12 h-12 bg-slate-900 rounded-lg" style={{ boxShadow: '0 0 5px #667eea, 0 0 20px #667eea, 0 0 40px #667eea' }} />;
    case 'ui-glass':
      return <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg border border-white/30" />;
    case 'ui-gradient-border':
      return (
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-0.5">
          <div className="w-full h-full bg-white rounded-lg" />
        </div>
      );
    case 'ui-text-gradient':
      return <div className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Abc</div>;
    case 'ui-neumorphism-raised':
      return <div className="w-12 h-12 bg-gray-200 rounded-lg" style={{ boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.6), -4px -4px 8px rgba(255, 255, 255, 0.8)' }} />;
    case 'ui-neumorphism-inset':
      return <div className="w-12 h-12 bg-gray-200 rounded-lg" style={{ boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.6), inset -2px -2px 4px rgba(255, 255, 255, 0.8)' }} />;
    case 'ui-pulse-border':
      return <div className="w-12 h-12 bg-white rounded-lg border-2 border-indigo-400" style={{ animation: 'pulse-border 2s ease-in-out infinite' }} />;

    default:
      return <div className="w-12 h-12 bg-gray-200 rounded-lg" />;
  }
}
