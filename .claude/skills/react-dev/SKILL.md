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

## 其他

- 默认不写注释，除非是解释非显而易见的约束或边界情况。
- 不要引入 Redux、MobX 等其他状态管理方案，保持 zustand 单一方案。
