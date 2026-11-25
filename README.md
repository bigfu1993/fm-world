# finger-more-admin

fm后台系统

alysha_rationeiaa@mail.com

## 目录结构

- [`front-end/`](front-end/)　管理端前端，包含源码、静态资源、依赖和工具配置。
- [`back-end/`](back-end/)　预留给后续后台服务代码。
- [`docs/`](docs/)　项目文档，具体模块见[项目架构与核心模块](docs/项目架构与核心模块.md)。

## 启动服务

在 macOS 或 Linux 上，从仓库根目录用 Node.js 运行。省略参数时启动 `dev` 前端。

```bash
node scripts/run.mjs dev front-end
node scripts/run.mjs test back-end
node scripts/run.mjs dev all
node scripts/run.mjs test all --config /path/to/run.json
```

环境和监听地址由 [`config/run.json`](config/run.json) 定义。`--config` 可指定同格式的配置文件，相对路径从执行命令的目录计算。

| 环境 | 前端 | 后端 |
| --- | --- | --- |
| `dev` | `http://127.0.0.1:5173` | `http://127.0.0.1:8080` |
| `test` | `http://127.0.0.1:5174` | `http://127.0.0.1:8081` |

启动器每次先同步选中服务的依赖。前端执行 `npm ci`，按 `package-lock.json` 安装，版本更新在锁文件中单独维护。`all` 模式等两端依赖命令成功后再启动服务。按 `Ctrl+C` 停止本次启动的进程。

后端代码接入后，在对应环境的 `back-end` 中填写 `install` 和 `start`。值是命令和参数数组，例如 npm 后端可用 `["npm", "ci"]` 和 `["npm", "run", "dev"]`。如果后端无需同步依赖，设置 `install: null`。命令在 `back-end/` 内执行，`start` 应以前台进程运行，后端通过 `APP_ENV`、`HOST`、`PORT` 读取所选环境和监听地址。

前端默认将后端地址加上 `/api` 作为 `VITE_API_BASE_URL`。对外访问时，可在对应环境的 `front-end.apiBaseUrl` 填写浏览器可访问的完整 API 地址。前后端跨域时，后端需允许该前端来源。

每个服务目录中的 `.run.lock.local` 记录启动器进程号。若启动器被强制结束并留下锁文件，确认启动器和对应服务均已退出后再清理该文件。
