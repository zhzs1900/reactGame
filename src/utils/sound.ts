// 引入WAV音频文件
import bgmAudio from '../../resources/audio/bgm.wav';
import clickAudio from '../../resources/audio/click.wav';

// 背景音乐全局实例
let bgmPlayer: HTMLAudioElement | null = null;

// 点击音效对象池，避免连点时声音被掐断
const clickSound = new Audio(clickAudio);
clickSound.volume = 0.8;

// 初始化并启动背景音乐
export function startBgm() {
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
    // 克隆音频快速播放，支持高频连点
    const snd = clickSound.cloneNode() as HTMLAudioElement;
    snd.volume = 0.8;
    snd.play().catch(() => {});
  } catch {
    // 忽略异常
  }
}
