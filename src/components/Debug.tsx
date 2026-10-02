import React, { useState } from 'react';
import { X, ArrowLeft, Image as ImageIcon, Wrench, Grid } from 'lucide-react';
import Level from '../views/Level.tsx';
import { playClick } from '../utils/sound.ts';

// 使用 Vite 动态遍历 resources/UI 下的所有图片文件
const uiModules = import.meta.glob<{ default: string }>(
  '../../resources/UI/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

interface UiItem {
  name: string;
  src: string;
}

interface Props {
  pickLvl: (n: number) => void;
  lvl: number;
}

export default function Debug({ pickLvl, lvl }: Props) {
  // 弹窗状态与当前所在模式：menu=选项列表，gallery=UI遍历展示，level=选关
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'menu' | 'gallery' | 'level'>('menu');

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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white/70 hover:text-white text-xs font-mono border border-white/20 shadow-lg backdrop-blur-xs active:scale-95 transition-all cursor-pointer"
          title="打开调试菜单"
        >
          <Wrench className="w-3.5 h-3.5 text-amber-400" />
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
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
          <div className="w-full max-w-[620px] max-h-[92%] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
            {/* 顶部标题栏 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                {mode === 'gallery' && (
                  <button
                    onClick={() => setMode('menu')}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer mr-1"
                    title="返回菜单"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-lg text-white">
                  {mode === 'menu' ? '调试控制台 (DEBUG)' : `UI 组件展示 (共 ${uiList.length} 项)`}
                </h3>
              </div>

              <button
                onClick={close}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="关闭"
              >
                <X className="w-5 h-5" />
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
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-amber-400/50 transition-all text-left cursor-pointer group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <ImageIcon className="w-6 h-6" />
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

                  <span className="text-xs text-amber-400 font-mono px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    {uiList.length} 张
                  </span>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setMode('level');
                  }}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-amber-400/50 transition-all text-left cursor-pointer group shadow-md"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Grid className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    2. 关卡选择
                  </div>
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
                      className="flex flex-col bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 shadow-md"
                    >
                      {/* 文件名 */}
                      <div className="text-xs font-mono font-bold text-amber-300 truncate mb-2.5 pb-1.5 border-b border-slate-800/80">
                        {item.name}
                      </div>

                      {/* 图片预览容器，使用暗空格纹理适配透明图 */}
                      <div className="w-full h-32 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-center p-2 overflow-hidden relative">
                        <img
                          src={item.src}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain drop-shadow"
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
