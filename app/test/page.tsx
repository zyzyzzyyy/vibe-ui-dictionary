'use client';

import { useState } from 'react';

export default function TestPage() {
  const [text, setText] = useState('测试文本');
  
  const copyTest = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('复制成功！');
    } catch (e) {
      alert('复制失败：' + e);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>复制测试</h1>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', width: '300px', marginRight: '10px' }}
      />
      <button 
        onClick={copyTest}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        复制到剪贴板
      </button>
      <p style={{ marginTop: '20px', color: '#666' }}>
        点击按钮测试复制功能。如果复制成功，会弹出"复制成功"的提示。
      </p>
    </div>
  );
}
