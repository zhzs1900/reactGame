import React from 'react';
import { Play, Grid } from 'lucide-react';

// 引入封面背景素材
import bgCover from '../../resources/UI/coverpage.jpg';

// 封面传参：分别对应点击开始和点击选关的回调
interface Props {
  toGame: () => void;
  toLevel: () => void;
}

export default function Cover({ toGame, toLevel }: Props) {
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
      {/* 顶部撑开空间，让主视觉露出来 */}
      <div className="flex-1" />

      {/* 按钮操作区：开始游戏与选关按钮 */}
      <div className="flex flex-col gap-6 items-center justify-center w-full max-w-[420px] px-8 z-10 mb-14">
        {/* 开始游戏按钮 */}
        <button
          onClick={toGame}
          aria-label="开始按钮"
          title="开始按钮"
          className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:brightness-110 active:scale-95 text-amber-950 font-black text-2xl shadow-2xl shadow-black/60 border-2 border-amber-200/80 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Play className="w-7 h-7 fill-amber-950" />
          <span>开始游戏</span>
        </button>

        {/* 选关按钮 */}
        <button
          onClick={toLevel}
          aria-label="选关按钮"
          title="选关按钮"
          className="w-full py-5 px-8 rounded-2xl bg-slate-950/80 hover:bg-slate-900/90 active:scale-95 text-white font-bold text-2xl shadow-2xl shadow-black/70 backdrop-blur-md border-2 border-white/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Grid className="w-7 h-7 text-amber-300" />
          <span>关卡选择</span>
        </button>
      </div>

      {/* 游戏健康忠告：放在封面最下方，最后一句距离最下边缘半个字高度(0.5em) */}
      <div className="w-full z-10 pb-[0.5em] px-4 text-center select-none">
        {/* 中间游戏健康忠告标题 */}
        <h3 className="text-white font-bold text-[18px] mb-1.5 tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          游戏健康忠告
        </h3>
        {/* 下边每行两句，一共四行 */}
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
