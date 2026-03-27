'use client';

import { useMemo } from 'react';
import { getPreviewStyle } from './dimension-css';

interface RecipeVisualizerProps {
  selections: Record<string, string>;
}

export function RecipeVisualizer({ selections }: RecipeVisualizerProps) {
  const previewStyle = useMemo(() => getPreviewStyle(selections), [selections]);
  
  const componentType = selections.component || 'button';
  const animation = selections.animation;

  const animationStyle = useMemo((): React.CSSProperties => {
    if (!animation) return {};
    const animationMap: Record<string, React.CSSProperties> = {
      spring: { animation: 'spring-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' },
      gradient: { animation: 'fade-in 0.4s ease-out forwards' },
      snap: { animation: 'snap 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' },
      pulse: { animation: 'pulse 2s ease-in-out infinite' },
      slide: { animation: 'slide-in 0.4s ease-out forwards' },
    };
    return animationMap[animation] || {};
  }, [animation]);

  const renderPreview = () => {
    const baseStyle = { ...previewStyle, transition: 'all 0.3s ease', outline: 'none' };

    switch (componentType) {
      case 'button':
        return (
          <button
            style={{ ...baseStyle, ...animationStyle, cursor: 'pointer' }}
            className="font-medium"
          >
            按钮
          </button>
        );
      case 'card':
        return (
          <div
            style={{ ...baseStyle, ...animationStyle, minWidth: '200px', textAlign: 'left' }}
          >
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>卡片标题</div>
            <div style={{ fontSize: '0.875em', opacity: 0.8 }}>卡片内容文字</div>
          </div>
        );
      case 'input':
        return (
          <input
            type="text"
            placeholder="输入框占位文本"
            style={{
              ...baseStyle,
              color: previewStyle.color || '#000',
              background: previewStyle.background || '#fff',
            }}
          />
        );
      case 'list':
        return (
          <div style={{ ...baseStyle, ...animationStyle, minWidth: '180px', textAlign: 'left', padding: '8px' }}>
            {['列表项 1', '列表项 2', '列表项 3'].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  color: previewStyle.color || 'inherit',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        );
      case 'nav':
        return (
          <div
            style={{
              ...baseStyle,
              ...animationStyle,
              display: 'flex',
              gap: '12px',
              padding: '8px 16px',
              color: previewStyle.color || '#fff',
            }}
          >
            {['首页', '搜索', '我的'].map((item, i) => (
              <span key={i} style={{ padding: '4px 8px' }}>{item}</span>
            ))}
          </div>
        );
      case 'dialog':
        return (
          <div
            style={{
              ...baseStyle,
              ...animationStyle,
              padding: '24px',
              minWidth: '240px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              textAlign: 'left',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '12px' }}>弹窗标题</div>
            <div style={{ fontSize: '0.875em', marginBottom: '16px', opacity: 0.8 }}>
              弹窗内容文字
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                style={{
                  ...baseStyle,
                  padding: '6px 12px',
                  fontSize: '12px',
                  opacity: 0.8,
                }}
              >
                取消
              </button>
              <button
                style={{
                  ...baseStyle,
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                确定
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div style={{ ...baseStyle, ...animationStyle }}>
            预览区域
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
      <div className="mb-6 text-slate-400 text-sm">
        实时预览 · 选择维度后查看效果
      </div>
      <div className="transform scale-100">
        {renderPreview()}
      </div>
    </div>
  );
}
