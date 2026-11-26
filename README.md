# finger-more-admin

fm后台系统

alysha_rationeiaa@mail.com

## 首版开发入口

从首版实施方案进入，第 09 节规定开发顺序与各阶段门槛。开工前先查阅对应设计与验收条款。 [首版实施方案](docs/全球旅游后台首版实施方案.md) · [项目开发指引](AGENTS.md)

## 目录结构

- [`front-end/`](front-end/)　管理端前端，包含源码、静态资源、依赖和工具配置。
- [`back-end/`](back-end/)　预留给后续后台服务代码。
- [`docs/`](docs/)　首版规格和现有原型资料。

## 启动服务

在 macOS 或 Linux 上，从仓库根目录用 Node.js 运行。省略参数时启动 `dev` 前端。

```bash
node scripts/run.mjs dev front-end
node scripts/run.mjs test front-end
```

环境和监听地址由 [`config/run.json`](config/run.json) 定义。`--config` 可指定同格式的配置文件，相对路径从执行命令的目录计算。

| 环境 | 前端 | 后端 |
| --- | --- | --- |
| `dev` | `http://127.0.0.1:5173` | `http://127.0.0.1:8080` |
| `test` | `http://127.0.0.1:5174` | `http://127.0.0.1:8081` |

启动器每次先同步选中服务的依赖。前端执行 `npm ci`，按 `package-lock.json` 安装，版本更新在锁文件中单独维护。`all` 模式等两端依赖命令成功后再启动服务。按 `Ctrl+C` 停止本次启动的进程。

当前后端仅有占位目录，默认配置中的 `install` 和 `start` 在管理后台服务端 M0 接入。接入后可使用 `node scripts/run.mjs test back-end` 或 `node scripts/run.mjs dev all`。命令在 `back-end/` 内执行，`start` 以前台进程运行，后端通过 `APP_ENV`、`HOST`、`PORT` 读取环境和监听地址。 [M0 环境契约](docs/全球旅游后台首版开发规格.md#06-环境命令迁移与部署)

当前原型的前端默认将后端地址加上 `/api` 作为 `VITE_API_BASE_URL`，也接受显式填写完整 API 地址。接入 M0 后，同源入口按环境规格配置。 [默认代理与会话契约](docs/全球旅游后台首版开发规格.md#04-登录授权与内容保存)

每个服务目录中的 `.run.lock.local` 记录启动器进程号。若启动器被强制结束并留下锁文件，确认启动器和对应服务均已退出后再清理该文件。
