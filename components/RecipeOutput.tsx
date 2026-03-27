'use client';

import { useState } from 'react';

interface RecipeOutputProps {
  prompt: string;
}

export function RecipeOutput({ prompt }: RecipeOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
      <h3 className="font-medium text-gray-800 mb-3">✨ 生成的提示词</h3>
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-gray-700 leading-relaxed">{prompt}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors"
        >
          {copied ? '✓ 已复制' : '📋 复制提示词'}
        </button>
      </div>
    </div>
  );
}
