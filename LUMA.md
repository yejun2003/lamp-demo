# luma · 互动台灯登录页

在此目录运行 `npm run dev`，打开终端显示的本地地址。构建：`npm run build`；代码检查：`npm run lint`。

以 https://github.com/yej200320-beep/lamp 为交互参考，在现有 React + TypeScript + Vite 项目内重新设计。

- 拖动或点击拉绳，每次切换下一种颜色，共 10 色；键盘聚焦拉绳后按 Enter 或空格也可操作。
- 色点可直接选色，独立开关可关灯；再次拉绳唤醒。
- 换色时播放同色粒子，可单独关闭；遵循系统的减少动态效果设置。
- 手机端纵向排列，电脑端双栏；窗口宽度与高度改变时自动调整比例与间距。
- 登录信息以现有 `LoginForm.tsx` 配置为准，也可以点击「体验一下」。
- 这是前端交互演示，不包含真实身份验证。只在勾选后将账号保存在本机，不保存密码。

原始页面文件在 `.backup-before-luma/` 中。`public/lamp-scene.png` 为内置 Image Gen 生成的独立素材，提示方向为“奶油色微笑 3D 台灯、鼠尾草绿背景、无文字无拉绳”，拉绳与粒子由实际页面控件实现。

## 从哪里开始读代码

建议依次阅读 `src/main.tsx` → `src/App.tsx` → 感兴趣的功能组件。

```text
src/
├── App.tsx                      页面组合、登录状态、灯开关、弹窗类型
├── main.tsx                     React 挂载入口
├── index.css                    只引用三份全局样式
├── components/
│   ├── layout/
│   │   └── PageLayout.tsx/.css   页头、页脚、双栏及响应式布局
│   ├── lamp/
│   │   ├── LampScene.tsx/.css    台灯场景、选色和开关
│   │   ├── PullCord.tsx/.css     拉绳拖动、回弹、点击和键盘操作
│   │   └── ParticleBurst.tsx/.css 粒子轨迹与动画
│   ├── auth/
│   │   ├── LoginForm.tsx/.css    输入框、校验、密码显示、记住账号
│   │   └── 登录后由 features/growth/GrowthApp.tsx 接管
│   └── ui/
│       ├── Icon.tsx             共用 SVG 图标
│       └── InfoDialog.tsx/.css   帮助和关于弹窗
├── config/lampThemes.ts         十种灯光配置
├── utils/accountStorage.ts      账号本地存储，自动兼容不可用的存储
└── styles/
    ├── tokens.css              全站颜色、字体变量
    ├── base.css                基础元素和焦点样式
    └── shared.css              共用按钮、标题图标、入场动画
```

每个组件直接引用同名 CSS，响应式规则放在所属组件 CSS 内。原 `App.css` 已按功能拆开；原文件仍在备份目录。CSS 使用描述性类名，共用设计变量集中在 `tokens.css`。

### 常见修改

| 想改什么                       | 改哪里                                         |
| ------------------------------ | ---------------------------------------------- |
| 增加颜色、改颜色名称或滤镜     | `config/lampThemes.ts`，无需再改色点或总数     |
| 拉动阈值、绳子长度、回弹       | `components/lamp/PullCord.tsx` 和对应 CSS      |
| 粒子数量、大小、轨迹、持续时间 | `components/lamp/ParticleBurst.tsx` 和对应 CSS |
| 手机和电脑的页面排列           | `components/layout/PageLayout.css`             |
| 灯在不同窗口中的大小           | `components/lamp/LampScene.css`                |
| 登录校验或对接后端             | `components/auth/LoginForm.tsx` 的 `submit`    |
| 整体配色和字体                 | `styles/tokens.css`                            |

状态流：`App` 管理跨区域状态；`LampScene` 管理灯色和粒子；`PullCord` 只发出拉绳事件；`LoginForm` 校验通过后通知 `App` 进入星屿成长网站。新增模块详见 [GROWTH.md](GROWTH.md)。
