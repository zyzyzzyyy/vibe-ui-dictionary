'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { EffectCard } from '@/components/EffectCard';
import { effects, categories } from '@/lib/effects';
import { RecipeBuilder } from '@/components/RecipeBuilder';
import { PresetRecipeGrid } from '@/components/PresetRecipeCard';
import { CompareView } from '@/components/CompareView';

type Tab = 'effects' | 'recipes' | 'compare';

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('effects');

  const fuse = useMemo(() => new Fuse(effects, {
    keys: ['name', 'namePinyin', 'prompt'],
    threshold: 0.3,
  }), []);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return effects.map(e => e.id);
    }
    const results = fuse.search(query);
    return results.map(r => r.item.id);
  }, [query, fuse]);

  const filteredEffects = useMemo(() => {
    let result = effects;
    
    if (activeCategory) {
      result = result.filter(e => e.category === activeCategory);
    }
    
    result = result.filter(e => searchResults.includes(e.id));
    
    return result;
  }, [activeCategory, searchResults]);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎨</span>
            <h1 className="text-2xl font-bold text-gray-800">Vibe UI 动效词典</h1>
          </div>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('effects')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'effects'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              动效词条
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'recipes'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              配方生成
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'compare'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              效果对比
            </button>
          </div>

          {activeTab === 'effects' && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="搜索感觉词..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeCategory === null
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  全部
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeCategory === cat
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {activeTab === 'effects' ? (
        <>
          <div className="max-w-6xl mx-auto px-4 py-4">
            <p className="text-sm text-gray-500">
              共 {filteredEffects.length} 个动效词条
              {query && ` (匹配 "${query}")`}
              {activeCategory && ` · ${activeCategory}`}
            </p>
          </div>

          <section className="max-w-6xl mx-auto px-4 pb-12">
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
              {filteredEffects.map(effect => (
                <div key={effect.id} className="break-inside-avoid mb-4">
                  <EffectCard effect={effect} />
                </div>
              ))}
            </div>
            
            {filteredEffects.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">没有找到匹配的动效词条</p>
                <p className="text-sm mt-2">尝试其他关键词或清除筛选</p>
              </div>
            )}
          </section>
        </>
      ) : activeTab === 'recipes' ? (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">🔥 预设配方</h2>
            <PresetRecipeGrid />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">✨ 自定义配方</h2>
            <RecipeBuilder />
          </div>
        </section>
      ) : (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <CompareView effects={filteredEffects} />
        </section>
      )}

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>Vibe UI 动效词典 — 让模糊的感觉词精准对应前端效果</p>
          <p className="mt-1">基于 Tailwind CSS + React + Fuse.js</p>
        </div>
      </footer>
    </main>
  );
}
