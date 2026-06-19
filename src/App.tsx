import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { router } from './router'
import { ANTD_LOCALES } from './i18n/antdLocale'
import { useAuthStore, selectCurrentLanguage } from './store/useAuthStore'

function App() {
  const language = useAuthStore(selectCurrentLanguage)

  return (
    <ConfigProvider locale={ANTD_LOCALES[language]}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
