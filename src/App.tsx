import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, type ThemeConfig } from 'antd'
import { router } from './router'
import { ANTD_LOCALES } from './i18n/antdLocale'
import { useAuthStore, selectCurrentLanguage } from './store/useAuthStore'
import { getCurrentUser } from './api/auth'
import { GlobalLanguageProvider } from './context/GlobalLanguageContext'

const CONTROL_FONT_SIZE = 12

const antdTheme: ThemeConfig = {
  components: {
    Input: {
      fontSize: CONTROL_FONT_SIZE,
      inputFontSize: CONTROL_FONT_SIZE,
      inputFontSizeLG: CONTROL_FONT_SIZE,
      inputFontSizeSM: CONTROL_FONT_SIZE,
    },
    InputNumber: {
      fontSize: CONTROL_FONT_SIZE,
      inputFontSize: CONTROL_FONT_SIZE,
      inputFontSizeLG: CONTROL_FONT_SIZE,
      inputFontSizeSM: CONTROL_FONT_SIZE,
    },
    Select: {
      fontSize: CONTROL_FONT_SIZE,
      optionFontSize: CONTROL_FONT_SIZE,
    },
  },
}

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
    <ConfigProvider locale={ANTD_LOCALES[language]} theme={antdTheme}>
      <GlobalLanguageProvider>
        <RouterProvider router={router} />
      </GlobalLanguageProvider>
    </ConfigProvider>
  )
}

export default App
