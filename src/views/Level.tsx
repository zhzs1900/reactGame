import React from 'react';
import { ArrowLeft } from 'lucide-react';

// 引入封面背景与图标素材
import bgCover from '../../resources/UI/coverpage.jpg';
import appIcon from '../../resources/UI/icon.png';

// 选关界面的参数：返回封面、选关进入和当前选中的关卡
interface Props {
  toCover: () => void;
  pickLvl: (n: number) => void;
  lvl: number;
}

export default function Level({ toCover, pickLvl, lvl }: Props) {
  // 预置10个关卡数字供玩家选择
  const lvlList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div
      className="w-full h-full relative flex flex-col items-center justify-between p-8"
      style={{
        backgroundImage: `url(${bgCover})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      {/* 半透明黑色遮罩，让关卡文字更清晰 */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs pointer-events-none" />

      {/* 顶部标题栏与返回封面按钮 */}
      <div className="relative z-10 w-full flex items-center justify-between pb-6 border-b border-white/15">
        <button
          onClick={toCover}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-base font-medium transition-colors border border-white/20 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回封面</span>
        </button>

        <div className="flex items-center gap-3">
          <img src={appIcon} alt="游戏图标" className="w-11 h-11 rounded-2xl shadow-md" />
          <h2 className="text-2xl font-bold text-white tracking-wider">选择关卡</h2>
        </div>

        {/* 占位平衡顶部宽度 */}
        <div className="w-24" />
      </div>

      {/* 关卡卡片网格 */}
      <div className="relative z-10 w-full grid grid-cols-2 gap-5 my-auto py-6 max-w-[560px]">
        {lvlList.map((item) => (
          <button
            key={item}
            onClick={() => pickLvl(item)}
            className={`flex flex-col items-center justify-center py-7 px-4 rounded-2xl border-2 transition-all cursor-pointer shadow-lg ${
              lvl === item
                ? 'bg-amber-500 text-amber-950 font-black border-amber-200 shadow-amber-500/30 scale-102'
                : 'bg-slate-900/85 text-white border-white/15 hover:border-amber-400 hover:bg-slate-800'
            }`}
          >
            <span className="text-xs tracking-widest opacity-80 mb-1 font-mono">STAGE</span>
            <span className="text-3xl font-black">{item}</span>
          </button>
        ))}
      </div>

      {/* 底部引导文案 */}
      <div className="relative z-10 text-white/60 text-sm font-medium">
        点击对应关卡即可进入
      </div>
    </div>
  );
}
