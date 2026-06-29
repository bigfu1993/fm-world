import { Button, Divider, Input, Space, Table } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import {
  CURRENCY_INFOS,
  PAYMENT_METHOD_INFOS,
  type InformationItem,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import { renderTableEmptyPlaceholder } from '@/utils/table'
import CurrencyListModal, {
  PAYMENT_CURRENCY_LIST_THEME_COLOR,
} from './CurrencyListModal'

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}
const currencyListButtonStyle = {
  backgroundColor: PAYMENT_CURRENCY_LIST_THEME_COLOR,
  borderColor: PAYMENT_CURRENCY_LIST_THEME_COLOR,
}
const toolbarDividerStyle = {
  height: 24,
}

export default function PaymentInfoPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false)

  const columns: ColumnsType<InformationItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="code" />,
      dataIndex: 'code',
      width: 200,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="name" />,
      dataIndex: 'name',
      width: 280,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.name} />
      ),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="value" />,
      key: 'value',
      width: 220,
      render: (_, record) => renderTableEmptyPlaceholder(record.value),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="supplement" />,
      key: 'supplement',
      width: 160,
      render: () => renderTableEmptyPlaceholder(null),
    },
  ]

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? PAYMENT_METHOD_INFOS.filter((item) =>
        [item.code, item.value, ...Object.values(item.name)].some((value) =>
          value &&
          value.toLowerCase().includes(keywordLower),
        ),
      )
    : PAYMENT_METHOD_INFOS

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<UnorderedListOutlined />}
          onClick={() => setCurrencyModalOpen(true)}
          style={currencyListButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="currencyList" />
        </Button>
        <Divider type="vertical" style={toolbarDividerStyle} />
        <Input
          placeholder={getLabel('searchByPaymentMethod', language)}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          style={{ width: 260 }}
        />
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
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
