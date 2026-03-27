'use client';

import { useState } from 'react';
import { generateRecipeCSS } from './recipe/dimension-css';

interface RecipeOutputProps {
  prompt: string;
  selections?: Record<string, string>;
}

export function RecipeOutput({ prompt, selections = {} }: RecipeOutputProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [showCSS, setShowCSS] = useState(false);

  const generatedCSS = Object.keys(selections).length > 0 ? generateRecipeCSS(selections) : '';

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(generatedCSS);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800">✨ 生成的提示词</h3>
        {generatedCSS && (
          <button
            onClick={() => setShowCSS(!showCSS)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {showCSS ? '隐藏 CSS' : '查看 CSS'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-gray-700 leading-relaxed">{prompt}</p>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleCopyPrompt}
          className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors"
        >
          {copiedPrompt ? '✓ 已复制' : '📋 复制提示词'}
        </button>
      </div>

      {showCSS && generatedCSS && (
        <div className="border-t border-indigo-100 pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">💻 生成的 CSS</h4>
            <button
              onClick={handleCopyCSS}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {copiedCSS ? '✓ 已复制' : '📋 复制'}
            </button>
          </div>
          <pre className="bg-slate-800 text-slate-300 text-xs p-4 rounded-lg overflow-x-auto">
            {generatedCSS}
          </pre>
        </div>
      )}
    </div>
  );
}
