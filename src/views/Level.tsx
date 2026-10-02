import React from 'react';
import backIcon from '../../resources/UI/icons/icon-12.png';

// 引入封面背景、图标以及空白按钮与面板底图
import bgCover from '../../resources/UI/coverpage.jpg';
import appIcon from '../../resources/UI/icon.png';
import btnBack from '../../resources/UI/buttons/btn_back.png';
import cardStage from '../../resources/UI/buttons/card_stage.png';
import cardStageOn from '../../resources/UI/buttons/card_stage_on.png';
import panelLevels from '../../resources/UI/panels/panel_levels.png';
import panelTip from '../../resources/UI/panels/panel_tip.png';

// 引入音效管理
import { playClick } from '../utils/sound.ts';

interface Props {
  toMenu: () => void;
  pickLvl: (n: number) => void;
  lvl: number;
}

export default function Level({ toMenu, pickLvl, lvl }: Props) {
  // 10个关卡数字
  const lvlList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // 点击返回调试菜单
  const onBack = () => {
    playClick();
    toMenu();
  };

  // 点击关卡
  const onPick = (n: number) => {
    playClick();
    pickLvl(n);
  };

  return (
    <div
      className="w-full h-full relative flex flex-col items-center justify-between p-6 select-none"
      style={{
        backgroundImage: `url(${bgCover})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      {/* 顶部标题栏：返回按钮底图、游戏图标与代码标题文字 */}
      <div className="relative z-10 w-full flex items-center justify-between pb-4">
        {/* 返回调试菜单按钮 */}
        <button
          onClick={onBack}
          aria-label="返回调试菜单按钮"
          title="返回调试菜单按钮"
          style={{ backgroundImage: `url(${btnBack})`, backgroundSize: '100% 100%' }}
          className="w-[160px] h-[60px] flex items-center justify-center gap-2 text-amber-100 font-bold text-sm active:scale-95 transition-transform cursor-pointer"
        >
          <img src={backIcon} alt="" className="w-7 h-7 object-contain" />
          <span>返回调试菜单</span>
        </button>

        {/* 中间图标与标题文字 */}
        <div className="flex items-center gap-3">
          <img src={appIcon} alt="游戏图标" className="w-10 h-10 " />
          <h2 className="text-2xl font-bold text-white tracking-wider drop-shadow-md">选择关卡</h2>
        </div>

        {/* 占位平衡顶部宽度 */}
        <div className="w-[160px]" />
      </div>

      {/* 选关大面板：使用图片作为底图，里面放10个关卡卡片 */}
      <div
        className="relative z-10 w-full max-w-[620px] flex items-center justify-center p-8 my-auto"
        style={{
          backgroundImage: `url(${panelLevels})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* 关卡按钮网格：使用空卡片底图，关卡数字和文字代码生成 */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[520px]">
          {lvlList.map((item) => (
            <button
              key={item}
              onClick={() => onPick(item)}
              aria-label={`第${item}关`}
              title={`第${item}关`}
              style={{
                backgroundImage: `url(${lvl === item ? cardStageOn : cardStage})`,
                backgroundSize: '100% 100%',
              }}
              className="w-full h-[140px] flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              <span className={`text-xs tracking-widest font-mono font-bold ${lvl === item ? 'text-amber-900/80' : 'text-slate-400'}`}>
                STAGE
              </span>
              <span className={`text-3xl font-black ${lvl === item ? 'text-amber-950' : 'text-white'}`}>
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 底部提示：使用提示胶囊底板，文字写在上面 */}
      <div
        style={{ backgroundImage: `url(${panelTip})`, backgroundSize: '100% 100%' }}
        className="relative z-10 w-[340px] h-[44px] flex items-center justify-center text-slate-300 text-sm font-medium mb-2"
      >
        点击对应关卡即可进入
      </div>
    </div>
  );
}
