'use client';

import { useState } from 'react';
import { presetRecipes, type PresetRecipe } from '@/lib/recipes';

interface PresetRecipeCardProps {
  recipe: PresetRecipe;
}

export function PresetRecipeCard({ recipe }: PresetRecipeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(recipe.generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{recipe.emoji}</span>
        <h3 className="font-medium text-gray-800">{recipe.name}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-3">{recipe.description}</p>
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <p className="text-xs text-gray-600 line-clamp-2">{recipe.generatedPrompt}</p>
      </div>
      <button
        onClick={handleCopy}
        className="w-full px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm rounded-lg transition-colors"
      >
        {copied ? '✓ 已复制' : '📋 复制提示词'}
      </button>
    </div>
  );
}

export function PresetRecipeGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {presetRecipes.map(recipe => (
        <PresetRecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
