import React, { useState } from 'react';
import gearIcon from '../../resources/UI/icons/icon-2.png';
import closeIcon from '../../resources/UI/icons/icon-3.png';
import homeIcon from '../../resources/UI/icons/icon-5.png';
import musicOnIcon from '../../resources/UI/icons/icon-7.png';
import musicOffIcon from '../../resources/UI/icons/icon-8.png';
import effectsOnIcon from '../../resources/UI/icons/icon-9.png';
import effectsOffIcon from '../../resources/UI/icons/icon-10.png';
import { playClick, setMusicEnabled, setEffectsEnabled } from '../utils/sound.ts';

interface Props {
  inGame: boolean;
  toCover: () => void;
}

export default function Settings({ inGame, toCover }: Props) {
  const [open, setOpen] = useState(false);
  const [music, setMusic] = useState(true);
  const [effects, setEffects] = useState(true);

  const close = () => {
    playClick();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => {
          playClick();
          setOpen(true);
        }}
        aria-label="打开设置"
        title="打开设置"
        className="absolute top-6 right-6 z-40 w-16 h-16 cursor-pointer active:scale-95 transition-transform drop-shadow-lg"
      >
        <img src={gearIcon} alt="" className="w-full h-full object-contain" />
      </button>
      {open && (
        <div className="absolute inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-8" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            className="relative w-full max-w-[520px] rounded-[32px] bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-amber-400/60 shadow-2xl p-8 text-white"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => { if (event.key === 'Escape') close(); }}
          >
            <div className="flex items-center justify-center pb-6 mb-6 border-b border-amber-400/20">
              <h2 id="settings-title" className="flex items-center gap-3 text-3xl font-bold text-amber-200">
                <img src={gearIcon} alt="" className="w-12 h-12 object-contain" />
                {inGame ? '游戏菜单' : '游戏设置'}
              </h2>
              <button autoFocus onClick={close} aria-label="关闭设置" title="关闭设置" className="absolute -top-4 -right-4 w-14 h-14 cursor-pointer active:scale-95 transition-transform drop-shadow-lg">
                <img src={closeIcon} alt="" className="w-full h-full object-contain" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <button
                role="switch"
                aria-label="音乐"
                aria-checked={music}
                onClick={() => {
                  const enabled = !music;
                  setMusicEnabled(enabled);
                  setMusic(enabled);
                  playClick();
                }}
                className={`flex flex-col items-center gap-3 py-6 rounded-2xl border cursor-pointer active:scale-95 transition-transform ${music ? 'bg-amber-400/10 border-amber-400/50' : 'bg-slate-900/70 border-slate-700'}`}
              >
                <img src={music ? musicOnIcon : musicOffIcon} alt="" className="w-24 h-24 object-contain drop-shadow-lg" />
                <span className="text-2xl font-bold">音乐</span>
                <span className={`rounded-full px-5 py-1 text-lg ${music ? 'bg-amber-400/15 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>{music ? '已开启' : '已关闭'}</span>
              </button>
              <button
                role="switch"
                aria-label="音效"
                aria-checked={effects}
                onClick={() => {
                  const enabled = !effects;
                  setEffectsEnabled(enabled);
                  setEffects(enabled);
                  playClick();
                }}
                className={`flex flex-col items-center gap-3 py-6 rounded-2xl border cursor-pointer active:scale-95 transition-transform ${effects ? 'bg-amber-400/10 border-amber-400/50' : 'bg-slate-900/70 border-slate-700'}`}
              >
                <img src={effects ? effectsOnIcon : effectsOffIcon} alt="" className="w-24 h-24 object-contain drop-shadow-lg" />
                <span className="text-2xl font-bold">音效</span>
                <span className={`rounded-full px-5 py-1 text-lg ${effects ? 'bg-amber-400/15 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>{effects ? '已开启' : '已关闭'}</span>
              </button>
            </div>
            {inGame && (
              <button
                onClick={() => {
                  close();
                  toCover();
                }}
                className="mt-6 w-full flex items-center justify-center gap-4 py-4 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 border border-amber-200 text-amber-950 font-bold text-2xl shadow-lg cursor-pointer active:scale-95 transition-transform"
              >
                <img src={homeIcon} alt="" className="w-16 h-16 object-contain drop-shadow-md" />
                返回封面
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
