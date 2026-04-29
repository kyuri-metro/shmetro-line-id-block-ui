# ShMetro Line ID Block Generator

用于生成上海地铁线路编号色块 SVG 的小型 React 工具。

## 开发

```bash
npm install
npm run dev
```

## UI 依赖约定

本项目的 UI 基础层依赖 @umamichi-ui/common-css。

- 入口在 src/main.tsx 直接引入 @umamichi-ui/common-css。
- 共享 token、基础布局、表单和按钮样式优先使用该包提供的能力。
- src/styles.css 只保留本项目特有样式，不再复制公共基础层。

如果后续有新的跨项目 UI 原语需求，优先沉淀到 @umamichi-ui/common-css，再回到具体项目接入。
