'use client';

import { useState } from 'react';

const prompts: Record<string, string> = {
  button: '创建一个 iOS 风格的毛玻璃按钮，带有圆角边框，背景为半透明白色，hover 时微微变亮，点击时有弹性缩放效果。',
  input: '创建一个 iOS 风格的毛玻璃输入框，背景为半透明，聚焦时边框变亮，带有圆角和过渡动画。',
  card: '创建一个 iOS 风格的毛玻璃卡片，带有圆角边框、轻微阴影、hover 时背景变亮的效果。',
  modal: '创建一个 iOS 风格的毛玻璃弹窗，带有深背景遮罩、居中显示、圆角大边框、阴影效果。',
  tabbar: '创建一个 iOS 风格的毛玻璃标签栏，底部固定、圆角背景、选中项高亮毛玻璃效果。',
  list: '创建一个 iOS 风格的毛玻璃列表项，带有半透明背景、hover 时背景变亮效果。',
  toggle: '创建一个 iOS 风格的开关控件，圆形滑块、开启时绿色、带有弹性动画。',
};

const cssMap: Record<string, string> = {
  button: `.ios-button {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  color: white;
  padding: 10px 20px;
  transition: all 0.2s ease;
}
.ios-button:hover {
  background: rgba(255, 255, 255, 0.3);
}
.ios-button:active {
  transform: scale(0.95);
}`,
  input: `.ios-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
  transition: border-color 0.2s ease;
}
.ios-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
.ios-input:focus {
  border-color: rgba(255, 255, 255, 0.5);
  outline: none;
}`,
  card: `.ios-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 16px;
  transition: background 0.2s ease;
}
.ios-card:hover {
  background: rgba(255, 255, 255, 0.15);
}`,
  modal: `.ios-modal {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  padding: 24px;
}
.ios-modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}`,
  tabbar: `.ios-tabbar {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 8px;
  display: flex;
  justify-content: space-around;
}
.ios-tabbar-item {
  padding: 8px 16px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
}
.ios-tabbar-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}`,
  list: `.ios-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  transition: background 0.2s ease;
}
.ios-list-item:hover {
  background: rgba(255, 255, 255, 0.1);
}`,
  toggle: `.ios-toggle {
  width: 56px;
  height: 32px;
  border-radius: 16px;
  padding: 4px;
  background: rgba(100, 100, 100, 0.5);
  transition: background 0.3s ease;
}
.ios-toggle.active {
  background: #34C759;
}
.ios-toggle-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}`,
};

function copyToClipboard(text: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export default function IOSRecipeDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [toggleOn, setToggleOn] = useState(false);
  const [debugMsg, setDebugMsg] = useState<string>('');

  const handleCopyPrompt = (id: string) => {
    console.log('handleCopyPrompt called:', id);
    setDebugMsg('handleCopyPrompt called: ' + id);
    try {
      copyToClipboard(prompts[id] || '');
      setCopied('prompt-' + id);
      setTimeout(() => setCopied(null), 2000);
    } catch(e) {
      console.error('copy error:', e);
      setDebugMsg('Error: ' + String(e));
    }
  };

  const handleCopyCSS = (id: string) => {
    console.log('handleCopyCSS called:', id);
    setDebugMsg('handleCopyCSS called: ' + id);
    try {
      copyToClipboard(cssMap[id] || '');
      setCopied('css-' + id);
      setTimeout(() => setCopied(null), 2000);
    } catch(e) {
      console.error('copy error:', e);
      setDebugMsg('Error: ' + String(e));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* DEBUG */}
      <div className="max-w-4xl mx-auto mb-4 p-4 bg-yellow-500/20 border border-yellow-500/40 rounded-xl">
        <p className="text-yellow-300 text-sm mb-2">调试信息：点击按钮看这里有没有变化</p>
        <button onClick={() => setDebugMsg('按钮点击成功!')} className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm">
          测试按钮
        </button>
        {debugMsg && <p className="text-yellow-200 text-xs mt-2">{debugMsg}</p>}
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🍎</span>
          <h1 className="text-3xl font-bold text-white">iOS 玻璃态 Recipe</h1>
        </div>
        <p className="text-slate-400">6 个核心组件，统一 iOS 毛玻璃风格</p>
      </div>

      {/* Components Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ===== 1. 按钮 ===== */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🔘</span> 按钮 Button
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <button type="button" className="px-5 py-2.5 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/30 active:scale-95 transition-all cursor-pointer">
              主按钮
            </button>
            <button type="button" className="px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/80 text-sm font-medium hover:bg-white/20 active:scale-95 transition-all cursor-pointer">
              次按钮
            </button>
            <button type="button" className="w-10 h-10 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all cursor-pointer">
              <span className="text-lg">+</span>
            </button>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => handleCopyPrompt('button')} className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm hover:bg-purple-500/30 transition-colors cursor-pointer">
              {copied === 'prompt-button' ? '✓ 已复制' : '📋 复制提示词'}
            </button>
            <button type="button" onClick={() => handleCopyCSS('button')} className="flex-1 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm hover:bg-indigo-500/30 transition-colors cursor-pointer">
              {copied === 'css-button' ? '✓ 已复制' : '💻 核心代码'}
            </button>
          </div>
        </div>

        {/* ===== 2. 输入框 ===== */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">✏️</span> 输入框 Input
          </h2>
          <div className="space-y-4">
            <input type="text" placeholder="用户名" className="w-full bg-white/5 border-b-2 border-white/20 rounded-t-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-white/50 transition-colors" />
            <input type="text" placeholder="搜索..." className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-white/50 transition-colors" />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => handleCopyPrompt('input')} className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm hover:bg-purple-500/30 transition-colors cursor-pointer">
              {copied === 'prompt-input' ? '✓ 已复制' : '📋 复制提示词'}
            </button>
            <button type="button" onClick={() => handleCopyCSS('input')} className="flex-1 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm hover:bg-indigo-500/30 transition-colors cursor-pointer">
              {copied === 'css-input' ? '✓ 已复制' : '💻 核心代码'}
            </button>
          </div>
        </div>

        {/* ===== 3. 卡片 ===== */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🃏</span> 卡片 Card
          </h2>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
              <div>
                <div className="text-white font-medium">阿猿同学</div>
                <div className="text-slate-400 text-sm">程序员的自我修养</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm">写代码是一门艺术，需要不断练习和总结。</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => handleCopyPrompt('card')} className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm hover:bg-purple-500/30 transition-colors cursor-pointer">
              {copied === 'prompt-card' ? '✓ 已复制' : '📋 复制提示词'}
            </button>
            <button type="button" onClick={() => handleCopyCSS('card')} className="flex-1 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm hover:bg-indigo-500/30 transition-colors cursor-pointer">
              {copied === 'css-card' ? '✓ 已复制' : '💻 核心代码'}
            </button>
          </div>
        </div>

        {/* ===== 4. 弹窗 ===== */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🎈</span> 弹窗 Modal
          </h2>
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✓</span>
                </div>
                <div className="text-white font-semibold">操作成功</div>
                <div className="text-slate-400 text-sm">阿猿同学已添加到关注列表</div>
              </div>
              <div className="flex gap-3">
                <button type="button" className="flex-1 py-2.5 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl text-white text-sm hover:bg-white/30 transition-colors cursor-pointer">
                  取消
                </button>
                <button type="button" className="flex-1 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white text-sm font-medium">
                  确定
                </button>
              </div>
            </div>
            <div className="absolute -inset-4 bg-slate-600/20 backdrop-blur-sm -z-10 rounded-3xl" />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => handleCopyPrompt('modal')} className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm hover:bg-purple-500/30 transition-colors cursor-pointer">
              {copied === 'prompt-modal' ? '✓ 已复制' : '📋 复制提示词'}
            </button>
            <button type="button" onClick={() => handleCopyCSS('modal')} className="flex-1 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm hover:bg-indigo-500/30 transition-colors cursor-pointer">
              {copied === 'css-modal' ? '✓ 已复制' : '💻 核心代码'}
            </button>
          </div>
        </div>

        {/* ===== 5. 标签栏 ===== */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">📱</span> 标签栏 Tab Bar
          </h2>
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-2 flex justify-around">
            {['home', 'search', 'bell', 'user'].map((tab) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${activeTab === tab ? 'bg-white/20 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                <span className="text-xl">{tab === 'home' && '🏠'}{tab === 'search' && '🔍'}{tab === 'bell' && '🔔'}{tab === 'user' && '👤'}</span>
                <span className="text-xs">{tab === 'home' && '首页'}{tab === 'search' && '搜索'}{tab === 'bell' && '通知'}{tab === 'user' && '我的'}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => handleCopyPrompt('tabbar')} className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm hover:bg-purple-500/30 transition-colors cursor-pointer">
              {copied === 'prompt-tabbar' ? '✓ 已复制' : '📋 复制提示词'}
            </button>
            <button type="button" onClick={() => handleCopyCSS('tabbar')} className="flex-1 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm hover:bg-indigo-500/30 transition-colors cursor-pointer">
              {copied === 'css-tabbar' ? '✓ 已复制' : '💻 核心代码'}
            </button>
          </div>
        </div>

        {/* ===== 6. 列表项 ===== */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">📋</span> 列表项 List Item
          </h2>
          <div className="space-y-2">
            {[{ icon: '⚙️', title: '设置', desc: '通用、隐私、通知' }, { icon: '🔒', title: '安全', desc: '密码、指纹、人脸' }, { icon: '💰', title: '钱包', desc: '支付方式、账单' }].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="text-white font-medium">{item.title}</div>
                  <div className="text-slate-400 text-sm">{item.desc}</div>
                </div>
                <div className="text-slate-600 group-hover:text-slate-400 transition-colors">›</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => handleCopyPrompt('list')} className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm hover:bg-purple-500/30 transition-colors cursor-pointer">
              {copied === 'prompt-list' ? '✓ 已复制' : '📋 复制提示词'}
            </button>
            <button type="button" onClick={() => handleCopyCSS('list')} className="flex-1 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm hover:bg-indigo-500/30 transition-colors cursor-pointer">
              {copied === 'css-list' ? '✓ 已复制' : '💻 核心代码'}
            </button>
          </div>
        </div>

      </div>

      {/* Bonus: 开关 */}
      <div className="max-w-4xl mx-auto mt-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🔃</span> 开关 Toggle (Bonus)
          </h2>
          <div className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">🌙</div>
              <div className="text-white">深色模式</div>
            </div>
            <button type="button" onClick={() => setToggleOn(!toggleOn)} className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${toggleOn ? 'bg-green-500' : 'bg-slate-600'}`}>
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${toggleOn ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => handleCopyPrompt('toggle')} className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm hover:bg-purple-500/30 transition-colors cursor-pointer">
              {copied === 'prompt-toggle' ? '✓ 已复制' : '📋 复制提示词'}
            </button>
            <button type="button" onClick={() => handleCopyCSS('toggle')} className="flex-1 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm hover:bg-indigo-500/30 transition-colors cursor-pointer">
              {copied === 'css-toggle' ? '✓ 已复制' : '💻 核心代码'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <p className="text-slate-500 text-sm">
          iOS 玻璃态 Recipe · 7 个组件 · 每个组件支持提示词和核心代码复制
        </p>
      </div>
    </div>
  );
}
