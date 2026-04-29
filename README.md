# 上海地铁线路号方块生成器 UI

> 以下内容为 GPT 5.4 生成，但经过人工正确性检查，你可以作为参考

这是 kyuri-metro 组织下的 UI 仓库，负责预览与导出上海地铁线路号方块 SVG。

- -ui：当前仓库，负责页面、表单、实时预览、导出与字体检测
- -2020-svg-generator：2020 版 SVG 生成逻辑仓库
- -2024-svg-generator：2024 版 SVG 生成逻辑仓库

当前 UI 通过依赖两个独立的 SVG 生成仓库来完成 2020 / 2024 两套导出。

## 统一参数规格

- 前景色 foreground
- 背景色 background
- 线路号 lineNumber，范围为 0 至 99
- 高度 height

当前 UI 侧使用的两个独立 npm 包为：

- @kyuri-metro/shmetro-line-id-block-2020-svg-generator
- @kyuri-metro/shmetro-line-id-block-2024-svg-generator

统一导出入口位于：

- [src/lineIdGenerators.ts](src/lineIdGenerators.ts)

## 当前特性

- 支持在页面中切换 2020 / 2024 两套线路号方块参数
- 支持输入线路号码并实时预览结果
- 支持统一设置高度，并按比例缩放 SVG
- 支持自动套用上海地铁标准线路色，也可手动覆盖前景色和背景色
- 支持导出标准 SVG
- 内置系统 Arial 检测，降低不同设备上的预览回退风险
- UI 基础层复用 @umamichi-ui/common-css，并参考 njmetro-railmap-creator 的页面结构与交互节奏

## 项目结构

- [src/App.tsx](src/App.tsx)：页面结构与交互逻辑
- [src/lineIdGenerators.ts](src/lineIdGenerators.ts)：UI 侧对外统一入口，内部转发到两个独立组件仓库
- [src/lineIdUiShared.ts](src/lineIdUiShared.ts)：UI 侧本地校验与上海地铁配色逻辑
- [src/arialSignature.ts](src/arialSignature.ts)：系统 Arial 检测逻辑
- [src/styles.css](src/styles.css)：项目特有样式

参考资料现已分别迁移到两个 SVG 生成仓库内的 docs 目录。

## 本地开发

```bash
npm install
npm run dev
```

## 构建与检查

```bash
npm run lint
npm run build
```

## 发布到 GitHub 前建议检查

- 确认 UI 仓库名是否最终为 shmetro-line-id-block-ui
- 确认两个生成仓库名是否最终为 shmetro-line-id-block-2020-svg-generator 与 shmetro-line-id-block-2024-svg-generator
- 如果改为真实 GitHub 依赖，请把 [package.json](package.json) 中的 file 依赖切换为正式版本号
- 补充仓库描述、topics、预览截图和发布说明
- 配置实际远程仓库后再推送 main 分支

## 设计与免责声明

本工具中的参数来自对实拍照片和现有 SVG 资料的视觉逆向推导，不代表上海申通地铁集团有限公司的官方视觉标准或正式规范。

输出结果仅供个人学习、参考及非商业用途，请勿将其用于任何官方或商业场合。

## UI 依赖约定

本项目的 UI 基础层依赖 @umamichi-ui/common-css。

- 入口在 [src/main.tsx](src/main.tsx) 中直接引入 @umamichi-ui/common-css
- 共享 token、基础布局、表单和按钮样式优先使用该包提供的能力
- [src/styles.css](src/styles.css) 仅保留本项目特有样式，不复制公共基础层

如果后续有新的跨项目 UI 原语需求，优先沉淀到 @umamichi-ui/common-css，再回到具体项目接入。

## 许可证

[MIT License](LICENSE)

文档与说明文字如需单独声明文字许可证，按当前偏好优先使用 CC BY-SA 4.0。

## 作者

Made by [Umamichi](https://github.com/Unnamed2964)
