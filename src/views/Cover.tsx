import React, { useEffect } from 'react';
import { Play } from 'lucide-react';

// 引入根目录自定义配置文件，避免放进public导致缓存不生效
import customConfig from '../../customconfig.json';

// 引入封面背景与按钮空底图
import bgCover from '../../resources/UI/coverpage.jpg';
import btnGold from '../../resources/UI/btn_gold.png';

// 引入音效管理
import { playClick } from '../utils/sound.ts';

interface Props {
  toGame: () => void;
}

export default function Cover({ toGame }: Props) {
  // 同步更新网页标签页标题
  useEffect(() => {
    if (customConfig && customConfig.title) {
      document.title = customConfig.title;
    }
  }, []);

  // 点击开始按钮
  const onStart = () => {
    playClick();
    toGame();
  };

  return (
    <div
      className="w-full h-full relative flex flex-col justify-between items-center"
      style={{
        backgroundImage: `url(${bgCover})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 顶部大游戏标题：读取customconfig.json的第一项title，修改配置即时变化 */}
      <div className="w-full pt-20 px-6 flex justify-center z-10 select-none">
        <h1
          className="text-5xl sm:text-6xl font-black tracking-widest text-center text-amber-300 drop-shadow-[0_5px_8px_rgba(0,0,0,0.95)]"
          style={{
            textShadow: '0 0 20px rgba(245,158,11,0.6), 0 4px 6px rgba(0,0,0,0.9)',
          }}
        >
          {customConfig.title}
        </h1>
      </div>

      {/* 按钮操作区：使用图片空底图，字和图标用代码写 */}
      <div className="flex flex-col gap-6 items-center justify-center w-full max-w-[420px] px-8 z-10 mb-14">
        {/* 开始游戏按钮 */}
        <button
          onClick={onStart}
          aria-label="开始按钮"
          title="开始按钮"
          style={{ backgroundImage: `url(${btnGold})`, backgroundSize: '100% 100%' }}
          className="w-full h-[100px] flex items-center justify-center gap-3 text-amber-950 font-black text-2xl active:scale-95 transition-transform cursor-pointer drop-shadow-xl"
        >
          <Play className="w-7 h-7 fill-amber-950" />
          <span>开始游戏</span>
        </button>

      </div>

      {/* 游戏健康忠告：代码排版渲染，严格放在最下方且最后一句距离底部半个字高 */}
      <div className="w-full z-10 pb-[0.5em] px-4 text-center select-none">
        <h3 className="text-white font-bold text-[18px] mb-1.5 tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          游戏健康忠告
        </h3>
        <div className="text-white/95 text-[15px] leading-[1.65] font-medium tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] space-y-0.5">
          <p>抵制不良游戏，拒绝盗版游戏。</p>
          <p>注意自我保护，谨防上当受骗。</p>
          <p>适度游戏益脑，沉迷游戏伤身。</p>
          <p>合理安排时间，享受健康生活。</p>
        </div>
      </div>
    </div>
  );
}
