# reactGame

一个基于 **React 19 + TypeScript + Vite** 开发的移动端小游戏基础工程。项目当前定位为“益智冒险闯关”小游戏框架，内置封面、关卡流程、设置、结算、调试、音效及本地进度保存等基础能力，游戏画面按照 **720 × 1280** 的移动端设计尺寸进行适配。

## 技术栈

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- Motion
- Lucide React
- Express
- Google GenAI SDK

## 项目结构

```text
reactGame/
├─ resources/              # 游戏图片、UI、音频等资源
├─ src/
│  ├─ components/
│  │  ├─ Stage.tsx         # 游戏总舞台与页面流程控制
│  │  ├─ Settings.tsx      # 设置界面
│  │  ├─ Result.tsx        # 游戏结算界面
│  │  └─ Debug.tsx         # 调试工具
│  ├─ views/
│  │  ├─ Cover.tsx         # 游戏封面
│  │  ├─ Game.tsx          # 游戏主界面
│  │  └─ Level.tsx         # 关卡选择界面
│  ├─ utils/               # 音效等公共工具
│  ├─ App.tsx              # React 应用入口组件
│  ├─ main.tsx             # 页面挂载入口
│  └─ index.css            # 全局样式
├─ customconfig.json       # 自定义配置
├─ metadata.json           # 游戏元信息
├─ .env.example            # 环境变量示例
├─ dev.bat                 # Windows 开发启动脚本
├─ stop.bat                # Windows 停止脚本
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 当前框架能力

- 游戏封面与游戏主界面切换
- 10 个关卡的基础关卡流程
- 关卡解锁进度保存
- 游戏胜利 / 失败结算
- 下一关与重新挑战
- 设置菜单
- Debug 调试入口
- 背景音乐与点击音效
- 浏览器 `localStorage` 保存已解锁关卡
- 720 × 1280 固定逻辑分辨率，并根据浏览器高度自动等比缩放

> 当前 `src/views/Game.tsx` 主要提供游戏主界面背景和业务接入位置，具体核心玩法可以继续在此基础上扩展。

## 环境要求

建议安装：

- Node.js 20 或更高版本
- npm

## 安装依赖

```bash
npm install
```

## 启动开发环境

```bash
npm run dev
```

默认开发服务器：

```text
http://localhost:3000
```

Vite 当前配置允许局域网设备通过开发机 IP 访问。

### Windows 快速启动

仓库包含 `dev.bat`。

该脚本当前会优先尝试将本项目的 `node_modules` 链接到以下共享依赖目录：

```text
E:\playPlace2026\ruanzhuGameStorage\yilai697\node_modules
```

因此这个脚本带有本机环境路径依赖。如果其他电脑不存在该目录，建议直接执行：

```bash
npm install
npm run dev
```

或者自行修改 `dev.bat` 中的 `SHARED_DEP` 路径。

## 构建

```bash
npm run build
```

构建产物默认输出到：

```text
dist/
```

本地预览生产构建：

```bash
npm run preview
```

## 类型检查

```bash
npm run lint
```

当前 `lint` 脚本实际执行：

```bash
tsc --noEmit
```

用于进行 TypeScript 类型检查。

## 环境变量

可参考根目录的 `.env.example`：

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

其中：

- `GEMINI_API_KEY`：Google Gemini API 调用所需密钥。
- `APP_URL`：应用部署后的访问地址，可用于回调或服务端接口。

请不要将真实 API Key 提交到公开仓库。

## 游戏开发说明

应用入口为：

```text
src/main.tsx
  ↓
src/App.tsx
  ↓
src/components/Stage.tsx
```

`Stage.tsx` 负责整个游戏的页面状态、关卡编号、解锁进度、结算状态及画面缩放。

核心玩法建议集中在：

```text
src/views/Game.tsx
```

游戏素材统一放在：

```text
resources/
```

如果新增多个玩法模块，建议继续拆分到独立组件或业务目录，避免把所有逻辑集中在 `Game.tsx` 中。

## 分辨率与移动端适配

游戏内部使用固定逻辑尺寸：

```text
720 × 1280
```

`Stage.tsx` 会根据浏览器窗口高度动态计算缩放比例，在保持原始布局比例的情况下适配不同屏幕。

开发 UI 和游戏对象时，建议始终以 720 × 1280 为设计基准。

## 进度保存

当前已解锁关卡使用浏览器 `localStorage` 保存，键名为：

```text
unlockedLvl
```

当前最大关卡数为 10。

## License

当前仓库暂未声明开源许可证。如需公开分发或允许第三方使用，建议补充 LICENSE 文件。
