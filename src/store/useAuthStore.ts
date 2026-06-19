import { create } from 'zustand'
import type { CurrentUser, LanguageCode } from '@/types/system'

interface AuthState {
  token: string | null
  user: CurrentUser | null
  currentLanguage: LanguageCode
  login: (token: string, user: CurrentUser) => void
  logout: () => void
  hasPermission: (code: string) => boolean
  setCurrentLanguage: (language: LanguageCode) => void
}

function readUser(): CurrentUser | null {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}

function readCurrentLanguage(user: CurrentUser | null): LanguageCode {
  const stored = localStorage.getItem('currentLanguage') as LanguageCode | null
  if (stored && user?.languages?.includes(stored)) return stored
  return user?.languages?.[0] ?? 'zh'
}

export const useAuthStore = create<AuthState>((set, get) => {
  const initialUser = readUser()
  return {
    token: localStorage.getItem('token'),
    user: initialUser,
    currentLanguage: readCurrentLanguage(initialUser),
    login: (token, user) => {
      const currentLanguage = user.languages[0] ?? 'zh'
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('currentLanguage', currentLanguage)
      set({ token, user, currentLanguage })
    },
    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('currentLanguage')
      set({ token: null, user: null, currentLanguage: 'zh' })
    },
    hasPermission: (code) => get().user?.permissions.includes(code) ?? false,
    setCurrentLanguage: (language) => {
      if (!get().user?.languages.includes(language)) return
      localStorage.setItem('currentLanguage', language)
      set({ currentLanguage: language })
    },
  }
})

export function selectCurrentLanguage(state: AuthState): LanguageCode {
  return state.currentLanguage
}
