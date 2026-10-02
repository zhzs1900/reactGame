import React from 'react';

// 引入游戏主界面背景素材
import bgGame from '../../resources/UI/background.jpg';
export default function Game() {
  return (
    // 关卡主界面：返回封面入口统一放在齿轮菜单中
    <div
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(${bgGame})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
