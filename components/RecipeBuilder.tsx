'use client';

import { useState } from 'react';
import { dimensions, generatePrompt, type DimensionOption } from '@/lib/recipes';
import { RecipeOutput } from './RecipeOutput';

interface RecipeBuilderProps {
  onGenerated?: (prompt: string) => void;
}

export function RecipeBuilder({ onGenerated }: RecipeBuilderProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const handleSelect = (dimensionId: string, optionId: string) => {
    setSelections(prev => ({
      ...prev,
      [dimensionId]: optionId,
    }));
  };

  const handleGenerate = () => {
    const prompt = generatePrompt(selections);
    setGeneratedPrompt(prompt);
    onGenerated?.(prompt);
  };

  const handleReset = () => {
    setSelections({});
    setGeneratedPrompt('');
  };

  const isComplete = dimensions.every(d => selections[d.id]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dimensions.map(dimension => (
          <DimensionSelector
            key={dimension.id}
            dimension={dimension}
            selected={selections[dimension.id]}
            onSelect={(optionId) => handleSelect(dimension.id, optionId)}
          />
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          重置
        </button>
        <button
          onClick={handleGenerate}
          disabled={!isComplete}
          className={`px-6 py-2 text-sm rounded-lg transition-colors ${
            isComplete
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          生成提示词
        </button>
      </div>

      <p className="text-center text-sm text-gray-500">
        已选择 {Object.keys(selections).length} / {dimensions.length} 个维度
      </p>

      {generatedPrompt && (
        <RecipeOutput prompt={generatedPrompt} />
      )}
    </div>
  );
}

interface DimensionSelectorProps {
  dimension: {
    id: string;
    label: string;
    options: DimensionOption[];
  };
  selected?: string;
  onSelect: (optionId: string) => void;
}

function DimensionSelector({ dimension, selected, onSelect }: DimensionSelectorProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-medium text-gray-800 mb-3">{dimension.label}</h3>
      <div className="flex flex-wrap gap-2">
        {dimension.options.map(option => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              selected === option.id
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
