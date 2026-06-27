import { Input, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import {
  INTERCITY_TRAFFIC_INFOS,
  type InformationItem,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import { renderTableEmptyPlaceholder } from '@/utils/table'

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}

export default function TrafficInfoPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')

  const columns: ColumnsType<InformationItem> = [
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
      width: 160,
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
    ? INTERCITY_TRAFFIC_INFOS.filter((item) =>
        [item.code, item.value, ...Object.values(item.name)].some((value) =>
          value &&
          value.toLowerCase().includes(keywordLower),
        ),
      )
    : INTERCITY_TRAFFIC_INFOS

  return (
    <>
      <Input
        placeholder={getLabel('searchByTrafficName', language)}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}
