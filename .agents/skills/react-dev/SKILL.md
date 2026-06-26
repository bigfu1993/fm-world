---
name: react-dev
description: React + TypeScript + Ant Design + Vite 开发规范，用于本项目（finger-more-admin）新增页面、组件、接口和状态管理时遵循的约定。当用户要求新增页面、组件、API 调用或 store 时使用。
---

# finger-more-admin 研发规范

技术栈：Vite + React 19 + TypeScript + Ant Design + react-router-dom + zustand + axios。

## 目录结构

```
src/
  api/        axios 实例与接口函数，统一从 request.ts 导出的 request 发请求
  store/      zustand store，文件名 use<Xxx>Store.ts
  router/     路由配置，集中在 index.tsx
  layouts/    布局组件（侧边栏、Header 等）
  pages/      页面，每个页面一个目录，入口为 index.tsx
```

## 路径引用

- 跨目录引用统一用 `@` 别名（指向 `src/`），不要写 `../`；同目录下的 `./xxx` 保留相对路径。
- 别名在 `vite.config.ts` 的 `resolve.alias` 和 `tsconfig.app.json` 的 `compilerOptions.paths` 两处同步配置。

## 自动导入

- `react` 的 `useState/useEffect/useMemo/useCallback/useRef/useContext/useLayoutEffect` 和 `react-router-dom` 的 `useNavigate/useLocation/useParams/useSearchParams` 由 `unplugin-auto-import` 自动注入，不要手写这些 import。
- 其他 hooks/组件（如 `Outlet`、`Navigate`、`StrictMode`、antd 的所有组件）仍需手动 import。
- 新增需要自动导入的 API，在 `vite.config.ts` 的 `AutoImport({ imports: [...] })` 里加，然后跑一次 `npm run build`（或 `npm run dev`）重新生成 `src/auto-imports.d.ts` 和 `.eslintrc-auto-import.json`，这两个文件要提交到仓库。

## 新增页面

1. 在 `src/pages/<PageName>/index.tsx` 创建页面组件。
2. 在 `src/router/index.tsx` 的 `children` 数组中注册路由；需要登录的页面放在 `RequireAuth` 包裹的 `BasicLayout` 下。
3. 如果要出现在侧边栏，给 `src/layouts/BasicLayout.tsx` 的 `menuItems` 加一项。

## 接口调用

- 不要在组件里直接 `import axios`，统一使用 `src/api/request.ts` 导出的 `request` 实例（已挂了 token 注入和 401 自动登出）。
- 按业务模块在 `src/api/` 下建文件（例如 `src/api/user.ts`），导出具体请求函数，组件里只调用这些函数。

## 状态管理

- 全局状态用 zustand，一个 store 一个文件，放在 `src/store/`，命名 `use<Xxx>Store.ts`。
- 只有跨页面共享的状态才放 store；页面内部状态用 `useState`。

## 组件约定

- 函数组件 + TypeScript，不用 class component。
- Props 用 `interface` 定义，不用 `type`（除非是联合类型）。
- UI 优先用 antd 组件，不另外引入其他 UI 库；图标用 `@ant-design/icons`。
- 不写行内大段样式对象，简单样式用 `style` 内联，复杂样式用单独的 `.css` 文件。
- `Select.options` 展示多语言业务数据时，`label` 使用 `<LanguageText langKey={language} map={data} />`，不要提前取 `data[language]` 字符串；下拉展示需和顶部语言选择保持一致：当前语言为非英文时展示“当前语言主文案 + 英文副文案”，英文时只展示英文主文案。筛选类单选 `Select` 可给 option 额外提供纯文本字段，并通过 `optionLabelProp` 让选择框内已选值展示纯文本，避免已选值区域渲染双语节点。
- 创建类按钮和创建态标题统一展示为“新建”，不要拼接具体业务对象名，例如不要写“新建国家”“新建类型”。
- 弹窗统一使用 `src/components/DraggableModal`，不要直接从 antd 使用 `Modal`；项目弹窗均需支持拖拽移动、不显示 mask，并且不展示右上角关闭图标。
- 弹窗标题统一由 `DraggableModal` 样式设置为 `18px` 字号；标题、弹窗内主按钮、`Form.Item` 标题短竖线、输入框/数字输入/下拉框 hover 与 focus 边框、Radio/Checkbox hover 与 checked 激活色优先使用 `DraggableModal` 的 `themeColor` 入参，未传时默认蓝色 `#1677ff`。
- 弹窗默认 footer 的“确定”按钮颜色由 `DraggableModal` 根据主题色统一配置，页面内不要重复配置确定按钮颜色。
- 弹窗 footer 按钮文案统一使用 `LanguageLabel` 组件；`DraggableModal` 已默认用 `confirm`、`cancel` 渲染确定/取消，若自定义 footer 或自定义 `okText`/`cancelText`，也必须传入 `LanguageLabel` 节点。
- Modal 内的按钮、下拉、输入框、表格统一使用小一号尺寸：`<Form>` 加 `size="small"`，弹窗内 `Select` 显式加 `size="small"`，弹窗内自定义 `Button` 和 `Table` 显式加 `size="small"`，Modal 默认 footer 按钮通过 `okButtonProps={{ size: 'small' }}` 和 `cancelButtonProps={{ size: 'small' }}` 配置。
- 弹窗内 `Form.Item` 标题前统一由 `DraggableModal` 样式展示 4px 宽、12px 高的主题色短竖线，竖线与标题文字保持 10px 间距；页面内不要为了标题装饰额外添加 DOM。弹窗内容子树中继续打开 `DraggableModal` 时会继承当前主题色；兄弟节点方式渲染的二级弹窗需显式传递相同 `themeColor`。
- `Input`、`InputNumber` 字号由 `src/App.tsx` 的 Ant Design `ConfigProvider.theme.components` 统一配置为 `12`，页面和组件内不要重复写控件 `fontSize`；`Select` 不配置选择框 `fontSize`，只保留 `optionFontSize` 用于下拉选项字号，避免影响默认选择框高度。
- `Input`、`InputNumber`、`Select` 尺寸只按是否处于弹窗场景区分：非弹窗场景不单独写 `size`，使用 Ant Design 默认尺寸；弹窗内输入类控件通过 Form 小尺寸或控件自身 `size="small"` 保持一致。
- 组件 DOM 层级保持克制：不要为了“占位”或习惯性包裹额外添加 `div`、`Space`、`Card`、隐藏 `Form.Item` 等节点；单子节点不需要布局能力时直接返回子节点，多子节点优先用 `Fragment`，只有存在间距、滚动、定位、对齐、表单绑定或语义容器需求时才添加真实 DOM 容器。
- DOM 层级优化覆盖场景：单按钮/单输入工具栏不要用 `Space` 只承载 `marginBottom`，可将间距放到控件自身；单子节点的 `Fragment`、只包一层样式但可下沉样式的 `div`、无实际语义的嵌套 `Card`、固定值隐藏控件、无内容占位节点都应优先移除或合并。
- DOM 层级保留场景：承载滚动区域、flex/grid 布局、拖拽范围、绝对定位上下文、事件委托、语义分组、可访问性角色、表单字段绑定、列表 key 边界、Ant Design 组件要求的 wrapper 时，应保留真实容器。
- 进行页面或组件调整时，如果分析发现可减少 DOM 层级且能够保证交互逻辑、表单数据结构、视觉布局不变，应同步完成优化，不只停留在说明；无法确定是否影响布局或交互时，保留现状并说明风险。
- 表单组件封装时避免渲染无效隐藏字段；固定类型、固定状态等可由组件内部同步到表单值时，不再额外渲染隐藏控件。确需使用 `Form.Item noStyle` 时，应只用于给自定义控件绑定表单值，不作为布局容器。

## 表格约定

- Ant Design `Table` 横向内容超出时，由表格主体负责滚动，优先配置 `scroll={{ x: 'max-content' }}` 或明确的 `scroll.x`。
- 表格存在操作列时，操作列固定在右侧，配置 `fixed: 'right'`，并给出稳定 `width`，避免横向滚动后操作入口丢失。
- 每列都应设置合理 `width`，表头通过 `whiteSpace: 'nowrap'` 或同等方式保持一行展示；不要让表头换行撑高表格。
- 表格单元格内容为空时统一展示 `-` 占位，优先使用 `src/utils/table.tsx` 中的 `renderTableEmptyPlaceholder`，不要直接返回 `null`、空字符串或空白内容。

## 其他

- 默认不写注释，除非是解释非显而易见的约束或边界情况。
- 不要引入 Redux、MobX 等其他状态管理方案，保持 zustand 单一方案。
