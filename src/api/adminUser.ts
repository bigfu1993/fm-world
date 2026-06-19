import { adminUsers, delay, genId } from '@/mock/db'
import type { AdminUser, LanguageCode } from '@/types/system'

export interface AdminUserListParams {
  username?: string
  page: number
  pageSize: number
}

export interface AdminUserListResult {
  list: AdminUser[]
  total: number
}

function toPublic(user: (typeof adminUsers)[number]): AdminUser {
  const { id, username, displayName, email, roleIds, languages, status, createdAt } = user
  return { id, username, displayName, email, roleIds, languages, status, createdAt }
}

export function listAdminUsers({ username, page, pageSize }: AdminUserListParams): Promise<AdminUserListResult> {
  const filtered = adminUsers.filter((u) =>
    username ? u.username.toLowerCase().includes(username.toLowerCase()) : true,
  )
  const start = (page - 1) * pageSize
  return delay({
    list: filtered.slice(start, start + pageSize).map(toPublic),
    total: filtered.length,
  })
}

export interface AdminUserFormData {
  username: string
  displayName: string
  email: string
  roleIds: string[]
  languages: LanguageCode[]
  password?: string
}

export function createAdminUser(data: AdminUserFormData): Promise<AdminUser> {
  if (adminUsers.some((u) => u.username === data.username)) {
    return Promise.reject(new Error('用户名已存在'))
  }
  const newUser = {
    id: genId('user'),
    username: data.username,
    password: data.password || '123456',
    displayName: data.displayName,
    email: data.email,
    roleIds: data.roleIds,
    languages: data.languages,
    status: 'enabled' as const,
    createdAt: new Date().toLocaleString('zh-CN'),
  }
  adminUsers.push(newUser)
  return delay(toPublic(newUser))
}

export function updateAdminUser(id: string, data: Omit<AdminUserFormData, 'password'>): Promise<AdminUser> {
  const user = adminUsers.find((u) => u.id === id)
  if (!user) return Promise.reject(new Error('账号不存在'))
  Object.assign(user, data)
  return delay(toPublic(user))
}

export function removeAdminUser(id: string): Promise<void> {
  const index = adminUsers.findIndex((u) => u.id === id)
  if (index === -1) return Promise.reject(new Error('账号不存在'))
  adminUsers.splice(index, 1)
  return delay(undefined)
}

export function toggleAdminUserStatus(id: string): Promise<AdminUser> {
  const user = adminUsers.find((u) => u.id === id)
  if (!user) return Promise.reject(new Error('账号不存在'))
  user.status = user.status === 'enabled' ? 'disabled' : 'enabled'
  return delay(toPublic(user))
}

export function resetAdminUserPassword(id: string, password: string): Promise<void> {
  const user = adminUsers.find((u) => u.id === id)
  if (!user) return Promise.reject(new Error('账号不存在'))
  user.password = password
  return delay(undefined)
}
