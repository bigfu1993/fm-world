import { Table, Tabs } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import {
  CURRENCY_PAYMENT_INFOS,
  SERVICE_INFOS,
  type CurrencyPaymentInfoItem,
  type ServiceInfoItem,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}

export default function ServiceInfoPage() {
  const language = useAuthStore(selectCurrentLanguage)

  const serviceColumns: ColumnsType<ServiceInfoItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="rentCarRules" />,
      dataIndex: 'rentCarRules',
      width: 420,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.rentCarRules} />
      ),
    },
  ]

  const currencyPaymentColumns: ColumnsType<CurrencyPaymentInfoItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="mobilePayment" />,
      dataIndex: 'mobilePayment',
      width: 260,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.mobilePayment} />
      ),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="creditCardPayment" />,
      dataIndex: 'creditCardPayment',
      width: 260,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.creditCardPayment} />
      ),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="tippingCulture" />,
      dataIndex: 'tippingCulture',
      width: 260,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.tippingCulture} />
      ),
    },
  ]

  return (
    <Tabs
      items={[
        {
          key: 'rent-car-rules',
          label: <LanguageLabel langKey={language} labelKey="rentCarRules" />,
          children: (
            <Table
              rowKey="id"
              columns={serviceColumns}
              dataSource={SERVICE_INFOS}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          ),
        },
        {
          key: 'currency-payment',
          label: <LanguageLabel langKey={language} labelKey="currencyPayment" />,
          children: (
            <Table
              rowKey="id"
              columns={currencyPaymentColumns}
              dataSource={CURRENCY_PAYMENT_INFOS}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          ),
        },
      ]}
    />
  )
}
