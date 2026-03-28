'use client';

import { useState, useEffect, useCallback } from 'react';
import { Effect } from '@/lib/effects';
import { EffectCard } from './EffectCard';

interface EffectModalProps {
  effect: Effect;
  allEffects: Effect[];
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function EffectModal({ effect, allEffects, onClose, onPrev, onNext }: EffectModalProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const related = allEffects
    .filter(e => e.category === effect.category && e.id !== effect.id)
    .slice(0, 4);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
      if (e.key === 'Enter' && !showCode) {
        copyPrompt();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext, showCode]);

  const copyPrompt = useCallback(() => {
    navigator.clipboard.writeText(effect.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  }, [effect.prompt]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(effect.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }, [effect.code]);

  const triggerLabel: Record<string, string> = {
    hover: '👆 鼠标覆盖触发',
    click: '🖱️ 点击触发',
    auto: '✨ 自动播放',
    scroll: '↓ 滚动触发',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            >
              ←
            </button>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">{effect.name}</h2>
              <p className="text-xs text-gray-400">{triggerLabel[effect.trigger]} · {effect.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onPrev && (
              <button onClick={onPrev} className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                ←
              </button>
            )}
            {onNext && (
              <button onClick={onNext} className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                →
              </button>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="relative bg-gray-50 flex items-center justify-center py-12" style={{ minHeight: '280px' }}>
          {/* Ambient background */}
          <div className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)'
            }}
          />
          
          <div 
            className="relative cursor-pointer"
            onClick={() => effect.trigger === 'click' && setIsPlaying(!isPlaying)}
          >
            <EffectCard effect={effect} isModalPreview modalIsPlaying={isPlaying} />
          </div>

          {/* Play/pause hint for click triggers */}
          {effect.trigger === 'click' && (
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 flex items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {isPlaying ? '⏸' : '▶'}
              </span>
              <span>点击可暂停/播放</span>
            </div>
          )}
        </div>

        {/* Prompt */}
        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">💡 提示词</p>
          <p className="text-gray-700 text-sm leading-relaxed">{effect.prompt}</p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 border-t border-gray-100">
          <button
            onClick={copyPrompt}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              copiedPrompt 
                ? 'bg-green-100 text-green-700' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            {copiedPrompt ? '✓ 已复制提示词' : '📋 复制提示词'}
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              showCode ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {showCode ? '🙈 隐藏代码' : '💻 查看代码'}
          </button>
        </div>

        {/* Code panel */}
        {showCode && (
          <div className="px-6 pb-4">
            <div className="bg-gray-900 rounded-xl p-4 relative group">
              <button
                onClick={copyCode}
                className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                {copiedCode ? '✓' : '📋 复制'}
              </button>
              <pre className="text-xs text-green-400 overflow-x-auto" style={{ maxHeight: '200px' }}>
                <code>{effect.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              🔗 同类推荐
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {related.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    // Navigate to related effect - parent should handle this
                    onClose();
                  }}
                  className="flex-shrink-0 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-600 transition-colors"
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard hint */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>← → 切换动效</span>
          <span>Esc 关闭</span>
        </div>
      </div>
    </div>
  );
}
