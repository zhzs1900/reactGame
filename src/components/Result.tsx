import React from 'react';
import { Trophy } from 'lucide-react';
import closeIcon from '../../resources/UI/icons/icon-3.png';
import nextIcon from '../../resources/UI/icons/icon-13.png';
import retryIcon from '../../resources/UI/icons/icon-6.png';
import homeIcon from '../../resources/UI/icons/icon-5.png';
import btnGold from '../../resources/UI/btn_gold.png';
import btnDark from '../../resources/UI/btn_dark.png';
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
    <div className="absolute inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        className={`relative w-full max-w-[520px] rounded-[32px] border-2 p-10 text-center shadow-2xl ${victory ? 'bg-gradient-to-b from-amber-950 to-slate-950 border-amber-400' : 'bg-gradient-to-b from-slate-800 to-slate-950 border-slate-500'}`}
      >
        <div className={`mx-auto mb-7 w-36 h-36 rounded-full flex items-center justify-center border ${victory ? 'bg-amber-400/15 border-amber-400/40 shadow-[0_0_50px_rgba(251,191,36,0.2)]' : 'bg-red-400/10 border-red-400/30'}`}>
          {victory ? <Trophy className="w-24 h-24 text-amber-300" strokeWidth={1.5} /> : <img src={closeIcon} alt="" className="w-24 h-24 object-contain" />}
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
