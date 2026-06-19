import { delay, genId, PERMISSIONS, roles } from '@/mock/db'
import type { Permission, Role } from '@/types/system'

export function listRoles(): Promise<Role[]> {
  return delay([...roles])
}

export function listPermissions(): Promise<Permission[]> {
  return delay([...PERMISSIONS])
}

export interface RoleFormData {
  name: string
  code: string
  description: string
  permissions: string[]
}

export function createRole(data: RoleFormData): Promise<Role> {
  if (roles.some((r) => r.code === data.code)) {
    return Promise.reject(new Error('角色编码已存在'))
  }
  const role: Role = {
    id: genId('role'),
    ...data,
    createdAt: new Date().toLocaleString('zh-CN'),
  }
  roles.push(role)
  return delay(role)
}

export function updateRole(id: string, data: RoleFormData): Promise<Role> {
  const role = roles.find((r) => r.id === id)
  if (!role) return Promise.reject(new Error('角色不存在'))
  Object.assign(role, data)
  return delay(role)
}

export function removeRole(id: string): Promise<void> {
  const index = roles.findIndex((r) => r.id === id)
  if (index === -1) return Promise.reject(new Error('角色不存在'))
  roles.splice(index, 1)
  return delay(undefined)
}
