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

## 模块归属约定

- 语言模块归属信息中心，菜单名使用“语言”，路由使用 `/info-center/languages`；旧 `/master-data/languages` 只作为跳转入口保留，不再在基础数据菜单中展示。
- 货币模块归属信息中心，路由使用 `/info-center/currencies`，数据作为国家信息绑定弹窗中“货币”项的来源；不要和“货币支付”内容混用，后者维护移动支付、信用卡支付、小费文化等支付习惯说明，并归属服务信息模块页内 Tab，不再注册独立菜单、页面和权限入口。
- 国家信息绑定弹窗中“文化习俗”列包含文化习俗、小费文化、宗教三项；文化习俗来自 `CULTURE_CUSTOM_INFOS`，小费文化来自服务信息货币支付数据 `CURRENCY_PAYMENT_INFOS.tippingCulture`，宗教来自 `RELIGION_INFOS` mock 数据源。
- 国家信息绑定弹窗为四列布局，第一列和第二列在基础等宽列宽上各收窄 `80px`；第一列为“基本信息”，包含国家编码、名称、语言、货币、入境政策、安全和可见倍率；入境政策来自 `ENTRY_POLICY_INFOS` mock 数据源；安全 Slider 宽度比容器收窄 `60px` 并左右居中，标记主文案字号为 `10px`。
- 国家信息绑定弹窗第三列仅包含“注意事项”二级标题；交通不在国家信息绑定弹窗中展示；注意事项来自 `SECURITY_RISK_INFOS` mock 数据源。
- 交通模块归属信息中心，菜单名使用“交通”，路由使用 `/info-center/traffic`，在信息中心菜单中固定为第 3 项；交通 mock 维护飞机、铁路、巴士、地铁、公交、出租、互联网出租、租车、电动车、自行车、摩托车、私人协议 12 类，code 统一使用 `TRAFFIC_随机11位数字`，具体交通方式前缀维护在 value 列，例如 `AIRPLANE`、`RAILWAY`、`PRIVATE_AGREEMENT`。
- 注意事项模块归属信息中心，对外菜单名使用“注意事项”，内部路由保留 `/info-center/security-risk`，权限 code 保留 `securityRisk:manage`。
- 紧急处理模块已从信息中心移除，不再注册菜单、路由和权限入口。
- 点位类型管理归属点位管理页内，地标类型管理归属地标管理页内，通过页面内“类型列表”弹窗维护，不再注册信息中心独立菜单、路由和权限入口；类型列表列统一为 `code / name / value`，code 为类型记录业务编码，name 为多语言类型名称，value 为点位/地标记录实际保存和匹配的业务类型值。
- 语言、货币、交通列表数据列统一为 `code / 名称 / value / 补充`；国标列表数据列统一为 `code / 类型 / 名称 / value / 补充`。语言、货币和国标的 value 与补充暂无业务数据时按表格空值规范显示 `-`，交通的 value 展示具体交通方式前缀，国标的名称展示原“标准”列内容；电话类国标名称统一展示为“国家/地区 + 国际区号前缀 + 本地号码”，例如 `中国 +86 110`；国标弹窗需同步维护名称与补充；国标类型列表列统一为 `code / name / value`，code 为类型记录业务编码，name 为多语言类型名称，value 为国标条目编码前缀。

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
- 弹窗标题统一由 `DraggableModal` 样式设置为 `18px` 字号；标题、弹窗内主按钮、`Form.Item` 标题短竖线、输入框/数字输入/下拉框 hover 与 focus 边框、Slider 激活色、Radio/Checkbox hover 与 checked 激活色优先使用 `DraggableModal` 的 `themeColor` 入参，未传时默认蓝色 `#1677ff`。
- 弹窗默认 footer 的“确定”按钮颜色由 `DraggableModal` 根据主题色统一配置，页面内不要重复配置确定按钮颜色。
- 弹窗 footer 按钮文案统一使用 `LanguageLabel` 组件；`DraggableModal` 已默认用 `confirm`、`cancel` 渲染确定/取消，若自定义 footer 或自定义 `okText`/`cancelText`，也必须传入 `LanguageLabel` 节点。
- Modal 内的按钮、下拉、输入框、表格统一使用小一号尺寸：`<Form>` 加 `size="small"`，弹窗内 `Select`、`Input`、`InputNumber`、自定义 `Button` 和 `Table` 显式加 `size="small"`，Modal 默认 footer 按钮通过 `okButtonProps={{ size: 'small' }}` 和 `cancelButtonProps={{ size: 'small' }}` 配置。
- 弹窗内 `Form.Item` 标题前统一由 `DraggableModal` 样式展示 4px 宽、12px 高的主题色短竖线，竖线与标题文字保持 10px 间距；页面内不要为了标题装饰额外添加 DOM。弹窗内容子树中继续打开 `DraggableModal` 时会继承当前主题色；兄弟节点方式渲染的二级弹窗需显式传递相同 `themeColor`。
- `Input`、`InputNumber`、`Select` 字号由 `src/App.tsx` 的 Ant Design `ConfigProvider.theme.components` 统一配置为 `12`，页面和组件内不要重复写控件 `fontSize`；`Select` 同时配置选择框正文 `fontSize` 与下拉选项 `optionFontSize`，弹窗内选择框正文与 option 字号保持一致。
- `Input`、`InputNumber`、`Select` 尺寸只按是否处于弹窗场景区分：非弹窗场景不单独写 `size`，使用 Ant Design 默认尺寸；弹窗内输入类控件显式配置 `size="small"`，与下拉框尺寸保持一致。
- 业务编码统一使用 `{类型}_{随机11位数}` 格式；国标主表 code 使用 `STANDARD_随机11位数字`，国标类型列表 code 使用 `STANDARD_TYPE_随机11位数字`，点位类型列表 code 使用 `POINT_TYPE_随机11位数字`，地标类型列表 code 使用 `LANDMARK_TYPE_随机11位数字`；类型列表的 value 允许字母、数字、短横线和下划线，作为对应业务记录实际保存或生成编码使用的值；电话类国标 value 仍保留 `TEL_POLICE`、`TEL_FIRE`、`TEL_HOSPITAL`、`TEL_TRAFFIC_ACCIDENT` 等具体类型用于类型列表和筛选，国标条目 code 不再拼接类型 value。
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
