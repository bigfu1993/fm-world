import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { router } from './router'
import { ANTD_LOCALES } from './i18n/antdLocale'
import { useAuthStore, selectCurrentLanguage } from './store/useAuthStore'
import { getCurrentUser } from './api/auth'
import { GlobalLanguageProvider } from './context/GlobalLanguageContext'

function App() {
  const language = useAuthStore(selectCurrentLanguage)
  const userId = useAuthStore((s) => s.user?.id)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)

  useEffect(() => {
    if (!userId) return
    getCurrentUser(userId).then(setUser).catch(() => logout())
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only refresh once on mount
  }, [])

  return (
    <ConfigProvider locale={ANTD_LOCALES[language]}>
      <GlobalLanguageProvider>
        <RouterProvider router={router} />
      </GlobalLanguageProvider>
    </ConfigProvider>
  )
}

export default App
