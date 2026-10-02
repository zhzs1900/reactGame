// 引入WAV音频文件
import bgmAudio from '../../resources/audio/bgm.wav';
import clickAudio from '../../resources/audio/click.wav';

// 背景音乐全局实例
let bgmPlayer: HTMLAudioElement | null = null;
let musicEnabled = true;
let effectsEnabled = true;
const activeEffects = new Set<HTMLAudioElement>();

export function setMusicEnabled(enabled: boolean) {
  musicEnabled = enabled;
  if (enabled) startBgm();
  else bgmPlayer?.pause();
}

export function setEffectsEnabled(enabled: boolean) {
  effectsEnabled = enabled;
  if (!enabled) {
    activeEffects.forEach((snd) => snd.pause());
    activeEffects.clear();
  }
}

// 点击音效对象池，避免连点时声音被掐断
const clickSound = new Audio(clickAudio);
clickSound.volume = 0.8;

// 初始化并启动背景音乐
export function startBgm() {
  if (!musicEnabled) return;
  if (!bgmPlayer) {
    bgmPlayer = new Audio(bgmAudio);
    bgmPlayer.loop = true;
    bgmPlayer.volume = 0.55;
  }
  // 浏览器限制必须用户产生交互后才能播放
  bgmPlayer.play().catch(() => {
    // 没交互时静默等待下一次点击
  });
}

// 播放按钮点击音效
export function playClick() {
  try {
    // 首次点击时顺带触发启动BGM
    startBgm();
    if (!effectsEnabled) return;
    // 克隆音频快速播放，支持高频连点
    const snd = clickSound.cloneNode() as HTMLAudioElement;
    snd.volume = 0.8;
    activeEffects.add(snd);
    snd.addEventListener('ended', () => activeEffects.delete(snd), { once: true });
    snd.play().catch(() => activeEffects.delete(snd));
  } catch {
    // 忽略异常
  }
}
