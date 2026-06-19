import { adminUsers, delay, roles } from '@/mock/db'
import type { CurrentUser } from '@/types/system'

interface LoginParams {
  username: string
  password: string
}

interface LoginResult {
  token: string
  user: CurrentUser
}

export function login({ username, password }: LoginParams): Promise<LoginResult> {
  const user = adminUsers.find((u) => u.username === username)
  if (!user || user.password !== password) {
    return Promise.reject(new Error('用户名或密码错误'))
  }
  if (user.status === 'disabled') {
    return Promise.reject(new Error('账号已被禁用，请联系管理员'))
  }
  const userRoles = roles.filter((r) => user.roleIds.includes(r.id))
  const permissions = Array.from(new Set(userRoles.flatMap((r) => r.permissions)))
  return delay({
    token: `mock-token-${user.id}`,
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      permissions,
      languages: user.languages,
    },
  })
}
