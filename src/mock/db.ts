import type { AdminUser, Permission, Role } from '@/types/system'

export const PERMISSIONS: Permission[] = [
  { code: 'dashboard:view', label: '查看首页', group: '仪表盘' },
  { code: 'admin:manage', label: '账号管理', group: '系统管理' },
  { code: 'role:manage', label: '角色管理', group: '系统管理' },
  { code: 'attraction:manage', label: '景点信息管理', group: '内容管理' },
  { code: 'transport:manage', label: '交通信息管理', group: '内容管理' },
  { code: 'culture:manage', label: '文化信息管理', group: '内容管理' },
]

export const roles: Role[] = [
  {
    id: 'role-super',
    name: '超级管理员',
    code: 'super',
    description: '拥有全部权限',
    permissions: PERMISSIONS.map((p) => p.code),
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'role-operator',
    name: '内容运营',
    code: 'operator',
    description: '负责景点/交通/文化信息的日常维护',
    permissions: ['dashboard:view', 'attraction:manage', 'transport:manage', 'culture:manage'],
    createdAt: '2026-06-01 10:00:00',
  },
]

export const adminUsers: (AdminUser & { password: string })[] = [
  {
    id: 'user-admin',
    username: 'admin',
    password: 'admin123',
    displayName: '系统管理员',
    email: 'admin@finger-more.com',
    roleIds: ['role-super'],
    languages: ['zh', 'en', 'ja', 'ko', 'th'],
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'user-operator',
    username: 'operator',
    password: 'operator123',
    displayName: '内容运营',
    email: 'operator@finger-more.com',
    roleIds: ['role-operator'],
    languages: ['en', 'ja'],
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
]

export function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}
