'use client';

import { categories } from '@/lib/effects';
import { useRef, useEffect, useState } from 'react';

interface CategoryMeta {
  icon: string;
  color: string;
}

interface SearchStickyBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
  searchRef?: React.RefObject<HTMLInputElement | null>;
}

const categoryMeta: Record<string, CategoryMeta> = {
  '翻转': { icon: '🔄', color: 'from-indigo-400 to-purple-500' },
  '按压反馈': { icon: '👆', color: 'from-pink-400 to-rose-500' },
  '悬停效果': { icon: '✨', color: 'from-amber-400 to-orange-500' },
  '弹性': { icon: '🪀', color: 'from-violet-400 to-purple-500' },
  '脉冲/呼吸': { icon: '💗', color: 'from-teal-400 to-cyan-500' },
  '滑入/滑出': { icon: '→', color: 'from-blue-400 to-indigo-500' },
  '拖拽交互': { icon: '✋', color: 'from-fuchsia-400 to-pink-500' },
  '滚动类': { icon: '↓', color: 'from-slate-400 to-gray-500' },
  '加载/状态': { icon: '⏳', color: 'from-cyan-400 to-blue-500' },
  '高级动效': { icon: '🔮', color: 'from-rose-400 to-red-500' },
  '路径动画': { icon: '🎨', color: 'from-emerald-400 to-teal-500' },
  'UI 设计': { icon: '🎛️', color: 'from-gray-400 to-slate-500' },
};

export function SearchStickyBar({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  searchRef,
}: SearchStickyBarProps) {
  const pillsRef = useRef<HTMLDivElement>(null);
  const [rowFills, setRowFills] = useState<boolean[]>([]);

  useEffect(() => {
    const el = pillsRef.current;
    if (!el || query) return;

    const GAP = 8;

    function update() {
      if (!el) return;
      const items = Array.from(el.querySelectorAll<HTMLButtonElement>('[data-pill]'));
      if (items.length === 0) return;

      const containerWidth = el.offsetWidth;
      const widths = items.map(it => it.offsetWidth);

      const rows: number[][] = [];
      let currentRow: number[] = [];
      let currentRowWidth = 0;

      widths.forEach((w, i) => {
        if (currentRow.length > 0 && currentRowWidth + w > containerWidth) {
          rows.push(currentRow);
          currentRow = [i];
          currentRowWidth = w + GAP;
        } else {
          currentRow.push(i);
          currentRowWidth += w + GAP;
        }
      });
      if (currentRow.length > 0) rows.push(currentRow);

      const fills = new Array<boolean>(widths.length).fill(false);
      rows.forEach((row, ri) => {
        const rowW = row.reduce((s, idx) => s + widths[idx], 0) + (row.length - 1) * GAP;
        const isLastRow = ri === rows.length - 1;
        if (!isLastRow || rowW >= containerWidth) {
          row.forEach(idx => { fills[idx] = true; });
        }
      });

      setRowFills(fills);
    }

    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();

    return () => observer.disconnect();
  }, [query]);

  const allItems = [
    { key: '__all__', label: '全部', icon: '', isAll: true },
    ...categories.map(cat => ({ key: cat, label: cat, icon: categoryMeta[cat]?.icon || '📦', isAll: false })),
  ];

  return (
    <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 dark:bg-slate-900/95 dark:border-slate-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="relative mb-2">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">🔍</div>
          <input
            ref={searchRef}
            type="text"
            placeholder="搜索感觉词：弹跳、玻璃、呼吸..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full pl-12 pr-20 py-3 text-sm border-0 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50 dark:bg-slate-800 dark:text-white dark:placeholder-gray-500"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 dark:bg-slate-700 dark:text-gray-400 px-2 py-1 rounded hidden md:block">
            按 / 聚焦
          </div>
        </div>

        {!query && (
          <div ref={pillsRef} className="flex flex-wrap gap-2">
            {allItems.map((item, idx) => {
              const isActive = item.isAll ? selectedCategory === null : selectedCategory === item.key;
              const fill = rowFills[idx] ?? false;
              return (
                <button
                  key={item.key}
                  data-pill
                  onClick={() => onCategoryChange(item.isAll ? null : isActive ? null : item.key)}
                  className={`${fill ? 'flex-1' : 'flex-none'} min-w-0 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs rounded-full transition-all hover:scale-105 ${
                    item.isAll
                      ? isActive
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      : isActive
                        ? 'bg-gradient-to-br ' + (categoryMeta[item.key]?.color || 'from-gray-400 to-gray-500') + ' text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {(query || selectedCategory) && (
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategory && (
              <button
                onClick={() => onCategoryChange(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-xs hover:bg-indigo-200 transition-colors"
              >
                {categoryMeta[selectedCategory]?.icon} {selectedCategory} ×
              </button>
            )}
            {query && (
              <button
                onClick={() => onQueryChange('')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 transition-colors"
              >
                🔍 &quot;{query}&quot; ×
              </button>
            )}
            <button
              onClick={() => { onQueryChange(''); onCategoryChange(null); }}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              清除全部
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
