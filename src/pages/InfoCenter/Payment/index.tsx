import { Button } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import LanguageLabel from '@/components/LanguageLabel'
import {
  CURRENCY_INFOS,
  PAYMENT_METHOD_INFOS,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'
import CurrencyListModal, {
  PAYMENT_CURRENCY_LIST_THEME_COLOR,
} from './CurrencyListModal'

const currencyListButtonStyle = {
  backgroundColor: PAYMENT_CURRENCY_LIST_THEME_COLOR,
  borderColor: PAYMENT_CURRENCY_LIST_THEME_COLOR,
}

export default function PaymentInfoPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false)

  return (
    <>
      <SimpleInformationPage
        initialItems={PAYMENT_METHOD_INFOS}
        codePrefix="PAYMENT"
        editTitleLabelKey="editPaymentInformation"
        toolbarExtra={
          <Button
            type="primary"
            icon={<UnorderedListOutlined />}
            onClick={() => setCurrencyModalOpen(true)}
            style={currencyListButtonStyle}
          >
            <LanguageLabel langKey={language} labelKey="currencyList" />
          </Button>
        }
      />
      <CurrencyListModal
        open={currencyModalOpen}
        language={language}
        currencies={CURRENCY_INFOS}
        onCancel={() => setCurrencyModalOpen(false)}
      />
    </>
  )
}
