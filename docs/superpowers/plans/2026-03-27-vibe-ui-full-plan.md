# Vibe-UI 词典项目 · 完整实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成 Vibe-UI 词典产品的功能开发，包括 Recipe 配方系统、上线部署、以及后续功能迭代

**Architecture:** 
- **当前分支**: `vibe-nextjs/feature/nextjs` (Next.js 重构版)
- **技术栈**: Next.js 16.2.1 + Tailwind CSS 4 + Framer Motion 12.38.0 + Fuse.js 7.1.0
- **工作流**: Git Worktree 管理多模块并行开发
- **部署**: Vercel

**Tech Stack:** 
- Next.js 16.2.1
- Tailwind CSS 4
- Framer Motion 12.38.0
- Fuse.js 7.1.0
- TypeScript 5
- ESLint 9

---

## 项目现状

### ✅ 已完成

| 模块 | 状态 | 位置 |
|------|------|------|
| 50 个动效词条 | ✅ 完成 | `vibe-nextjs/lib/effects.ts` |
| 动效预览 Demo | ✅ 完成 | `vibe-nextjs/components/EffectCard.tsx` |
| 搜索 + 分类筛选 | ✅ 完成 | `vibe-nextjs/app/page.tsx` |
| 复制提示词/代码 | ✅ 完成 | EffectCard 内置 |
| 12 个分类体系 | ✅ 完成 | 见项目设计文档 |

### 🔴 待完成

| 功能 | 优先级 | 说明 |
|------|--------|------|
| Recipe 配方生成器 | 🔴 立即 | 提示词公式功能，Phase 1 纯前端拼接 |
| Vercel 部署 | 🔴 立即 | 正式上线 |
| 拼音搜索 | 🟡 待开发 | 模糊匹配支持拼音 |
| 瀑布流布局 | 🟡 待开发 | 不同尺寸动效自适应展示 |
| 收藏功能 | 🟢 长期 | 本地存储用户收藏 |
| 效果对比视图 | 🟢 长期 | 两个动效并排对比 |

---

## File Structure

```
vibe-nextjs/
├── app/
│   ├── page.tsx           # 主页面（需修改：添加 Recipe Tab）
│   ├── layout.tsx         # 布局（不变）
│   └── globals.css        # 全局样式 + 动画
├── components/
│   └── EffectCard.tsx     # 效果卡片（不变）
├── lib/
│   ├── effects.ts         # 50 个动效数据（不变）
│   └── recipes.ts         # NEW: Recipe 配方数据
└── docs/superpowers/plans/
    ├── 2026-03-27-recipe-feature.md  # Recipe 详细实现计划（已存在）
    └── 2026-03-27-vibe-ui-full-plan.md  # 本计划
```

---

## Phase 1: Recipe 配方系统 🔴 立即执行

> **参考文档**: `2026-03-27-recipe-feature.md`（已存在于 `vibe-ui-demo/docs/superpowers/plans/`）
> 
> **执行方式**: 直接参考该计划执行，无需重复制定细节

### 执行步骤

- [ ] **Step 1**: 参考 `vibe-ui-demo/docs/superpowers/plans/2026-03-27-recipe-feature.md` 创建文件
- [ ] **Step 2**: 创建 `lib/recipes.ts` - Recipe 维度定义 + 预设配方
- [ ] **Step 3**: 创建 `components/RecipeBuilder.tsx` - 配方构建器
- [ ] **Step 4**: 创建 `components/RecipeOutput.tsx` - 生成结果展示
- [ ] **Step 5**: 创建 `components/PresetRecipeCard.tsx` - 预设配方卡片
- [ ] **Step 6**: 修改 `app/page.tsx` - 添加 Recipe Tab 切换
- [ ] **Step 7**: 验证功能完整性
- [ ] **Step 8**: 文档同步更新

### 验证清单

```bash
npm run dev
# 访问 http://localhost:3000
# ✅ 主页显示「动效词条」和「配方生成」两个 Tab
# ✅ 点击「配方生成」显示预设配方（4个）+ 自定义配方构建器
# ✅ 选择完所有维度后可生成提示词并复制
# ✅ ESLint 检查通过
```

---

## Phase 2: Vercel 部署 🔴 立即执行

> **参考 Skill**: `superpowers:setup-deploy`

### 执行步骤

- [ ] **Step 1**: 调用 `setup-deploy` skill 配置 Vercel 部署
- [ ] **Step 2**: 推送 `feature/nextjs` 到 GitHub（如果尚未推送）
- [ ] **Step 3**: 在 Vercel 创建项目并连接 GitHub 仓库
- [ ] **Step 4**: 配置环境变量（如有）
- [ ] **Step 5**: 触发首次部署
- [ ] **Step 6**: 验证线上版本功能正常
- [ ] **Step 7**: 更新文档中的部署状态

### 部署后验证

```bash
# 访问 Vercel 分配的 URL
# ✅ 动效词条页面正常显示
# ✅ 配方生成功能正常
# ✅ 复制功能正常
# ✅ 移动端适配正常
```

---

## Phase 3: 拼音搜索 🟡 待开发

### 功能描述

支持用户输入拼音（如 "huadong"）搜索"滑动"相关词条

### 技术方案

```typescript
// 使用 pinyin-pro 或 node-pinyin 库
import { pinyin } from 'pinyin-pro';

// 在 effects 数据中预计算拼音
export interface Effect {
  id: string;
  name: string;
  namePinyin: string;  // 新增：名字拼音
  // ... 其他字段
}

// Fuse.js 配置中添加 namePinyin 到搜索 keys
const fuse = new Fuse(effects, {
  keys: ['name', 'namePinyin', 'prompt'],
  threshold: 0.3,
});
```

### 执行步骤

- [ ] **Step 1**: 安装 `pinyin-pro` 依赖
- [ ] **Step 2**: 预计算所有 50 个词条的拼音
- [ ] **Step 3**: 更新 `lib/effects.ts` 添加 `namePinyin` 字段
- [ ] **Step 4**: 修改 `app/page.tsx` 的 Fuse.js 配置
- [ ] **Step 5**: 验证拼音搜索正常
- [ ] **Step 6**: 更新项目设计文档

---

## Phase 4: 瀑布流布局 🟡 待开发

### 功能描述

动效词条以瀑布流形式展示，不同效果卡片高度自适应

### 技术方案

```tsx
// 使用 masonry-layout 或自己实现 CSS columns
// 方案1: CSS columns
<div className="columns-2 md:columns-3 lg:columns-4 gap-4">
  {effects.map(effect => (
    <div className="break-inside-avoid mb-4">
      <EffectCard effect={effect} />
    </div>
  ))}
</div>

// 方案2: 使用 react-masonry-css
```

### 执行步骤

- [ ] **Step 1**: 评估现有布局是否满足需求
- [ ] **Step 2**: 设计瀑布流适配方案
- [ ] **Step 3**: 实现瀑布流组件
- [ ] **Step 4**: 验证不同尺寸屏幕正常显示
- [ ] **Step 5**: 更新项目计划与日志

---

## Phase 5: 收藏功能 🟢 长期

### 功能描述

用户可以收藏常用词条，本地存储

### 技术方案

```typescript
// 使用 localStorage 存储收藏的 effect ids
const FAVORITES_KEY = 'vibe-ui-favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
}

export function toggleFavorite(effectId: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(effectId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(effectId);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
```

### 执行步骤

- [ ] **Step 1**: 实现 localStorage 工具函数
- [ ] **Step 2**: 创建 `useFavorites` hook
- [ ] **Step 3**: 在 EffectCard 添加收藏按钮
- [ ] **Step 4**: 添加收藏筛选功能
- [ ] **Step 5**: 文档同步

---

## Phase 6: 效果对比视图 🟢 长期

### 功能描述

用户可以选择两个动效并排对比

### 技术方案

```tsx
// CompareView 组件
function CompareView() {
  const [left, setLeft] = useState<Effect | null>(null);
  const [right, setRight] = useState<Effect | null>(null);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <EffectPicker selected={left} onSelect={setLeft} />
      <EffectPicker selected={right} onSelect={setRight} />
      {left && <EffectCard effect={left} />}
      {right && <EffectCard effect={right} />}
    </div>
  );
}
```

### 执行步骤

- [ ] **Step 1**: 创建 EffectPicker 组件
- [ ] **Step 2**: 创建 CompareView 组件
- [ ] **Step 3**: 集成到主页
- [ ] **Step 4**: 文档同步

---

## 依赖关系图

```
Phase 1: Recipe 配方系统
    ↓
Phase 2: Vercel 部署
    ↓
Phase 3: 拼音搜索 ←→ Phase 4: 瀑布流布局（可并行）
    ↓
Phase 5: 收藏功能
    ↓
Phase 6: 效果对比视图
```

---

## 执行建议

### 1. Subagent-Driven（推荐）

使用 `superpowers:subagent-driven-development` skill：
- 每个 Phase 分配一个 subagent
- Phase 内多个任务并行执行
- 完成后 review 并合并

### 2. 快速验证

每完成一个功能立即验证：
```bash
npm run dev    # 开发验证
npm run lint   # ESLint 检查
npm run build  # 生产构建
```

### 3. 文档同步

每次完成功能后同步更新：
- `Vibe-UI-词典-项目计划与日志.md` - 记录完成的任务
- `Vibe-UI-词典-项目设计.md` - 更新设计规范

---

## 后续探索（不在本计划范围）

### Phase 2+ 接入 LLM 润色

```typescript
// 配方提示词生成后，调用 LLM API 润色
const refinedPrompt = await fetch('/api/refine', {
  method: 'POST',
  body: JSON.stringify({ prompt: generatedPrompt })
});
```

### 配方分享功能

```typescript
// 生成分享链接
const shareUrl = `/recipe?config=${btoa(JSON.stringify(selections))}`;
// 访问时解析并还原选择状态
```

### 社区贡献词条

- 用户提交新的感觉词 + 对应效果
- 平台审核后合并到词条库
- 商业模式：投稿奖励 + 付费曝光

---

## 创建时间

2026-03-27

## 相关文档

- `Vibe-UI词典-项目概览.md` — 项目背景与启动方式
- `Vibe-UI词典-项目计划与日志.md` — 进度管理与踩坑记录
- `Vibe-UI词典-项目设计.md` — 词条体系与设计规范
- `Vibe-UI词典-项目商业分析.md` — 竞品分析与商业方向
- `2026-03-27-recipe-feature.md` — Recipe 功能详细实现计划（vibe-ui-demo 工作树）
