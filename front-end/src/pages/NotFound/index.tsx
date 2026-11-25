import { Button, Result, Space } from 'antd'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

const REDIRECT_SECONDS = 3

export default function NotFoundPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    if (seconds <= 0) {
      navigate('/dashboard', { replace: true })
      return
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds, navigate])

  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <Space direction="vertical">
          <span>{getLabel('pageNotFoundSubTitle', language)}</span>
          <span>{getLabel('redirectingToHomeIn', language).replace('{{seconds}}', String(seconds))}</span>
        </Space>
      }
      extra={
        <Button type="primary" onClick={() => navigate('/dashboard', { replace: true })}>
          <LanguageLabel langKey={language} labelKey="backToHome" />
        </Button>
      }
    />
  )
}
