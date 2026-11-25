#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { closeSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createServer, isIP } from 'node:net'
import { constants } from 'node:os'
import { resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const root = fileURLToPath(new URL('../', import.meta.url))
const usage = '用法：node scripts/run.mjs [dev|test] [front-end|back-end|all] [--config 路径]'
const active = new Set()
const locks = []
let stopping

function readAddress(settings, key) {
  const { host, port } = settings[key] ?? {}
  if (typeof host !== 'string' || (!isIP(host) && !/^[a-z\d][a-z\d.-]*$/i.test(host))) {
    throw new Error(`${key}.host 必须是主机名或 IP 地址`)
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`${key}.port 必须是 1 到 65535 之间的整数`)
  }
  return { host, port }
}

function readCommand(command, key) {
  if (command == null) throw new Error(`${key} 尚未配置，请填写可执行命令及参数`)
  if (!Array.isArray(command) || !command.length || !command.every((argument) => typeof argument === 'string') || !command[0].trim()) {
    throw new Error(`${key} 必须是命令和参数组成的字符串数组`)
  }
  return command
}

function apiBaseUrl(configured, backend) {
  if (configured === undefined) {
    let { host } = backend
    if (host === '0.0.0.0') host = '127.0.0.1'
    if (host === '::') host = '::1'
    return `http://${isIP(host) === 6 ? `[${host}]` : host}:${backend.port}/api`
  }

  const url = typeof configured === 'string' && URL.canParse(configured) && new URL(configured)
  if (!url || !['http:', 'https:'].includes(url.protocol) || url.username || url.password || /[?#]/.test(configured)) {
    throw new Error('front-end.apiBaseUrl 必须是 HTTP 或 HTTPS 绝对地址，且不能包含凭据、查询或片段')
  }
  return url.href
}

function readServices(configPath, environment, target) {
  const config = JSON.parse(readFileSync(configPath, 'utf8'))
  const settings = config?.[environment]
  if (!settings || typeof settings !== 'object') throw new Error(`运行配置缺少 ${environment} 环境`)

  const backend = readAddress(settings, 'back-end')
  const services = []

  if (target !== 'back-end') {
    const { host, port } = readAddress(settings, 'front-end')
    services.push({
      name: 'front-end', host, port,
      install: ['npm', 'ci', '--include=dev', '--no-audit', '--no-fund'],
      start: ['npm', 'run', 'dev', '--', '--mode', environment === 'dev' ? 'development' : 'test', '--host', host, '--port', String(port), '--strictPort'],
      env: { VITE_API_BASE_URL: apiBaseUrl(settings['front-end'].apiBaseUrl, backend) },
    })
  }

  if (target !== 'front-end') {
    const { install, start } = settings['back-end']
    const startCommand = readCommand(start, 'back-end.start')
    services.push({
      name: 'back-end', ...backend,
      install: install === null ? null : readCommand(install, 'back-end.install'),
      start: startCommand,
      env: { HOST: backend.host, PORT: String(backend.port) },
    })
  }

  return services.map((service) => ({
    ...service,
    cwd: resolve(root, service.name),
    env: { ...process.env, APP_ENV: environment, ...service.env },
  }))
}

/** 在安装前独占服务目录，防止两个启动器同时重建同一份依赖。 */
function lockService(service) {
  const path = resolve(service.cwd, '.run.lock.local')
  let fd
  try {
    fd = openSync(path, 'wx')
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error(`${service.name} 已被运行脚本占用，请检查 ${path}`)
    }
    throw error
  }
  locks.push(path)
  try {
    writeFileSync(fd, `${process.pid}\n`)
  } finally {
    closeSync(fd)
  }
}

function addressesOverlap(first, second) {
  if (first.port !== second.port) return false
  const hosts = [first.address, second.address]
  if (first.address === second.address || hosts.includes('::')) return true
  return hosts.includes('0.0.0.0') && hosts.every((host) => isIP(host) === 4 || host.startsWith('::ffff:'))
}

/** 同时探测监听地址，并检测操作系统允许绑定但覆盖范围重叠的地址。 */
async function checkListenAddresses(services) {
  const servers = []
  try {
    for (const { name, host, port } of services) {
      const server = createServer((socket) => socket.destroy())
      await new Promise((resolve, reject) => {
        server.once('error', (error) => {
          reject(new Error(`${name} 无法监听 ${host}:${port}（${error.message}）`, { cause: error }))
        })
        server.listen({ host, port }, resolve)
      })
      const previous = servers[0]?.address()
      servers.push(server)
      if (previous && addressesOverlap(previous, server.address())) {
        throw new Error(`${name} 无法监听 ${host}:${port}（EADDRINUSE：与另一个服务的监听范围重叠）`)
      }
    }
  } finally {
    await Promise.all(servers.map((server) => new Promise((resolve) => server.close(resolve))))
  }
}

function startCommand(service, command, action) {
  const label = `${service.name} ${action}`
  const [program, ...args] = command
  console.log(`[run] ${label}`)
  const child = spawn(program, args, {
    cwd: service.cwd,
    env: service.env,
    detached: true,
    stdio: 'inherit',
  })
  const job = { child, label }
  job.done = new Promise((resolve) => {
    child.once('error', (error) => resolve({ job, code: 1, reason: error.message }))
    child.once('exit', (code, signal) => resolve({
      job,
      code: code ?? (128 + constants.signals[signal]),
      reason: signal ?? `退出码 ${code}`,
    }))
  })
  active.add(job)
  return job
}

/** 以 POSIX 进程组为单位停止服务，包含 npm 或后端命令派生的进程。 */
function signalGroup({ child }, signal) {
  if (!child.pid) return false
  try {
    process.kill(-child.pid, signal)
    return true
  } catch (error) {
    if (error.code === 'ESRCH') return false
    throw error
  }
}

function stop(code) {
  if (stopping) return stopping
  process.exitCode = code
  stopping = (async () => {
    const jobs = [...active]
    for (const job of jobs) signalGroup(job, 'SIGTERM')
    const deadline = Date.now() + 3000
    while (Date.now() < deadline && jobs.some((job) => signalGroup(job, 0))) await delay(50)
    for (const job of jobs) signalGroup(job, 'SIGKILL')
    await Promise.all(jobs.map((job) => job.done))
  })()
  return stopping
}

function assertSuccess({ job, code, reason }) {
  if (code === 0) return
  throw Object.assign(new Error(`${job.label}失败（${reason}）`), { exitCode: code })
}

async function run() {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: { config: { type: 'string' }, help: { type: 'boolean', short: 'h' } },
  })
  if (values.help) return console.log(usage)
  const [environment = 'dev', target = 'front-end'] = positionals
  if (!['dev', 'test'].includes(environment) || !['front-end', 'back-end', 'all'].includes(target) || positionals.length > 2) {
    throw new Error(usage)
  }
  if (process.platform === 'win32') throw new Error('运行脚本需要支持 POSIX 进程组的系统')

  const configPath = values.config ? resolve(values.config) : resolve(root, 'config/run.json')
  const services = readServices(configPath, environment, target)
  for (const service of services) lockService(service)
  await checkListenAddresses(services)

  // 各服务依赖都准备好后才启动，避免安装失败时只运行了一半。
  for (const service of services) {
    if (stopping) return
    if (!service.install) continue
    const job = startCommand(service, service.install, '同步依赖')
    const result = await job.done
    if (stopping) return
    assertSuccess(result)
    active.delete(job)
  }
  if (stopping) return

  const jobs = services.map((service) => startCommand(service, service.start, '启动'))
  const result = await Promise.race(jobs.map((job) => job.done))
  if (stopping) return
  assertSuccess(result)
  await stop(0)
}

process.on('SIGINT', () => { void stop(130) })
process.on('SIGTERM', () => { void stop(143) })

try {
  await run()
} catch (error) {
  console.error(`[run] ${error.message}`)
  await stop(error.exitCode ?? 1)
} finally {
  await stopping
  for (const path of locks) rmSync(path, { force: true })
}
