import React, { useState, useEffect } from 'react';

// 引入views文件夹下的页面组件：封面、选关和关卡主界面
import Cover from './views/Cover.tsx';
import Level from './views/Level.tsx';
import Game from './views/Game.tsx';

// 引入本地图片素材
import appIcon from '../resources/UI/icon.png';

export default function Stage() {
  // 当前所在界面：cover=封面，level=选关，game=关卡主界面
  const [page, setPage] = useState<'cover' | 'level' | 'game'>('cover');

  // 记录选中的是第几关
  const [lvl, setLvl] = useState<number>(1);

  // 缩放比例，根据当前窗口高度自动算，保证1280高能全屏看全
  const [scale, setScale] = useState<number>(0.75);

  // 自动换上标签页图标
  useEffect(() => {
    let iconTag = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!iconTag) {
      iconTag = document.createElement('link');
      iconTag.rel = 'icon';
      document.head.appendChild(iconTag);
    }
    iconTag.href = appIcon;
  }, []);

  // 监听页面高度变化，动态按高度缩小显示，但内部保持720*1280原始分辨率
  useEffect(() => {
    const fitView = () => {
      // 上下留出40px缓冲边距，防止贴顶贴底
      const winH = window.innerHeight - 40;
      // 算出适合当前窗口的缩放比，不超出屏幕
      const s = Math.min(1, Math.max(0.35, winH / 1280));
      setScale(Number(s.toFixed(3)));
    };
    fitView();
    window.addEventListener('resize', fitView);
    return () => window.removeEventListener('resize', fitView);
  }, []);

  // 回到封面
  const toCover = () => {
    setPage('cover');
  };

  // 开始游戏，直接进关卡
  const toGame = () => {
    setPage('game');
  };

  // 打开选关列表
  const toLevel = () => {
    setPage('level');
  };

  // 选中某关后进入关卡
  const pickLvl = (n: number) => {
    setLvl(n);
    setPage('game');
  };

  return (
    // 最外层深色背景，居中展示游戏画面
    <div className="w-full h-screen bg-neutral-950 flex items-center justify-center overflow-hidden">
      {/* 限制外层占位大小，和缩放后的尺寸完全一致，不会出现多余滚动条 */}
      <div
        style={{
          width: `${720 * scale}px`,
          height: `${1280 * scale}px`,
        }}
        className="relative shrink-0"
      >
        {/* 内部严格保持 720 * 1280 真实手机分辨率，通过 scale 等比缩放适配视野 */}
        <div
          className="relative overflow-hidden shadow-2xl bg-black select-none font-sans shrink-0"
          style={{
            width: '720px',
            height: '1280px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* 1. 封面页 */}
          {page === 'cover' && <Cover toGame={toGame} toLevel={toLevel} />}

          {/* 2. 选关页 */}
          {page === 'level' && <Level toCover={toCover} pickLvl={pickLvl} lvl={lvl} />}

          {/* 3. 关卡主界面 */}
          {page === 'game' && <Game toCover={toCover} />}
        </div>
      </div>
    </div>
  );
}
