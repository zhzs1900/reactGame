import React from 'react';
import trophyIcon from '../../resources/UI/icons/icon_trophy.png';
import closeIcon from '../../resources/UI/icons/icon-3.png';
import nextIcon from '../../resources/UI/icons/icon-13.png';
import retryIcon from '../../resources/UI/icons/icon-6.png';
import homeIcon from '../../resources/UI/icons/icon-5.png';
import btnGold from '../../resources/UI/buttons/btn_gold.png';
import btnDark from '../../resources/UI/buttons/btn_dark.png';
import { playClick } from '../utils/sound.ts';

export type GameResult = 'victory' | 'failure';

interface Props {
  result: GameResult;
  lvl: number;
  onNext: () => void;
  onRetry: () => void;
  toCover: () => void;
}

export default function Result({ result, lvl, onNext, onRetry, toCover }: Props) {
  const victory = result === 'victory';

  return (
    <div className="absolute inset-0 z-[70] ui-overlay-result flex items-center justify-center p-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        className={`relative w-full max-w-[520px] ui-result-panel p-10 text-center ${victory ? 'ui-panel-victory' : 'ui-panel-failure'}`}
      >
        <div className={`mx-auto mb-7 w-36 h-36 flex items-center justify-center ui-medallion ${victory ? 'ui-medallion-victory' : 'ui-medallion-failure'}`}>
          <img src={victory ? trophyIcon : closeIcon} alt="" className="w-24 h-24 object-contain" />
        </div>
        <p className={`text-sm font-bold tracking-[0.4em] mb-3 ${victory ? 'text-amber-400/80' : 'text-slate-400'}`}>{victory ? 'VICTORY' : 'GAME OVER'}</p>
        <h2 id="result-title" className={`text-5xl font-black tracking-wider ${victory ? 'text-amber-200' : 'text-slate-100'}`}>{victory ? '游戏胜利' : '游戏失败'}</h2>
        <p className="mt-5 mb-9 text-xl text-slate-300">{victory ? (lvl === 10 ? '恭喜你，全部关卡已通关！' : `第${lvl}关挑战成功，继续冒险吧！`) : `第${lvl}关挑战失败，再试一次吧！`}</p>
        <div className="flex flex-col gap-4">
          {(!victory || lvl < 10) && (
            <button
              autoFocus
              onClick={() => {
                playClick();
                if (victory) onNext();
                else onRetry();
              }}
              style={{ backgroundImage: `url(${btnGold})`, backgroundSize: '100% 100%' }}
              className="w-full h-24 flex items-center justify-center gap-3 text-2xl font-bold cursor-pointer active:scale-95 transition-transform text-amber-950"
            >
              <img src={victory ? nextIcon : retryIcon} alt="" className="w-12 h-12 object-contain" />
              {victory ? '进入下一关' : '重新挑战'}
            </button>
          )}
          <button
            autoFocus={victory && lvl === 10}
            onClick={() => { playClick(); toCover(); }}
            style={{ backgroundImage: `url(${btnDark})`, backgroundSize: '100% 100%' }}
            className="w-full h-24 flex items-center justify-center gap-3 text-2xl font-bold cursor-pointer active:scale-95 transition-transform text-white"
          >
            <img src={homeIcon} alt="" className="w-12 h-12 object-contain" />
            返回封面
          </button>
        </div>
      </div>
    </div>
  );
}
