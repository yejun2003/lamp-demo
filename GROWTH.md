# Ye · 星屿成长记录

登录后的旧欢迎页面已替换为星系成长网站；现有台灯、拉绳换色、粒子和登录逻辑保留。旧入口及欢迎组件在 `.backup-before-galaxy/`，可手动恢复。

## 使用

在本目录运行 `npm run dev`，打开终端提示的本机地址，登录或点击「体验一下」。

- 星系总览：六颗星球缓慢公转，悬停或键盘聚焦星球时暂停，也可用右下角按钮暂停。点击进入对应空间。
- 成长日志：时间线、全文编辑、搜索、心情筛选、日历按日期查看。
- 目标计划：准备启程 / 正在靠近 / 已经抵达三栏看板；快捷增加 10% 进度，也可在编辑器精确调整。
- 阅读书架：书名、作者、阅读笔记、阅读进度和读完标记。
- 技能地图：可编辑的自评进度，雷达图展示前六项技能；不是自动评分。
- 习惯打卡：最近七天可打卡、取消、补记，首页同步显示今日情况。
- 闪光回忆：照片风格封面、文字、标签、日期和心情。

每个空间都可以新增、编辑、删除记录。首次展示可编辑示例，不代表你的真实经历。封面为四张内置生成素材，目前不是自定义照片上传功能。

## 数据边界

这是前端本机版，不含服务器、真实账号鉴权或跨设备同步。记录存放在当前浏览器的 `luma.growth.v1` 中，沿用固定键名以免升级后丢失内容。清除浏览器数据、使用另一个浏览器、变更站点地址 / 端口均可能看到不同存档。不要把本机演示登录当作私密数据保护。

侧栏「本机数据与备份」可导出 JSON，或在另一台设备导入。导入会校验版本与字段，合并新编号记录；相同编号保留本机版本，习惯打卡取并集。导出文件包含完整文字，请自行妥善保管。存储不可用或原存档损坏时会显示提醒，不静默覆盖异常原件。

## 代码阅读顺序

`src/App.tsx` 只组合登录页和按需加载的 `GrowthApp`。星系功能集中在独立目录，不堆进 App 或全局 CSS：

```text
src/features/growth/
├── GrowthApp.tsx            页面切换、弹窗组合、顶栏
├── types.ts                记录与存档类型
├── config/spaces.ts        六个空间名称、颜色、文案、轨道配置
├── data/seed.ts             首次打开时的示例内容
├── hooks/
│   ├── useGrowthStore.ts    本机存储、增删改查、导入校验
│   └── useOrbitMotion.ts    公转、暂停、减少动态效果
├── utils/dates.ts          本机日期计算，避免 UTC 日期偏移
├── components/
│   ├── GalaxyScene         星系场景与星球入口
│   ├── GrowthSidebar      电脑侧栏、手机抽屉导航
│   ├── TodayPanel         今日心情与习惯
│   ├── RecordEditor       新增 / 编辑 / 删除确认
│   ├── BackupDialog       导出 / 导入
│   ├── MonthCalendar      日历筛选
│   ├── PlanetArt          星球与封面素材图集
│   └── SpaceIcon          共用线性图标
├── views/
│   ├── Overview           首页汇总（对应 CSS）
│   ├── SpacePage          详情页通用标题、搜索和侧栏
│   ├── JournalView        日志（对应 CSS）
│   ├── GoalsView          目标（对应 CSS）
│   ├── ReadingView        书架（对应 CSS）
│   ├── SkillsView         技能（对应 CSS）
│   ├── HabitsView         习惯（对应 CSS）
│   └── MemoriesView       回忆（对应 CSS）
└── styles/
    ├── growth.css         星系主题、外壳与共用控件
    ├── spaceResponsive.css 六个详情页的断点布局
    └── feedback.css       保存提示
```

常见修改：星球名称 / 提问 / 颜色改 `config/spaces.ts`；示例改 `data/seed.ts`；某一页外观改同名 `View.css`；旋转速度改 `useOrbitMotion.ts` 中一圈 240000 毫秒；整体配色改 `styles/growth.css`。CSS 使用 `gx-` 前缀，避免影响登录页。页面地址使用 `#space/journal` 等 hash，支持浏览器返回；刷新后仍需从登录入口进入。

## 设计参考与素材

- [NASA Eyes](https://science.nasa.gov/eyes/)：参考可探索的星体空间与导航方式。
- [Day One](https://dayoneapp.com/features/)：参考按日期整理日记、回顾与记录的产品组织。
- [Awwwards 交互网站](https://www.awwwards.com/websites/web-interactive/?page=5)：参考沉浸式交互与留白节奏，不复制其页面或素材。

由 Build Web Apps 流程先生成首页与日志概念图，再落实实际界面。视觉采用深海军蓝、暖金、宋体感标题、线性图标、宽侧栏、星球主场景与右侧今日卡片。相较概念图，增加了真实数据操作和五个专属详情视图；手机改为抽屉导航与纵向卡片。

`public/growth/galaxy.png` 为无文字倾斜旋涡星系，`planets.png` 为 3×2 透明六星球图集，`stories.png` 为 2×2 晨光小路 / 书与咖啡 / 海边日落 / 远山旗帜图集，均为本次生成素材。轨道、标题、按钮、卡片均由真实页面绘制，不是整页截图。

构建：`npm run build`；代码检查：`npm run lint`。
