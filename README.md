# Vibe-UI 词典

**感觉词 → 前端效果** 的精准对照工具库

[![GitHub Stars](https://img.shields.io/github/stars/zyzyzzyyy/vibe-ui-dictionary)](https://github.com/zyzyzzyyy/vibe-ui-dictionary)
[![Deploy with Vercel](https://vercel.com/button)](https://vibe-ui-dictionary.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🔍 项目简介

### 核心问题

在 vibe coding 时，很多人无法精准描述想要的 UI/动效效果——不懂设计词汇，不知道想要的效果叫什么。AI 接收模糊描述后输出不稳定。

### 解决方案

**Vibe UI** 是一座桥梁：将「模糊感觉词」精准翻译成「前端效果代码」。

### 目标用户

- 不懂设计的前端开发者
- 想用 vibe coding 但做不出好看 UI 的人
- AI coding 时代的所有开发者

---

## ✨ 核心功能

| 功能 | 说明 |
|------|------|
| 📚 **词条库** | 收录 50+ 常见感觉词 + 对应前端效果 |
| 🎬 **效果预览** | 动图/GIF 展示实际效果，支持 hover/click/auto/静态 触发方式 |
| 🔍 **智能搜索** | 支持中文、拼音模糊匹配 |
| 📋 **代码片段** | 一键复制 CSS/组件代码 |
| 🎨 **配方生成器** | 组件 + 材质 + 尺寸 + 字体 + 色彩 + 动效 + 布局自由组合 |
| ⭐ **收藏功能** | 本地存储收藏词条 |
| ⚖️ **效果对比** | 两个动效并排对比 |

---

## 🛠️ 技术栈

| 类型 | 选择 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 动效 | Framer Motion + CSS Animation |
| 组件库 | shadcn/ui |
| 搜索 | Fuse.js（支持拼音） |
| 拼音 | pinyin-pro |
| 部署 | Vercel |

---

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/zyzyzzyyy/vibe-ui-dictionary.git
cd vibe-ui-dictionary

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

---

## 📁 项目结构

```
vibe-ui-dictionary/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 主页面（词典/配方/对比 三个 Tab）
│   ├── ClientPage.tsx        # 客户端页面逻辑
│   ├── layout.tsx           # 根布局
│   └── globals.css          # 全局样式 + CSS 动效 keyframes
├── components/               # React 组件
│   ├── EffectCard.tsx       # 词条卡片（含收藏按钮）
│   ├── CompareView.tsx      # 效果对比视图
│   ├── RecipeBuilder.tsx    # 配方生成器（可视化）
│   ├── RecipeOutput.tsx     # 配方输出展示（含 CSS）
│   ├── PresetRecipeCard.tsx # 预设配方卡片
│   └── recipe/              # 配方可视化模块
│       ├── RecipeVisualizer.tsx  # 实时预览画布
│       └── dimension-css.ts      # 维度 → CSS 映射
├── lib/                      # 核心数据与工具
│   ├── effects.ts           # 50+ 词条数据（含拼音）
│   ├── recipes.ts           # 配方维度 + 预设配方
│   └── favorites.ts         # localStorage 收藏管理
└── docs/                    # 开发文档
```

---

## 🎨 词条分类

目前收录 **50** 个感觉词，覆盖 **12** 个分类：

| 分类 | 示例词条 |
|------|----------|
| 空间感 | 悬浮、层叠、景深 |
| 流动感 | 飘动、流动、漂浮 |
| 弹性 | 果冻、抖动、碰撞 |
| 重量感 | 下坠、沉稳、坠落 |
| 轻盈感 | 飘浮、漂浮、蒸腾 |
| 呼吸感 | 脉冲、律动、闪烁 |
| 质感 | 毛玻璃、玻璃态、液态 |
| 节奏感 | 弹跳、节拍、韵律 |
| 互动反馈 | 按压、涟漪、磁吸 |
| 聚合感 | 融合、聚拢、凝结 |
| 延展感 | 展开、延伸、扩散 |
| 仪式感 | 揭晓、强调、确认 |

---

## 🎨 配方可视化生成器

Recipe 配方 = **7 个维度** 的自由组合，实时预览效果 + 一键复制 CSS：

```
组件：按钮 | 卡片 | 列表 | 表单 | 导航 | 弹窗
材质：玻璃 | 金属 | 塑料 | 布料 | 木材 | 陶瓷
尺寸：微小 | 标准 | 夸张 | 全屏
字体：无衬线 | 衬线 | 手写 | 等宽
色彩：莫兰迪 | 霓虹 | 复古 | 赛博朋克 | 清新
动效：弹性 | 渐变 | 吸附 | 脉冲 | 滑入
布局：网格 | 瀑布流 | 自由 | 堆叠
```

### 功能特点

- **实时预览**：选择维度后立即看到效果
- **CSS 生成**：自动生成可复制的 CSS 代码
- **URL 分享**：配方可通过 URL 分享
- **预设配方**：8 个预设风格一键使用

### 预设配方

| 配方名 | 风格描述 |
|--------|----------|
| iOS 风格 | 玻璃卡片 + SF Pro 字体 + 弹性动效 |
| Material Design | 塑料卡片 + Roboto + 涟漪反馈 |
| 玻璃态 | 毛玻璃 + 清新色彩 + 模糊背景 |
| 赛博朋克 | 全屏弹窗 + 霓虹色彩 + 脉冲动效 |
| 极简清新 | 塑料卡片 + 清新配色 + 滑入动效 |
| 复古纸质 | 木材列表 + 衬线字体 + 吸附动效 |
| 新拟物 | 陶瓷按钮 + 莫兰迪色 + 弹性动效 |
| 霓虹发光 | 金属按钮 + 霓虹配色 + 脉冲动效 |

---

## 🌐 在线预览

**生产环境**: https://vibe-ui-dictionary.vercel.app/

---

## 📦 竞品对比

| 维度 | Motion (Framer Motion) | Vibe UI |
|------|------------------------|---------|
| 目标用户 | 程序员 | 不懂设计的开发者、vibe coder |
| 入口方式 | 知道库 → 找动画 | 说出感觉词 → 得效果 |
| 核心价值 | 代码级复制 | 感觉词 → 代码翻译层 |

---

## 📅 更新日志

| 日期 | 内容 |
|------|------|
| 2026-03-28 | Recipe 可视化生成器（实时预览 + CSS 生成 + URL 分享） |
| 2026-03-28 | 新增 4 个预设配方（极简、复古、新拟物、霓虹） |
| 2026-03-27 | GitHub 推送 + Vercel 部署上线 |
| 2026-03-27 | Recipe 配方生成功能 |
| 2026-03-27 | hover/click 交互预览 |
| 2026-03-27 | 液态融合 SVG goo filter |
| 2026-03-27 | tilt-demo 动画补全 |
| 2026-03-26 | 扩词条到 50 个 |
| 2026-03-26 | 搭建 Next.js 框架 |

---

## 👤 作者

**GitHub**: [@zyzyzzyyy](https://github.com/zyzyzzyyy)

**在线项目**: https://vibe-ui-dictionary.vercel.app/

---

## 📄 License

MIT License
