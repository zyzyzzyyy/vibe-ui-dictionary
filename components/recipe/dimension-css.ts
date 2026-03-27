// Dimension → CSS mapping for Recipe Visualizer

export interface DimensionCSS {
  background?: string;
  backgroundImage?: string;
  borderRadius?: string;
  boxShadow?: string;
  border?: string;
  padding?: string;
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  backdropFilter?: string;
  animation?: string;
  transform?: string;
  transition?: string;
  layout?: string;
  width?: string;
  height?: string;
}

// Material dimension → CSS
export const materialCSS: Record<string, DimensionCSS> = {
  glass: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
  },
  metal: {
    background: 'linear-gradient(145deg, #d4d4d4, #8a8a8a)',
    borderRadius: '8px',
    border: '1px solid #999',
  },
  plastic: {
    background: '#f5f5f5',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
  },
  fabric: {
    background: 'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e8e8e8 10px, #e8e8e8 20px)',
    borderRadius: '8px',
  },
  wood: {
    background: 'linear-gradient(90deg, #8B4513, #D2691E)',
    borderRadius: '4px',
    border: '2px solid #5D3A1A',
  },
  ceramic: {
    background: '#faf0e6',
    borderRadius: '12px',
    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e8dcd0',
  },
};

// Size dimension → CSS
export const sizeCSS: Record<string, DimensionCSS> = {
  tiny: {
    padding: '8px 16px',
    fontSize: '12px',
    transform: 'scale(0.8)',
  },
  standard: {
    padding: '12px 24px',
    fontSize: '14px',
    transform: 'scale(1)',
  },
  dramatic: {
    padding: '20px 40px',
    fontSize: '18px',
    transform: 'scale(1.3)',
  },
  fullscreen: {
    padding: '40px 80px',
    fontSize: '24px',
    width: '100vw',
    height: '100vh',
  },
};

// Color dimension → CSS
export const colorCSS: Record<string, DimensionCSS> = {
  morandi: {
    background: '#d5ccc4',
    color: '#5a5a5a',
  },
  neon: {
    background: 'linear-gradient(135deg, #667eea, #f093fb)',
    color: '#ffffff',
    boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
  },
  retro: {
    background: '#8B4513',
    color: '#FFE4C4',
  },
  cyberpunk: {
    background: '#0a0a0a',
    color: '#00ffff',
    boxShadow: '0 0 10px #00ffff, 0 0 20px #ff00ff',
  },
  fresh: {
    background: '#e8f5e9',
    color: '#2e7d32',
  },
};

// Animation dimension → CSS animation string
export const animationCSS: Record<string, string> = {
  spring: 'spring-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  gradient: 'fade-in 0.4s ease-out',
  snap: 'snap 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  pulse: 'pulse 2s ease-in-out infinite',
  slide: 'slide-in 0.4s ease-out',
};

// Font dimension → CSS
export const fontCSS: Record<string, DimensionCSS> = {
  sans: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  serif: {
    fontFamily: 'Georgia, Times New Roman, serif',
  },
  handwriting: {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
  },
  mono: {
    fontFamily: '"SF Mono", Monaco, Consolas, monospace',
  },
};

// Layout dimension → CSS string
export const layoutCSS: Record<string, string> = {
  grid: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;',
  waterfall: 'column-count: 3; column-gap: 16px;',
  free: 'display: block;',
  stacked: 'display: flex; flex-direction: column; gap: 12px;',
};

/**
 * Generate complete CSS string from dimension selections
 * @param selections - Object with dimension ids as keys and selected option ids as values
 * @returns CSS string with property: value; per line
 */
export function generateRecipeCSS(selections: Record<string, string>): string {
  const lines: string[] = [];

  // Material
  const material = materialCSS[selections.material];
  if (material) {
    if (material.background) lines.push(`background: ${material.background};`);
    if (material.backdropFilter) lines.push(`backdrop-filter: ${material.backdropFilter};`);
    if (material.border) lines.push(`border: ${material.border};`);
    if (material.borderRadius) lines.push(`border-radius: ${material.borderRadius};`);
    if (material.boxShadow) lines.push(`box-shadow: ${material.boxShadow};`);
  }

  // Color (only if no material background set)
  const color = colorCSS[selections.color];
  if (color) {
    if (color.background && !material?.background) {
      lines.push(`background: ${color.background};`);
    }
    if (color.color) lines.push(`color: ${color.color};`);
    if (color.boxShadow && !material?.boxShadow) {
      lines.push(`box-shadow: ${color.boxShadow};`);
    }
  }

  // Size
  const size = sizeCSS[selections.size];
  if (size) {
    if (size.fontSize) lines.push(`font-size: ${size.fontSize};`);
    if (size.padding && selections.size !== 'fullscreen') {
      lines.push(`padding: ${size.padding};`);
    }
    if (size.transform && selections.size !== 'standard') {
      lines.push(`transform: ${size.transform};`);
    }
  }

  // Font
  const font = fontCSS[selections.font];
  if (font?.fontFamily) {
    lines.push(`font-family: ${font.fontFamily};`);
  }

  // Animation
  const animation = animationCSS[selections.animation];
  if (animation) {
    lines.push(`animation: ${animation};`);
  }

  // Transition
  if (material || size?.transform) {
    lines.push(`transition: all 0.3s ease;`);
  }

  return lines.join('\n');
}

/**
 * Generate a React.CSSProperties object from selections for inline styles
 */
export function getPreviewStyle(selections: Record<string, string>): React.CSSProperties {
  const style: React.CSSProperties = {};

  // Material
  const material = materialCSS[selections.material];
  if (material) {
    if (material.background) style.background = material.background;
    if (material.backdropFilter) style.backdropFilter = material.backdropFilter;
    if (material.border) style.border = material.border;
    if (material.borderRadius) style.borderRadius = material.borderRadius;
    if (material.boxShadow) style.boxShadow = material.boxShadow;
    if (material.padding) style.padding = material.padding;
  }

  // Color
  const color = colorCSS[selections.color];
  if (color) {
    if (color.background && !material?.background) style.background = color.background;
    if (color.color) style.color = color.color;
    if (color.boxShadow && !material?.boxShadow) style.boxShadow = color.boxShadow;
  }

  // Size
  const size = sizeCSS[selections.size];
  if (size) {
    if (size.fontSize) style.fontSize = size.fontSize;
    if (size.transform && selections.size !== 'standard') {
      style.transform = size.transform;
    }
  }

  // Font
  const font = fontCSS[selections.font];
  if (font?.fontFamily) style.fontFamily = font.fontFamily;

  return style;
}
