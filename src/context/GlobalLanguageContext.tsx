import { createContext } from 'react'
import type { ReactNode } from 'react'
import { GLOBAL_LANGUAGES, type GlobalLanguage } from '@/mock/languages'

const GlobalLanguageContext = createContext<GlobalLanguage[]>(GLOBAL_LANGUAGES)

export function GlobalLanguageProvider({ children }: { children: ReactNode }) {
  return (
    <GlobalLanguageContext.Provider value={GLOBAL_LANGUAGES}>
      {children}
    </GlobalLanguageContext.Provider>
  )
}

export function useGlobalLanguages(): GlobalLanguage[] {
  return useContext(GlobalLanguageContext)
}
