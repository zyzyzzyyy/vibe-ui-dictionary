'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Fuse from 'fuse.js';
import { EffectCard } from '@/components/EffectCard';
import { EffectModal } from '@/components/EffectModal';
import { effects, categories, Effect } from '@/lib/effects';
import { RecipeBuilder } from '@/components/RecipeBuilder';
import { PresetRecipeGrid } from '@/components/PresetRecipeCard';
import { SearchStickyBar } from '@/components/SearchStickyBar';

type Tab = 'effects' | 'recipes';

export function ClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('effects');
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const getInitialTab = (): Tab => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'effects' || tabParam === 'recipes') return tabParam;
    return 'effects';
  };

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const fuse = useMemo(() => new Fuse(effects, {
    keys: ['name', 'namePinyin', 'prompt'],
    threshold: 0.3,
  }), []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return effects.map(e => e.id);
    return fuse.search(query).map(r => r.item.id);
  }, [query, fuse]);

  const filteredEffects = useMemo(() => {
    let result = effects;
    if (selectedCategory) result = result.filter(e => e.category === selectedCategory);
    result = result.filter(e => searchResults.includes(e.id));
    return result;
  }, [selectedCategory, searchResults]);

  // Category card data with emojis
  const categoryMeta: Record<string, { icon: string; color: string }> = {
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

  const categoryCount: Record<string, number> = {};
  effects.forEach(e => { categoryCount[e.category] = (categoryCount[e.category] || 0) + 1; });

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const selectedIndex = filteredEffects.findIndex(e => e.id === selectedEffect?.id);
  const handlePrevEffect = useCallback(() => {
    if (selectedIndex > 0) setSelectedEffect(filteredEffects[selectedIndex - 1]);
  }, [selectedIndex, filteredEffects]);
  const handleNextEffect = useCallback(() => {
    if (selectedIndex < filteredEffects.length - 1) setSelectedEffect(filteredEffects[selectedIndex + 1]);
  }, [selectedIndex, filteredEffects]);

  // ===== EFFECTS VIEW =====
  if (activeTab === 'effects') {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 dark:border-slate-800 pt-8 pb-6">
          <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
            <div className="text-center mb-4">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-1">
                🎨 <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Vibe UI</span>
              </h1>
              <p className="text-gray-400 text-sm">感觉词 → 前端动效 · 50+ 精选效果</p>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleTabChange('effects')}
                className="px-5 py-2 text-sm rounded-full font-medium bg-gray-800 text-white shadow"
              >
                动效词典
              </button>
              <button
                onClick={() => handleTabChange('recipes')}
                className="px-5 py-2 text-sm rounded-full font-medium bg-white text-gray-500 hover:bg-gray-100 shadow-sm dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              >
                🔥 配方生成
              </button>
            </div>
          </div>
        </div>

        <SearchStickyBar
          query={query}
          onQueryChange={setQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchRef={searchRef}
        />

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 mb-4">
            {query || selectedCategory
              ? `找到 ${filteredEffects.length} 个效果`
              : `全部 ${filteredEffects.length} 个效果`}
          </p>

          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {filteredEffects.map(effect => (
              <div key={effect.id} className="break-inside-avoid mb-4">
                <button
                  onClick={() => setSelectedEffect(effect)}
                  className="w-full text-left"
                >
                  <EffectCard effect={effect} />
                </button>
              </div>
            ))}
          </div>

          {filteredEffects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg text-gray-500">没有找到匹配的效果</p>
              <p className="text-sm text-gray-400 mt-2">试试其他关键词或清除筛选</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 py-6 mt-8">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-sm text-gray-400">
            <p>Vibe UI 动效词典</p>
            <p className="text-xs">按 / 聚焦搜索 · 点击卡片预览</p>
          </div>
        </footer>

        {/* MODAL */}
        {selectedEffect && (
          <EffectModal
            effect={selectedEffect}
            allEffects={filteredEffects}
            onClose={() => setSelectedEffect(null)}
            onPrev={selectedIndex > 0 ? handlePrevEffect : undefined}
            onNext={selectedIndex < filteredEffects.length - 1 ? handleNextEffect : undefined}
          />
        )}
      </main>
    );
  }

  // ===== RECIPES VIEW =====
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🔥 配方生成器</h1>
            <p className="text-gray-400 text-sm">7 维度自由组合，一键复制 CSS</p>
          </div>
          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={() => handleTabChange('effects')}
              className="px-5 py-2 text-sm rounded-full font-medium bg-white text-gray-500 hover:bg-gray-100 shadow-sm"
            >
              动效词典
            </button>
            <button
              onClick={() => handleTabChange('recipes')}
              className="px-5 py-2 text-sm rounded-full font-medium bg-gray-800 text-white shadow"
            >
              🔥 配方生成
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">🎯 预设配方</h2>
          <PresetRecipeGrid />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-4">✨ 自定义配方</h2>
          <RecipeBuilder />
        </div>
      </div>

      <footer className="border-t border-gray-200 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>Vibe UI 动效词典</p>
        </div>
      </footer>
    </main>
  );
}
