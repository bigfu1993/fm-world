export interface Permission {
  code: string
  label: string
  group: string
}

export const LANGUAGES = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'th', label: 'ภาษาไทย' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

export interface Role {
  id: string
  name: string
  code: string
  description: string
  permissions: string[]
  createdAt: string
}

export interface AdminUser {
  id: string
  username: string
  displayName: string
  email: string
  roleIds: string[]
  languages: LanguageCode[]
  status: 'enabled' | 'disabled'
  createdAt: string
}

export interface CurrentUser {
  id: string
  username: string
  displayName: string
  permissions: string[]
  languages: LanguageCode[]
}
