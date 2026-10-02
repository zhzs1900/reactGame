import React from 'react';
import { ArrowLeft } from 'lucide-react';

// 引入游戏主界面背景素材
import bgGame from '../../resources/UI/background.jpg';

// 接收返回封面的函数
interface Props {
  toCover: () => void;
}

export default function Game({ toCover }: Props) {
  return (
    // 关卡主界面：按要求仅保留背景图和返回封面按钮
    <div
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(${bgGame})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 返回封面按钮 */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={toCover}
          aria-label="返回封面按钮"
          title="返回封面按钮"
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-900/85 hover:bg-amber-800 text-amber-100 font-bold text-base shadow-xl shadow-amber-950/40 border border-amber-700/70 active:scale-95 transition-all cursor-pointer backdrop-blur-xs"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回封面</span>
        </button>
      </div>
    </div>
  );
}
