'use client';

import { useState } from 'react';
import { Effect } from '@/lib/effects';
import { EffectCard } from './EffectCard';

interface CompareViewProps {
  effects: Effect[];
}

export function CompareView({ effects }: CompareViewProps) {
  const [left, setLeft] = useState<Effect | null>(null);
  const [right, setRight] = useState<Effect | null>(null);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">效果对比</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <button
            onClick={() => setLeftOpen(!leftOpen)}
            className="w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-left flex items-center justify-between"
          >
            <span>左侧: {left ? left.name : '选择动效'}</span>
            <span>{leftOpen ? '▲' : '▼'}</span>
          </button>
          
          {leftOpen && (
            <div className="max-h-64 overflow-y-auto bg-white rounded-lg border border-gray-200">
              {effects.map(effect => (
                <button
                  key={effect.id}
                  onClick={() => {
                    setLeft(effect);
                    setLeftOpen(false);
                  }}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  {effect.name}
                </button>
              ))}
            </div>
          )}
          
          {left && <EffectCard effect={left} />}
        </div>

        <div className="space-y-2">
          <button
            onClick={() => setRightOpen(!rightOpen)}
            className="w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-left flex items-center justify-between"
          >
            <span>右侧: {right ? right.name : '选择动效'}</span>
            <span>{rightOpen ? '▲' : '▼'}</span>
          </button>
          
          {rightOpen && (
            <div className="max-h-64 overflow-y-auto bg-white rounded-lg border border-gray-200">
              {effects.map(effect => (
                <button
                  key={effect.id}
                  onClick={() => {
                    setRight(effect);
                    setRightOpen(false);
                  }}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  {effect.name}
                </button>
              ))}
            </div>
          )}
          
          {right && <EffectCard effect={right} />}
        </div>
      </div>
    </div>
  );
}
