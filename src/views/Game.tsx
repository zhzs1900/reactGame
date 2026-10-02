import React from 'react';
import { ArrowLeft } from 'lucide-react';

// 引入游戏主界面背景素材与返回按钮空底图
import bgGame from '../../resources/UI/background.jpg';
import btnBack from '../../resources/UI/btn_back.png';

// 引入音效管理
import { playClick } from '../utils/sound.ts';

interface Props {
  toCover: () => void;
}

export default function Game({ toCover }: Props) {
  // 点击返回封面
  const onBack = () => {
    playClick();
    toCover();
  };

  return (
    // 关卡主界面：仅保留背景和返回封面按钮
    <div
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(${bgGame})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 返回封面按钮：使用按钮底图，代码写字与箭头 */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={onBack}
          aria-label="返回封面按钮"
          title="返回封面按钮"
          style={{ backgroundImage: `url(${btnBack})`, backgroundSize: '100% 100%' }}
          className="w-[180px] h-[68px] flex items-center justify-center gap-2 text-amber-100 font-bold text-base active:scale-95 transition-transform cursor-pointer drop-shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回封面</span>
        </button>
      </div>
    </div>
  );
}
