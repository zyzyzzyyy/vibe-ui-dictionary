export interface Dimension {
  id: string;
  label: string;
  options: DimensionOption[];
}

export interface DimensionOption {
  id: string;
  label: string;
  description?: string;
  promptSnippet: string;
}

export interface PresetRecipe {
  id: string;
  name: string;
  emoji: string;
  description: string;
  selections: Record<string, string>;
  generatedPrompt: string;
}

export const dimensions: Dimension[] = [
  {
    id: 'component',
    label: '组件',
    options: [
      { id: 'button', label: '按钮', promptSnippet: '按钮组件' },
      { id: 'card', label: '卡片', promptSnippet: '卡片组件' },
      { id: 'list', label: '列表', promptSnippet: '列表组件' },
      { id: 'form', label: '表单', promptSnippet: '表单组件' },
      { id: 'nav', label: '导航', promptSnippet: '导航组件' },
      { id: 'dialog', label: '弹窗', promptSnippet: '弹窗组件' },
    ],
  },
  {
    id: 'material',
    label: '材质',
    options: [
      { id: 'glass', label: '玻璃', promptSnippet: '玻璃拟态材质，半透明毛玻璃效果' },
      { id: 'metal', label: '金属', promptSnippet: '金属质感，拉丝或镜面效果' },
      { id: 'plastic', label: '塑料', promptSnippet: '塑料材质，圆润光滑' },
      { id: 'fabric', label: '布料', promptSnippet: '布料纹理，柔软质感' },
      { id: 'wood', label: '木材', promptSnippet: '木纹材质，自然温暖' },
      { id: 'ceramic', label: '陶瓷', promptSnippet: '陶瓷质感，温润光泽' },
    ],
  },
  {
    id: 'size',
    label: '尺寸',
    options: [
      { id: 'tiny', label: '微小', promptSnippet: '紧凑小尺寸' },
      { id: 'standard', label: '标准', promptSnippet: '标准尺寸' },
      { id: 'dramatic', label: '夸张', promptSnippet: '大尺寸夸张比例' },
      { id: 'fullscreen', label: '全屏', promptSnippet: '全屏沉浸式尺寸' },
    ],
  },
  {
    id: 'font',
    label: '字体',
    options: [
      { id: 'sans', label: '无衬线', promptSnippet: '无衬线字体（如 Inter, SF Pro）' },
      { id: 'serif', label: '衬线', promptSnippet: '衬线字体（如 Georgia, Times）' },
      { id: 'handwriting', label: '手写', promptSnippet: '手写字体' },
      { id: 'mono', label: '等宽', promptSnippet: '等宽字体（如 JetBrains Mono）' },
    ],
  },
  {
    id: 'color',
    label: '色彩',
    options: [
      { id: 'morandi', label: '莫兰迪', promptSnippet: '莫兰迪色系，低饱和度高级灰' },
      { id: 'neon', label: '霓虹', promptSnippet: '霓虹色彩，高饱和度发光' },
      { id: 'retro', label: '复古', promptSnippet: '复古色调，泛黄怀旧' },
      { id: 'cyberpunk', label: '赛博朋克', promptSnippet: '赛博朋克，青色+品红' },
      { id: 'fresh', label: '清新', promptSnippet: '清新配色，绿白蓝' },
    ],
  },
  {
    id: 'animation',
    label: '动效',
    options: [
      { id: 'spring', label: '弹性', promptSnippet: '弹簧弹性动效，overshoot 回弹' },
      { id: 'gradient', label: '渐变', promptSnippet: '渐变过渡动画' },
      { id: 'snap', label: '吸附', promptSnippet: '磁力吸附动效' },
      { id: 'pulse', label: '脉冲', promptSnippet: '脉冲呼吸动画' },
      { id: 'slide', label: '滑入', promptSnippet: '滑入滑出动效' },
    ],
  },
  {
    id: 'layout',
    label: '布局',
    options: [
      { id: 'grid', label: '网格', promptSnippet: '规整网格布局' },
      { id: 'waterfall', label: '瀑布流', promptSnippet: '瀑布流不规则布局' },
      { id: 'free', label: '自由', promptSnippet: '自由布局' },
      { id: 'stacked', label: '堆叠', promptSnippet: '卡片堆叠布局' },
    ],
  },
];

export const presetRecipes: PresetRecipe[] = [
  {
    id: 'ios-style',
    name: 'iOS 风格',
    emoji: '🍎',
    description: '玻璃卡片 + 标准尺寸 + SF Pro 字体 + 清新色彩 + 弹性动效',
    selections: {
      component: 'card',
      material: 'glass',
      size: 'standard',
      font: 'sans',
      color: 'fresh',
      animation: 'spring',
      layout: 'stacked',
    },
    generatedPrompt: '设计一个 iOS 风格的卡片组件，采用玻璃拟态材质，标准尺寸，使用无衬线字体，清新配色，弹簧弹性动效，卡片堆叠布局',
  },
  {
    id: 'material-design',
    name: 'Material Design',
    emoji: '🎨',
    description: '塑料材质 + 标准尺寸 + Roboto 字体 + 莫兰迪色彩 + 涟漪动效',
    selections: {
      component: 'card',
      material: 'plastic',
      size: 'standard',
      font: 'sans',
      color: 'morandi',
      animation: 'pulse',
      layout: 'grid',
    },
    generatedPrompt: '设计一个 Material Design 风格的卡片组件，采用塑料材质，标准尺寸，使用无衬线字体，莫兰迪配色，脉冲呼吸动效，网格布局',
  },
  {
    id: 'glassmorphism',
    name: '玻璃态',
    emoji: '🔮',
    description: '玻璃材质 + 标准尺寸 + 无衬线字体 + 清新色彩 + 模糊效果',
    selections: {
      component: 'card',
      material: 'glass',
      size: 'standard',
      font: 'sans',
      color: 'fresh',
      animation: 'gradient',
      layout: 'free',
    },
    generatedPrompt: '设计一个玻璃拟态卡片组件，采用玻璃材质，标准尺寸，使用无衬线字体，清新配色，渐变过渡动画，自由布局',
  },
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    emoji: '🌃',
    description: '金属材质 + 夸张尺寸 + 等宽字体 + 霓虹色彩 + 脉冲动效',
    selections: {
      component: 'dialog',
      material: 'metal',
      size: 'dramatic',
      font: 'mono',
      color: 'cyberpunk',
      animation: 'pulse',
      layout: 'free',
    },
    generatedPrompt: '设计一个赛博朋克风格的弹窗组件，采用金属材质，夸张尺寸，使用等宽字体，赛博朋克配色，脉冲呼吸动效，自由布局',
  },
  {
    id: 'minimal-fresh',
    name: '极简清新',
    emoji: '🌿',
    description: '塑料材质 + 标准尺寸 + 无衬线字体 + 清新色彩 + 滑入动效',
    selections: {
      component: 'card',
      material: 'plastic',
      size: 'standard',
      font: 'sans',
      color: 'fresh',
      animation: 'slide',
      layout: 'grid',
    },
    generatedPrompt: '设计一个极简清新风格的卡片组件，采用塑料材质，标准尺寸，使用无衬线字体，清新配色，滑入动效，网格布局',
  },
  {
    id: 'retro-warm',
    name: '复古纸质',
    emoji: '📜',
    description: '木材材质 + 标准尺寸 + 衬线字体 + 复古色彩 + 吸附动效',
    selections: {
      component: 'list',
      material: 'wood',
      size: 'standard',
      font: 'serif',
      color: 'retro',
      animation: 'snap',
      layout: 'stacked',
    },
    generatedPrompt: '设计一个复古纸质风格的列表组件，采用木材材质，标准尺寸，使用衬线字体，复古配色，吸附动效，卡片堆叠布局',
  },
  {
    id: 'neumorphism-soft',
    name: '新拟物',
    emoji: '🧈',
    description: '陶瓷材质 + 标准尺寸 + 无衬线字体 + 莫兰迪色彩 + 弹性动效',
    selections: {
      component: 'button',
      material: 'ceramic',
      size: 'standard',
      font: 'sans',
      color: 'morandi',
      animation: 'spring',
      layout: 'grid',
    },
    generatedPrompt: '设计一个新拟物风格的按钮组件，采用陶瓷材质，标准尺寸，使用无衬线字体，莫兰迪配色，弹簧弹性动效，网格布局',
  },
  {
    id: 'neon-glow',
    name: '霓虹发光',
    emoji: '💡',
    description: '金属材质 + 夸张尺寸 + 等宽字体 + 霓虹色彩 + 脉冲动效',
    selections: {
      component: 'button',
      material: 'metal',
      size: 'dramatic',
      font: 'mono',
      color: 'neon',
      animation: 'pulse',
      layout: 'grid',
    },
    generatedPrompt: '设计一个霓虹发光风格的按钮组件，采用金属材质，夸张尺寸，使用等宽字体，霓虹配色，脉冲呼吸动效，网格布局',
  },
];

export function generatePrompt(selections: Record<string, string>): string {
  const parts: string[] = ['设计一个'];
  
  const selectedLabels: string[] = [];
  
  for (const [dimensionId, optionId] of Object.entries(selections)) {
    const dimension = dimensions.find(d => d.id === dimensionId);
    const option = dimension?.options.find(o => o.id === optionId);
    if (dimension && option) {
      selectedLabels.push(`${option.label}${dimension.label}`);
    }
  }
  
  if (selectedLabels.length >= 2) {
    parts.push(selectedLabels.slice(0, -1).join('+'));
    parts.push('风格');
    parts.push('的');
    parts.push(selectedLabels[selectedLabels.length - 1]);
    parts.push('组件');
  }
  
  const materialOption = dimensions
    .find(d => d.id === 'material')
    ?.options.find(o => o.id === selections.material);
  if (materialOption) {
    parts.push('，采用' + materialOption.promptSnippet);
  }
  
  const animationOption = dimensions
    .find(d => d.id === 'animation')
    ?.options.find(o => o.id === selections.animation);
  if (animationOption) {
    parts.push('，' + animationOption.promptSnippet);
  }
  
  const layoutOption = dimensions
    .find(d => d.id === 'layout')
    ?.options.find(o => o.id === selections.layout);
  if (layoutOption) {
    parts.push('，' + layoutOption.promptSnippet);
  }
  
  return parts.join('');
}
