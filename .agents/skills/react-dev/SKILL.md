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
- 货币不再作为信息中心独立模块注册菜单、页面和权限入口；旧 `/info-center/currencies` 路由仅保留跳转到 `/info-center/payment`。货币数据 `CURRENCY_INFOS` 迁移到支付模块内的“货币列表”弹窗中展示，并继续作为国家信息绑定弹窗中“货币”项的数据来源。
- 支付模块归属信息中心，路由使用 `/info-center/payment`，主列表维护独立支付方式 `PAYMENT_METHOD_INFOS`；支付方式 code 统一使用 `PAYMENT_随机11位数字`，value 保存具体支付方式标识，例如 `CASH`、`CREDIT_CARD`；页面内通过“货币列表”绿色按钮打开内嵌弹窗展示 `CURRENCY_INFOS`，用于查看币种基础数据。
- 信息中心模块按数据结构分为三类：语言是单维度基础字典，使用独立语言管理页；时区、气候、入境政策、海关禁限、网络、交通规则、驾照要求、服务平台、交通和支付方式属于单维度资料，统一复用 `src/pages/InfoCenter/SimpleInformationPage.tsx`，列表列为 `code / 名称 / value / 补充 / 操作`；国标、文化、旅游资料属于多维度类型资料，参考“国标”模式维护类型列表和类型下条目；注意事项属于复合风险资料，保留安全概况、风险区域、夜间逗留时间等多列结构。
- 国家信息绑定弹窗中“文化”列参考国标内容逻辑渲染：从 `CULTURE_INFOS` 动态归并类型，以每个类型作为表单项标题，选项为该类型下的具体文化项目，并通过 `cultureInfoIds[typeKey]` 保存多选结果。小费文化不作为独立字段或独立类型维护，而是“习俗”类型下的一条具体文化项目。
- 国家信息绑定数据不再只放在国家管理页局部状态中，统一通过 `src/store/useCountryInfoBindingStore.ts` 保存 `displayZoomByCode` 与 `infoBindingByCode`，供国家管理页和发布中心共享，保证“信息中心录入 -> 基础数据绑定 -> 发布中心发布校验”主链路贯通。
- 旅游资料模块归属信息中心，路由使用 `/info-center/tourism-info`，权限 code 使用 `tourismInfo:manage`；数据源 `TOURISM_INFOS` 按 `level + typeValue` 维护省份、城市、点位、地标各层级专属旅游资料，页面支持层级筛选、类型筛选、新建和编辑。基础数据页不得直接录入这些资料正文，只能通过资料 id 做绑定。
- 省份、城市、点位、地标的信息绑定统一通过 `src/store/useTourismInfoBindingStore.ts` 保存，编辑弹窗复用 `src/components/TourismInfoBindingModal`，字段类型以信息中心旅游资料下拉/多选为主，少量停留天数、游玩分钟等本体数值可直接维护。省份和城市不单独维护交通正文，交通统一绑定信息中心“交通”模块；省份只维护跨城市共享的区域级资料，按区域地貌、文化圈层、遗产集群、风味体系、季节活动五个维度绑定旅游资料；城市只维护城市内体验资料，按城市街区、城市生活、餐饮场景、城市遗产、城市活动五个维度绑定旅游资料；点位绑定开放、票务、预约、设施、到达、无障碍、拥挤提示；地标绑定讲解、参观动线、拍摄、排队、最佳时段、文化解读。下级不能重复维护国家级、上级或信息中心已有通用资料。
- 基础数据各模块的信息绑定均需区分“统一资料绑定”和“当前对象补充”：绑定项优先从信息中心统一维护的数据中选择，只保存 id；每个国家、省份、城市、点位、地标额外提供 `customSupplement` 自定义多语言补充，用于记录该对象特有、无法沉淀为统一资料的说明，不作为跨对象标准资料来源。
- 国家信息绑定弹窗为五列布局，第一列和第二列在基础等宽列宽上各收窄 `80px`；第一列为“基本信息”，包含国家编码、名称、语言、货币、时区、气候和可见倍率，其中可见倍率固定为基本信息最后一项；时区来自 `TIMEZONE_INFOS`，气候来自 `CLIMATE_INFOS`；第五列包含“注意事项”和“安全”两个独立二级模块，注意事项来自 `SECURITY_RISK_INFOS`，安全承载食品、水、治安 3 个维度的 Slider，Slider 宽度比容器收窄 `60px` 并左右居中，标记主文案字号为 `10px`。
- 国家信息绑定弹窗第三列为“入境信息”，包含入境政策、海关禁限、通讯、网络、支付、交通规则、驾照；入境政策来自 `ENTRY_POLICY_INFOS`，海关禁限来自 `CUSTOMS_RESTRICTION_INFOS`，通讯来自 `COMMUNICATION_INFOS`，网络来自 `NETWORK_INFOS`，支付来自 `PAYMENT_METHOD_INFOS` 且支持多选，交通规则来自 `TRAFFIC_RULE_INFOS` 并使用一行排列的 Radio 维护通行方向，驾照来自 `DRIVING_LICENSE_INFOS`。
- 交通模块归属信息中心，菜单名使用“交通”，路由使用 `/info-center/traffic`；交通 mock 维护飞机、铁路、巴士、地铁、公交、出租、互联网出租、租车、电动车、自行车、摩托车、私人协议 12 类，code 统一使用 `TRAFFIC_随机11位数字`，具体交通方式前缀维护在 value 列，例如 `AIRPLANE`、`RAILWAY`、`PRIVATE_AGREEMENT`。
- 服务信息模块已整合废弃：租车规范沉淀到交通/驾照相关资料，货币支付沉淀到支付模块，`/info-center/service-info` 仅作为旧路由跳转到 `/info-center/traffic`，不再注册菜单和权限入口。
- 文化模块归属信息中心，菜单位于国标之后，路由使用 `/info-center/culture`，旧 `/info-center/culture-customs` 仅保留跳转；权限 code 使用 `cultureInfo:manage`，避免和内容管理的 `culture:manage` 混用。页面参考国标内容维护逻辑，主列表列为 `code / 类型 / 名称 / value / 补充 / 操作`，支持类型列表、新建、类型筛选、关键词搜索和编辑；类型列表初始仅包含文化、习俗、宗教，类型 code 使用 `CULTURE_TYPE_随机11位数字`，主表 code 使用 `CULTURE_随机11位数字`。每一种类型下可以维护多条具体项目，小费文化属于习俗类型的一条具体项目。
- 注意事项模块归属信息中心，对外菜单名使用“注意事项”，内部路由保留 `/info-center/security-risk`，权限 code 保留 `securityRisk:manage`。
- 发布中心提交发布前必须通过基础完整性检查：层级对象需存在必要 Geo/坐标数据，国家发布还需检查国家信息绑定中的语言、货币、时区、气候、国标、入境政策、海关禁限、通讯、网络、支付、交通规则、驾照、注意事项、文化和安全维度；省份检查区域特色维度至少绑定一项，并检查是否绑定信息中心交通模块；城市检查城市特色维度至少绑定一项，并检查是否绑定信息中心交通模块；点位检查开放提示、设施服务、到达方式；地标检查讲解信息、参观动线、文化解读。检查未通过时禁用发布按钮并展示阻塞原因。
- 紧急处理模块已从信息中心移除，不再注册菜单、路由和权限入口。
- 点位类型管理归属点位管理页内，地标类型管理归属地标管理页内，通过页面内“类型列表”弹窗维护，不再注册信息中心独立菜单、路由和权限入口；类型列表列统一为 `code / name / value`，code 为类型记录业务编码，name 为多语言类型名称，value 为点位/地标记录实际保存和匹配的业务类型值。
- 语言、支付、交通列表数据列统一为 `code / 名称 / value / 补充`；支付模块内嵌货币列表同样使用 `code / 名称 / value / 补充`；国标和文化列表数据列统一为 `code / 类型 / 名称 / value / 补充`。语言列表 value 展示国际通用语言标识 `localeCode`，货币列表 value 展示 ISO 4217 三字母币种标识，支付列表 value 展示支付方式标识，交通的 value 展示具体交通方式前缀，国标的名称展示原“标准”列内容，文化的名称展示内容名称；语言、货币、支付、国标、文化的补充和国标 value 暂无业务数据时按表格空值规范显示 `-`；电话类国标名称统一展示为“国际区号前缀 + 本地号码”，例如 `+86 110`；国标和文化弹窗需同步维护名称与补充；类型列表列统一为 `code / name / value`，code 为类型记录业务编码，name 为多语言类型名称，value 为对应条目编码前缀或类型标识。

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
- Modal 内的按钮、下拉、输入框、表格统一使用小一号尺寸：`<Form>` 加 `size="small"`，弹窗内 `Select`、`Input`、`InputNumber`、自定义 `Button` 和 `Table` 显式加 `size="small"`，Modal 默认 footer 按钮通过 `okButtonProps={{ size: 'small' }}` 和 `cancelButtonProps={{ size: 'small' }}` 配置；弹窗内 `Form.Item` 间距通过全局样式覆盖为 `14px`，比 Ant Design 默认 `24px` 缩小 `10px`。
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
