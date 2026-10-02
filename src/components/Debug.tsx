import React, { useState } from 'react';
import galleryIcon from '../../resources/UI/icons/icon_gallery.png';
import levelsIcon from '../../resources/UI/icons/icon_levels.png';
import eventsIcon from '../../resources/UI/icons/icon_events.png';
import trophyIcon from '../../resources/UI/icons/icon_trophy.png';
import indicatorIcon from '../../resources/UI/icons/indicator_debug.png';
import type { GameResult } from './Result.tsx';
import closeIcon from '../../resources/UI/icons/icon-3.png';
import backIcon from '../../resources/UI/icons/icon-12.png';
import toolIcon from '../../resources/UI/icons/icon-14.png';
import Level from '../views/Level.tsx';
import { playClick } from '../utils/sound.ts';

// 使用 Vite 动态遍历 resources/UI 下的所有图片文件
const uiModules = import.meta.glob<{ default: string }>(
  '../../resources/UI/**/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

interface UiItem {
  name: string;
  src: string;
}

interface Props {
  pickLvl: (n: number) => void;
  lvl: number;
  triggerResult: (result: GameResult) => void;
}

export default function Debug({ pickLvl, lvl, triggerResult }: Props) {
  // 弹窗状态与当前所在模式：menu=选项列表，gallery=UI遍历展示，level=选关，events=触发事件
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'menu' | 'gallery' | 'level' | 'events'>('menu');

  // 整理所有遍历到的UI图片列表
  const uiList: UiItem[] = Object.entries(uiModules).map(([path, mod]) => ({
    name: path.split('/').pop() || '',
    src: mod.default,
  }));

  // 关闭并重置弹窗
  const close = () => {
    setOpen(false);
    setMode('menu');
  };

  return (
    <>
      {/* 游戏右下角浮动 Debug 按钮 */}
      <div className="absolute bottom-3 right-3 z-30 select-none">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 ui-debug-button text-white/70 hover:text-white text-xs font-mono active:scale-95 transition-all cursor-pointer"
          title="打开调试菜单"
        >
          <img src={toolIcon} alt="" className="w-5 h-5 object-contain" />
          <span>DEBUG</span>
        </button>
      </div>

      {/* Debug 弹窗遮罩与主体 */}
      {open && mode === 'level' && (
        <div className="absolute inset-0 z-50">
          <Level
            toMenu={() => setMode('menu')}
            pickLvl={(n) => {
              pickLvl(n);
              close();
            }}
            lvl={lvl}
          />
        </div>
      )}
      {open && mode !== 'level' && (
        <div className="absolute inset-0 ui-overlay-debug z-50 flex items-center justify-center p-4 select-none">
          <div className="w-full max-w-[620px] max-h-[92%] ui-panel-debug flex flex-col overflow-hidden text-slate-100">
            {/* 顶部标题栏 */}
            <div className="flex items-center justify-between px-6 py-4 ui-debug-header">
              <div className="flex items-center gap-2.5">
                {mode !== 'menu' && (
                  <button
                    onClick={() => setMode('menu')}
                    className="p-1 ui-back-hover text-slate-300 hover:text-white transition-colors cursor-pointer mr-1"
                    title="返回菜单"
                  >
                    <img src={backIcon} alt="" className="w-7 h-7 object-contain" />
                  </button>
                )}
                <img src={indicatorIcon} alt="" className="w-2.5 h-2.5 animate-pulse" />
                <h3 className="font-bold text-lg text-white">
                  {mode === 'menu' ? '调试控制台 (DEBUG)' : mode === 'events' ? '触发事件' : `UI 组件展示 (共 ${uiList.length} 项)`}
                </h3>
              </div>

              <button
                onClick={close}
                className="p-1.5 ui-close-hover text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="关闭"
              >
                <img src={closeIcon} alt="" className="w-7 h-7 object-contain" />
              </button>
            </div>

            {/* 内容区域：1. 选项菜单 */}
            {mode === 'menu' && (
              <div className="p-6 flex flex-col gap-4">
                <div className="text-xs text-slate-400 mb-1">
                  请选择调试功能模块：
                </div>

                {/* 第一项：UI展示 */}
                <button
                  onClick={() => setMode('gallery')}
                  className="flex items-center justify-between p-4 ui-debug-item transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 ui-debug-icon-slot flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <img src={galleryIcon} alt="" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                      <div className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                        1. UI展示
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        自动遍历列出 resources/UI 目录下的所有图片素材
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-amber-400 font-mono px-2.5 py-1 ui-debug-count">
                    {uiList.length} 张
                  </span>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setMode('level');
                  }}
                  className="flex items-center gap-3.5 p-4 ui-debug-item transition-all text-left cursor-pointer group"
                >
                  <div className="w-11 h-11 ui-debug-icon-slot flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <img src={levelsIcon} alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    2. 关卡选择
                  </div>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setMode('events');
                  }}
                  className="flex items-center gap-3.5 p-4 ui-debug-item transition-all text-left cursor-pointer group"
                >
                  <div className="w-11 h-11 ui-debug-icon-slot flex items-center justify-center text-amber-400">
                    <img src={eventsIcon} alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="font-bold text-base text-white group-hover:text-amber-300">3. 触发事件</div>
                </button>
              </div>
            )}

            {mode === 'events' && (
              <div className="p-6 flex flex-col gap-4">
                <button
                  onClick={() => {
                    playClick();
                    close();
                    triggerResult('victory');
                  }}
                  className="flex items-center gap-4 p-5 ui-event-victory text-amber-950 font-bold text-xl cursor-pointer active:scale-95 transition-transform"
                >
                  <img src={trophyIcon} alt="" className="w-8 h-8 object-contain" />
                  1. 触发胜利
                </button>
                <button
                  onClick={() => {
                    playClick();
                    close();
                    triggerResult('failure');
                  }}
                  className="flex items-center gap-4 p-5 ui-event-failure text-red-200 font-bold text-xl cursor-pointer active:scale-95 transition-transform"
                >
                  <img src={closeIcon} alt="" className="w-8 h-8 object-contain" />
                  2. 触发失败
                </button>
              </div>
            )}

            {/* 内容区域：2. UI 遍历展示 */}
            {mode === 'gallery' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="text-xs text-slate-400 pb-1">
                  当前 resources/UI 目录全部图片文件遍历：
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {uiList.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col ui-gallery-card p-3.5"
                    >
                      {/* 文件名 */}
                      <div className="text-xs font-mono font-bold text-amber-300 truncate mb-2.5 pb-1.5 ui-gallery-divider">
                        {item.name}
                      </div>

                      {/* 图片预览容器，使用暗空格纹理适配透明图 */}
                      <div className="w-full h-32 ui-gallery-slot flex items-center justify-center p-2 overflow-hidden relative">
                        <img
                          src={item.src}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
