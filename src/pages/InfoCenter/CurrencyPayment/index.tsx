import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import {
  CURRENCY_PAYMENT_INFOS,
  type CurrencyPaymentInfoItem,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'

export default function CurrencyPaymentPage() {
  const language = useAuthStore(selectCurrentLanguage)

  const columns: ColumnsType<CurrencyPaymentInfoItem> = [
    {
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      title: <LanguageLabel langKey={language} labelKey="mobilePayment" />,
      dataIndex: 'mobilePayment',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.mobilePayment} />
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="creditCardPayment" />,
      dataIndex: 'creditCardPayment',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.creditCardPayment} />
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="tippingCulture" />,
      dataIndex: 'tippingCulture',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.tippingCulture} />
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={CURRENCY_PAYMENT_INFOS}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
