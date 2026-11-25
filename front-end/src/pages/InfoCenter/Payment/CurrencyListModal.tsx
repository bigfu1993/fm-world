import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import DraggableModal from '@/components/DraggableModal'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import type { CurrencyInfoItem } from '@/mock/information'
import type { LanguageCode } from '@/types/system'
import { renderTableEmptyPlaceholder } from '@/utils/table'

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}

export const PAYMENT_CURRENCY_LIST_THEME_COLOR = '#52c41a'

interface CurrencyListModalProps {
  open: boolean
  language: LanguageCode
  currencies: CurrencyInfoItem[]
  onCancel: () => void
}

export default function CurrencyListModal({
  open,
  language,
  currencies,
  onCancel,
}: CurrencyListModalProps) {
  const columns: ColumnsType<CurrencyInfoItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="code" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="name" />,
      dataIndex: 'name',
      width: 220,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.name} />
      ),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="value" />,
      key: 'value',
      width: 140,
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

  return (
    <DraggableModal
      title={<LanguageLabel langKey={language} labelKey="currencyList" />}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={860}
      themeColor={PAYMENT_CURRENCY_LIST_THEME_COLOR}
    >
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={currencies}
        pagination={{ pageSize: 10, showSizeChanger: true }}
      />
    </DraggableModal>
  )
}
