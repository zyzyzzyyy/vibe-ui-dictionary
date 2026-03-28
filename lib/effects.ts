export interface Effect {
  id: string;
  name: string;
  namePinyin: string;
  category: string;
  trigger: 'hover' | 'click' | 'auto' | 'scroll';
  prompt: string;
  code: string;
}

export const effects: Effect[] = [
  // 翻转类
  {
    id: 'flip-bounce',
    name: '弹性翻转',
    namePinyin: 'tanxingfanzhuan',
    category: '翻转',
    trigger: 'hover',
    prompt: '做一个 3D 翻转效果，鼠标覆盖时卡片翻转，有弹性回弹感，像弹簧一样有 overshoot。',
    code: '@keyframes flip-bounce {\n  0% { transform: perspective(400px) rotateY(0); }\n  50% { transform: perspective(400px) rotateY(180deg) scale(1.1); }\n  100% { transform: perspective(400px) rotateY(360deg); }\n}\n.flip-bounce:hover { animation: flip-bounce 1s ease-out; }'
  },
  {
    id: 'flip-shake',
    name: '摇晃翻转',
    namePinyin: 'yaohuangfanzhuan',
    category: '翻转',
    trigger: 'hover',
    prompt: '做一个犹豫感的翻转效果，鼠标覆盖时卡片来回摇晃几次才停下，像在思考。',
    code: '@keyframes flip-shake {\n  0%, 100% { transform: perspective(400px) rotateY(0); }\n  20% { transform: perspective(400px) rotateY(-15deg); }\n  40% { transform: perspective(400px) rotateY(15deg); }\n  60% { transform: perspective(400px) rotateY(-10deg); }\n  80% { transform: perspective(400px) rotateY(10deg); }\n}\n.flip-shake:hover { animation: flip-shake 0.8s ease-out; }'
  },
  {
    id: 'flip-swing',
    name: '摇摆翻转',
    namePinyin: 'yaobaifanzhuan',
    category: '翻转',
    trigger: 'hover',
    prompt: '做一个摇摆翻转效果，鼠标覆盖时卡片像钟摆一样左右摆动。',
    code: '@keyframes flip-swing {\n  0%, 100% { transform: rotateY(0deg); }\n  25% { transform: rotateY(-30deg); }\n  75% { transform: rotateY(30deg); }\n}\n.flip-swing:hover { animation: flip-swing 1.2s ease-in-out; }'
  },
  {
    id: 'press-feedback',
    name: '普通按压',
    namePinyin: 'putonganya',
    category: '按压反馈',
    trigger: 'click',
    prompt: '做一个干脆利落的按压反馈效果，点击时像按压气泡，上下压缩又弹回，无拖沓感。',
    code: '@keyframes press {\n  0%, 100% { transform: scaleY(1) scaleX(1); }\n  50% { transform: scaleY(0.85) scaleX(1.08); }\n}\n.press:active { animation: press 0.2s ease-out; }'
  },
  {
    id: 'press-depth',
    name: '有深度的按压',
    namePinyin: 'youshendudeanya',
    category: '按压反馈',
    trigger: 'click',
    prompt: '做一个有深度的按压效果，点击时元素明显下沉，底部阴影收缩，像按在弹簧上陷下去。',
    code: '@keyframes press-depth {\n  0%, 100% { transform: translateY(0); box-shadow: 0 8px 0 rgba(0,0,0,0.25); }\n  50% { transform: translateY(6px); box-shadow: 0 2px 0 rgba(0,0,0,0.25); }\n}\n.press-depth:active { animation: press-depth 0.3s ease-out; }'
  },
  {
    id: 'press-ink',
    name: '弹性按压',
    namePinyin: 'tanxinganya',
    category: '按压反馈',
    trigger: 'click',
    prompt: '做一个弹性按压效果，点击时快速缩小再超调放大，像橡皮筋被拉伸后弹回。',
    code: '@keyframes press-ink {\n  0%, 100% { transform: scale(1); }\n  30% { transform: scale(0.88); }\n  60% { transform: scale(1.08); }\n}\n.press-ink:active { animation: press-ink 0.4s ease-out; }'
  },
  {
    id: 'hover-lift',
    name: '上浮',
    namePinyin: 'shangfu',
    category: '悬停效果',
    trigger: 'hover',
    prompt: '做一个轻盈的上浮悬停效果，鼠标滑过时元素微微浮起，阴影加深。',
    code: '@keyframes lift {\n  0%, 100% { transform: translateY(0); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }\n  100% { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }\n}\n.hover-lift:hover { animation: lift 0.3s ease-out forwards; }'
  },
  {
    id: 'hover-glow',
    name: '发光',
    namePinyin: 'faguang',
    category: '悬停效果',
    trigger: 'hover',
    prompt: '做一个聚焦感的发光悬停效果，鼠标滑过时元素发出光晕，像被聚焦。',
    code: '@keyframes glow {\n  0%, 100% { box-shadow: 0 0 0 rgba(102, 126, 234, 0); }\n  100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n}\n.hover-glow:hover { animation: glow 0.4s ease-out forwards; }'
  },
  {
    id: 'hover-magnify',
    name: '微微放大',
    namePinyin: 'weiweifangda',
    category: '悬停效果',
    trigger: 'hover',
    prompt: '做一个精致的微微放大效果，鼠标滑过时元素轻轻放大 3%。',
    code: '@keyframes magnify {\n  0%, 100% { transform: scale(1); }\n  100% { transform: scale(1.03); }\n}\n.hover-magnify:hover { animation: magnify 0.3s ease-out forwards; }'
  },
  {
    id: 'spring-bounce',
    name: '弹跳入场',
    namePinyin: 'tantiaoruchang',
    category: '弹性',
    trigger: 'hover',
    prompt: '做一个活力感弹跳入场效果，鼠标覆盖时元素从上方弹跳进来，有阻尼感。',
    code: '@keyframes spring-bounce {\n  0% { transform: translateY(-60px); opacity: 0; }\n  50% { transform: translateY(10px); }\n  70% { transform: translateY(-5px); }\n  85% { transform: translateY(2px); }\n  100% { transform: translateY(0); opacity: 1; }\n}\n.spring-bounce:hover { animation: spring-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }'
  },
  {
    id: 'spring-wobble',
    name: '摇晃',
    namePinyin: 'yaohuang',
    category: '弹性',
    trigger: 'hover',
    prompt: '做一个滑稽的摇晃效果，鼠标覆盖时元素像果冻一样来回摇晃。',
    code: '@keyframes wobble {\n  0%, 100% { transform: rotate(0deg); }\n  15% { transform: rotate(-12deg); }\n  30% { transform: rotate(10deg); }\n  45% { transform: rotate(-8deg); }\n  60% { transform: rotate(6deg); }\n  75% { transform: rotate(-4deg); }\n  90% { transform: rotate(2deg); }\n}\n.spring-wobble:hover { animation: wobble 0.6s ease-out; }'
  },
  {
    id: 'spring-squash',
    name: '挤压拉伸',
    namePinyin: 'jiyalashen',
    category: '弹性',
    trigger: 'hover',
    prompt: '做一个橡皮感的挤压拉伸效果，鼠标覆盖时元素像橡皮一样先被压扁再弹回。',
    code: '@keyframes squash {\n  0%, 100% { transform: scaleY(1) scaleX(1); }\n  30% { transform: scaleY(0.8) scaleX(1.15); }\n  50% { transform: scaleY(1.15) scaleX(0.9); }\n  70% { transform: scaleY(0.95) scaleX(1.02); }\n}\n.spring-squash:hover { animation: squash 0.6s ease-out; }'
  },
  {
    id: 'pulse-glow',
    name: '光晕脉冲',
    namePinyin: 'guangyunmaichong',
    category: '脉冲/呼吸',
    trigger: 'auto',
    prompt: '做一个持续的光晕脉冲效果，元素持续发出心跳般的 box-shadow 光晕。',
    code: '@keyframes pulse-glow {\n  0%, 100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }\n  50% { box-shadow: 0 0 0 12px rgba(102, 126, 234, 0); }\n}\n.pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }'
  },
  {
    id: 'pulse-scale',
    name: '缩放脉冲',
    namePinyin: 'suofangmaichong',
    category: '脉冲/呼吸',
    trigger: 'auto',
    prompt: '做一个有节奏的缩放脉冲效果，元素持续轻轻放大缩小，像呼吸。',
    code: '@keyframes pulse-scale {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.05); }\n}\n.pulse-scale { animation: pulse-scale 1.5s ease-in-out infinite; }'
  },
  {
    id: 'breathe',
    name: '呼吸感',
    namePinyin: 'huxigan',
    category: '脉冲/呼吸',
    trigger: 'auto',
    prompt: '做一个缓慢从容的呼吸效果，元素 opacity 和 scale 缓慢变化，不急不躁。',
    code: '@keyframes breathe {\n  0%, 100% { opacity: 0.6; transform: scale(1); }\n  50% { opacity: 1; transform: scale(1.02); }\n}\n.breathe { animation: breathe 4s ease-in-out infinite; }'
  },
  {
    id: 'slide-in',
    name: '滑入',
    namePinyin: 'huaru',
    category: '滑入/滑出',
    trigger: 'hover',
    prompt: '做一个滑入效果，元素从左侧平滑滑入，有方向感。',
    code: '@keyframes slide-in {\n  from { transform: translateX(-100%); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}\n.slide-in:hover { animation: slide-in 0.4s ease-out forwards; }'
  },
  {
    id: 'slide-out',
    name: '滑出',
    namePinyin: 'huachu',
    category: '滑入/滑出',
    trigger: 'hover',
    prompt: '做一个滑出效果，元素向右侧平滑滑出并消失。',
    code: '@keyframes slide-out {\n  from { transform: translateX(0); opacity: 1; }\n  to { transform: translateX(100%); opacity: 0; }\n}\n.slide-out:hover { animation: slide-out 0.3s ease-in forwards; }'
  },
  {
    id: 'float-in',
    name: '飘入',
    namePinyin: 'piaoru',
    category: '滑入/滑出',
    trigger: 'hover',
    prompt: '做一个飘入效果，元素像气球一样飘进来，带弧度感的贝塞尔曲线。',
    code: '@keyframes float-in {\n  from { transform: translate(-50px, -30px); opacity: 0; }\n  to { transform: translate(0, 0); opacity: 1; }\n}\n.float-in:hover { animation: float-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }'
  },
  {
    id: 'drop-in',
    name: '掉落',
    namePinyin: 'diaoluo',
    category: '滑入/滑出',
    trigger: 'hover',
    prompt: '做一个掉落效果，元素像从高处掉落一样，有重力感。',
    code: '@keyframes drop-in {\n  from { transform: translateY(-50px); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}\n.drop-in:hover { animation: drop-in 0.4s ease-out forwards; }'
  },
  {
    id: 'slide-away',
    name: '溜走',
    namePinyin: 'liuzou',
    category: '滑入/滑出',
    trigger: 'hover',
    prompt: '做一个溜走效果，元素快速滑出有惯性感，像偷偷溜走一样。',
    code: '@keyframes slide-away {\n  from { transform: translateX(0); opacity: 1; }\n  to { transform: translateX(50px); opacity: 0; }\n}\n.slide-away:hover { animation: slide-away 0.3s ease-in forwards; }'
  },
  {
    id: 'push-in',
    name: '推进',
    namePinyin: 'tuijin',
    category: '滑入/滑出',
    trigger: 'hover',
    prompt: '做一个推进效果，元素像被推入门内一样，从后方推进来。',
    code: '@keyframes push-in {\n  from { transform: translateX(-30px); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}\n.push-in:hover { animation: push-in 0.3s ease-out forwards; }'
  },
  {
    id: 'drag-snap',
    name: '吸附',
    namePinyin: 'xifu',
    category: '拖拽交互',
    trigger: 'hover',
    prompt: '做一个脉冲吸附效果，点击元素后它弹入目标位置，带弹性曲线确认感，像磁铁吸合。',
    code: '@keyframes snap {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }\n}\n.drag-snap:hover { animation: snap 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }'
  },
  {
    id: 'drag-throw',
    name: '甩开',
    namePinyin: 'shuaikai',
    category: '拖拽交互',
    trigger: 'auto',
    prompt: '做一个弹跳飞入效果，元素从上方弹跳进来，有阻尼感像弹簧球落地后弹起。',
    code: '@keyframes bounce-in {\n  0% { transform: translateY(-80px) rotate(0deg); opacity: 0; }\n  30% { transform: translateY(10px) rotate(180deg); opacity: 1; }\n  50% { transform: translateY(-20px) rotate(360deg); }\n  70% { transform: translateY(5px) rotate(540deg); }\n  85% { transform: translateY(-5px) rotate(640deg); }\n  100% { transform: translateY(0) rotate(720deg); }\n}\n.drag-throw { animation: bounce-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }'
  },
  {
    id: 'drag-tilt',
    name: '倾斜',
    namePinyin: 'qingxie',
    category: '拖拽交互',
    trigger: 'hover',
    prompt: '做一个 3D 倾斜效果，鼠标移动时元素根据位置微微倾斜，有倾斜跟随的立体感。',
    code: '.tilt-container { perspective: 800px; }\n.tilt-element { transition: transform 0.3s ease-out; transform-style: preserve-3d; }\n.tilt-container:hover .tilt-element { transform: rotateX(5deg) rotateY(5deg) scale(1.05); }'
  },
  {
    id: 'scroll-parallax',
    name: '视差滚动',
    namePinyin: 'shichagundong',
    category: '滚动类',
    trigger: 'scroll',
    prompt: '做一个视差滚动效果，前景和背景以不同速度滚动，产生深度感。',
    code: '.parallax-container { perspective: 1px; overflow-y: auto; }\n.layer-back { transform: translateZ(-1px) scale(2); }\n.layer-front { transform: translateZ(0); }'
  },
  {
    id: 'scroll-sticky',
    name: '粘性定位',
    namePinyin: 'nianxingdingwei',
    category: '滚动类',
    trigger: 'scroll',
    prompt: '做一个粘性定位效果，元素在滚动到特定位置时固定在视口，像标签页粘在顶部。',
    code: '.sticky-header { position: sticky; top: 0; background: white; z-index: 10; }'
  },
  {
    id: 'scroll-snap',
    name: '吸附滚动',
    namePinyin: 'xifugundong',
    category: '滚动类',
    trigger: 'scroll',
    prompt: '做一个吸附滚动效果，滚动停止时自动对齐到最近的子元素。',
    code: '.container { overflow-x: auto; scroll-snap-type: x mandatory; }\n.item { scroll-snap-align: start; }'
  },
  {
    id: 'loading-spin',
    name: '旋转加载',
    namePinyin: 'xuanzhuanjiazai',
    category: '加载/状态',
    trigger: 'auto',
    prompt: '做一个旋转加载动画，一个圆环持续旋转，像 Loading 指示器。',
    code: '@keyframes spin { to { transform: rotate(360deg); } }\n.spinner { animation: spin 0.8s linear infinite; }'
  },
  {
    id: 'loading-dots',
    name: '脉冲点',
    namePinyin: 'maichongdian',
    category: '加载/状态',
    trigger: 'auto',
    prompt: '做一个脉冲点加载动画，三个点依次跳动上下，像加载中的提示。',
    code: '@keyframes dot-bounce {\n  0%, 80%, 100% { transform: translateY(0); }\n  40% { transform: translateY(-10px); }\n}\n.dot { animation: dot-bounce 1.4s infinite; }\n.dot:nth-child(2) { animation-delay: 0.2s; }\n.dot:nth-child(3) { animation-delay: 0.4s; }'
  },
  {
    id: 'skeleton',
    name: '骨架屏',
    namePinyin: 'gujiaping',
    category: '加载/状态',
    trigger: 'auto',
    prompt: '做一个骨架屏加载效果，灰色块闪烁表示内容正在加载。',
    code: '@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n.skeleton {\n  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}'
  },
  {
    id: 'check-draw',
    name: '完成打勾',
    namePinyin: 'wanchengdagou',
    category: '加载/状态',
    trigger: 'click',
    prompt: '做一个打勾完成动画，圆形和勾子依次绘制出来。',
    code: '@keyframes draw { to { stroke-dashoffset: 0; } }\n.check-circle { stroke-dasharray: 100; animation: draw 0.6s forwards; }'
  },
  {
    id: 'success-flash',
    name: '成功反馈',
    namePinyin: 'chenggongfankui',
    category: '加载/状态',
    trigger: 'click',
    prompt: '做一个成功反馈动画，绿色圆圈放大出现并扩散光晕。',
    code: '@keyframes flash { 0% { transform: scale(0); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }\n.success { animation: flash 0.6s ease-out; }'
  },
  {
    id: 'error-shake',
    name: '错误抖动',
    namePinyin: 'cuowudoudong',
    category: '加载/状态',
    trigger: 'click',
    prompt: '做一个错误抖动动画，红色方块左右抖动。',
    code: '@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  20%, 60% { transform: translateX(-5px); }\n  40%, 80% { transform: translateX(5px); }\n}\n.error { animation: shake 0.5s ease-out; }'
  },
  {
    id: 'morph-blob',
    name: '液态融合',
    namePinyin: 'yetaironghe',
    category: '高级动效',
    trigger: 'auto',
    prompt: '做一个液态融合动画，两个圆形不断变形、融合、分离，像液态金属流动的感觉。使用 SVG goo filter 实现。',
    code: '.morph-container { filter: url(#goo); }\n.blob { animation: blob-move 2s ease-in-out infinite; }\n@keyframes blob-move {\n  0%, 100% { transform: translateX(0) scale(1); }\n  50% { transform: translateX(26px) scale(1.2, 0.8); }\n}'
  },
  {
    id: 'ripple',
    name: '涟漪扩散',
    namePinyin: 'lianyikuosan',
    category: '高级动效',
    trigger: 'click',
    prompt: '做一个涟漪扩散动画，点击中心后多层涟漪向四周扩散，像水面波纹。',
    code: '@keyframes ripple {\n  0% { transform: scale(1); opacity: 0.8; }\n  100% { transform: scale(3); opacity: 0; }\n}\n.ripple { animation: ripple 1s ease-out forwards; }'
  },
  {
    id: 'jelly',
    name: '果冻抖动',
    namePinyin: 'guodongdoudong',
    category: '高级动效',
    trigger: 'auto',
    prompt: '做一个果冻抖动动画，一个圆形像软糖一样Q弹抖动。',
    code: '@keyframes jelly {\n  0%, 100% { transform: scale(1, 1) rotate(0deg); border-radius: 50%; }\n  15% { transform: scale(0.85, 1.15) rotate(-2deg); }\n  30% { transform: scale(1.1, 0.9) rotate(1deg); }\n  45% { transform: scale(0.95, 1.05) rotate(-1deg); }\n  60% { transform: scale(1.05, 0.95) rotate(2deg); }\n}\n.jelly { animation: jelly 1.2s ease-in-out infinite; }'
  },
  {
    id: 'star',
    name: '星光闪烁',
    namePinyin: 'xingguangshanshuo',
    category: '高级动效',
    trigger: 'auto',
    prompt: '做一个星光闪烁动画，多个小方块像星星一样闪烁，此起彼伏。',
    code: '@keyframes twinkle {\n  0%, 100% { opacity: 0.3; transform: scale(0.8); }\n  50% { opacity: 1; transform: scale(1.2); }\n}\n.star { animation: twinkle 1.5s ease-in-out infinite; }\n.star:nth-child(2) { animation-delay: 0.2s; }\n.star:nth-child(3) { animation-delay: 0.4s; }'
  },
  {
    id: 'gloss',
    name: '光泽滑过',
    namePinyin: 'guangzehuaguo',
    category: '高级动效',
    trigger: 'auto',
    prompt: '做一个光泽滑过动画，一束光从元素表面扫过，有高级感。',
    code: '@keyframes gloss {\n  0% { left: -100%; }\n  50%, 100% { left: 150%; }\n}\n.gloss::after {\n  content: "";\n  position: absolute;\n  top: 0; left: -100%;\n  width: 60%; height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);\n  animation: gloss 2s ease-in-out infinite;\n}'
  },
  {
    id: 'glass',
    name: '毛玻璃弹出',
    namePinyin: 'maobolitanchu',
    category: '高级动效',
    trigger: 'auto',
    prompt: '做一个毛玻璃弹出动画，一个元素有磨砂玻璃的质感，持续缓慢放大缩小。',
    code: '@keyframes glass-bounce {\n  0%, 100% { transform: scale(1); opacity: 0.8; }\n  50% { transform: scale(1.1); opacity: 1; }\n}\n.glass {\n  background: rgba(255, 255, 255, 0.15);\n  backdrop-filter: blur(10px);\n  animation: glass-bounce 2s ease-in-out infinite;\n}'
  },
  {
    id: 'svg-circle',
    name: 'SVG 描边',
    namePinyin: 'SVGmiaobian',
    category: '路径动画',
    trigger: 'hover',
    prompt: '做一个 SVG 路径描边动画效果，鼠标覆盖时路径像被画出来一样。',
    code: '@keyframes draw { to { stroke-dashoffset: 0; } }\n.path { stroke-dasharray: 100; stroke-dashoffset: 100; }\n.path:hover { stroke-dashoffset: 0; transition: stroke-dashoffset 1s ease-out; }'
  },
  {
    id: 'svg-heart',
    name: '爱心路径',
    namePinyin: 'aixinlujing',
    category: '路径动画',
    trigger: 'hover',
    prompt: '做一个爱心 SVG 描边动画效果，鼠标覆盖时心形路径被一笔一笔记出来。',
    code: '.heart { fill: none; stroke: #f5576c; stroke-dasharray: 100; stroke-dashoffset: 100; }\n.heart:hover { stroke-dashoffset: 0; transition: stroke-dashoffset 1s ease-out; }'
  },
  {
    id: 'svg-star',
    name: '星星路径',
    namePinyin: 'xingxinglujing',
    category: '路径动画',
    trigger: 'hover',
    prompt: '做一个星星 SVG 描边动画效果，鼠标覆盖时五角星路径被一笔画出来。',
    code: '.star { fill: none; stroke: #667eea; stroke-dasharray: 100; stroke-dashoffset: 100; }\n.star:hover { stroke-dashoffset: 0; transition: stroke-dashoffset 1s ease-out; }'
  },
  {
    id: 'ui-soft-shadow',
    name: '柔和投影',
    namePinyin: 'rouhetouying',
    category: 'UI 设计',
    trigger: 'hover',
    prompt: '做一个柔和投影效果，阴影轻柔模糊，像元素漂浮在页面上。',
    code: 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);'
  },
  {
    id: 'ui-neon-glow',
    name: '霓虹发光',
    namePinyin: 'nihongfaguang',
    category: 'UI 设计',
    trigger: 'hover',
    prompt: '做一个霓虹发光效果，多层 box-shadow 从内到外扩散，像赛博朋克霓虹灯。',
    code: 'box-shadow: 0 0 5px #667eea, 0 0 20px #667eea, 0 0 40px #667eea;'
  },
  {
    id: 'ui-glass',
    name: '玻璃态',
    namePinyin: 'bolitai',
    category: 'UI 设计',
    trigger: 'hover',
    prompt: '做一个玻璃拟态效果，半透明背景加毛玻璃模糊，像磨砂玻璃。',
    code: 'background: rgba(255, 255, 255, 0.15);\nbackdrop-filter: blur(12px);\nborder: 1px solid rgba(255, 255, 255, 0.3);'
  },
  {
    id: 'ui-gradient-border',
    name: '渐变边框',
    namePinyin: 'jianbianbiankuang',
    category: 'UI 设计',
    trigger: 'hover',
    prompt: '做一个渐变边框效果，边框是彩虹渐变色环绕元素。',
    code: '.gradient-border { position: relative; background: white; }\n.gradient-border::before {\n  content: ""; position: absolute; inset: -2px;\n  border-radius: inherit;\n  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c);\n  z-index: -1;\n}'
  },
  {
    id: 'ui-text-gradient',
    name: '文字渐变',
    namePinyin: 'wenzijianbian',
    category: 'UI 设计',
    trigger: 'hover',
    prompt: '做一个文字渐变填充效果，文字颜色是渐变色。',
    code: 'background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);\n-webkit-background-clip: text;\nbackground-clip: text;\n-webkit-text-fill-color: transparent;'
  },
  {
    id: 'ui-neumorphism-raised',
    name: '新拟态凸起',
    namePinyin: 'xinnitaituqi',
    category: 'UI 设计',
    trigger: 'hover',
    prompt: '做一个新拟态凸起效果，柔和的浅灰背景配合双层阴影，模拟真实质感。',
    code: 'background: #e0e5ec;\nbox-shadow: 8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.8);'
  },
  {
    id: 'ui-neumorphism-inset',
    name: '新拟态凹陷',
    namePinyin: 'xinnitaiaoxian',
    category: 'UI 设计',
    trigger: 'hover',
    prompt: '做一个新拟态凹陷效果，元素像被按压下去一样，内凹的质感。',
    code: 'background: #e0e5ec;\nbox-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.6), inset -4px -4px 8px rgba(255, 255, 255, 0.8);'
  },
  {
    id: 'ui-pulse-border',
    name: '脉冲边框',
    namePinyin: 'maichongbiankuang',
    category: 'UI 设计',
    trigger: 'auto',
    prompt: '做一个脉冲边框效果，边框颜色在深浅之间呼吸闪烁。',
    code: '@keyframes pulse-border {\n  0%, 100% { border-color: rgba(102, 126, 234, 0.3); }\n  50% { border-color: rgba(102, 126, 234, 1); }\n}\n.pulse-border { animation: pulse-border 2s ease-in-out infinite; }'
  },
  {
    id: 'ui-dark-mode-toggle',
    name: '深色模式切换',
    namePinyin: 'shenseimoshiqiehuan',
    category: 'UI 设计',
    trigger: 'click',
    prompt: '做一个精致的深色模式切换按钮，点击时太阳图标 morph 成月亮图标，轨道背景色平滑过渡，滑块带阴影和高光效果。',
    code: `/* CSS 部分 */
:root { --track-bg: #fbbf24; --thumb-bg: white; }
.dark { --track-bg: #1e293b; --thumb-bg: #e2e8f0; color-scheme: dark; }

.dark-mode-track {
  position: relative;
  width: 64px; height: 32px;
  border-radius: 16px;
  background: var(--track-bg);
  transition: background 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 2px;
}
.dark-mode-thumb {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--thumb-bg);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2), 0 0 8px rgba(255,200,0,0.4);
  transition: left 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s ease;
  position: relative;
}
.dark-mode-track::before { content: '☀️'; position: absolute; left: 36px; font-size: 14px; }
.dark-mode-track.dark { background: var(--track-bg); }
.dark-mode-track.dark .dark-mode-thumb { left: 34px; box-shadow: 0 1px 4px rgba(0,0,0,0.3), 0 0 8px rgba(200,220,255,0.4); }
.dark-mode-track.dark::before { content: '🌙'; }

/* JS 部分 */
document.querySelector('.dark-mode-track')?.addEventListener('click', function() {
  this.classList.toggle('dark');
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', this.classList.contains('dark') ? 'dark' : 'light');
});`
  },
];

export const categories = [
  '滑入/滑出',
  '拖拽交互',
  '滚动类',
  '加载/状态',
  '高级动效',
  '翻转',
  '按压反馈',
  '悬停效果',
  '弹性',
  '脉冲/呼吸',
  '路径动画',
  'UI 设计',
];
