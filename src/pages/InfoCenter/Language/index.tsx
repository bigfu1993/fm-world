import { Input, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import { GLOBAL_LANGUAGES, type GlobalLanguage } from '@/mock/languages'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import { renderTableEmptyPlaceholder } from '@/utils/table'

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}

export default function LanguagePage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')

  const columns: ColumnsType<GlobalLanguage> = [
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
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="value" />,
      key: 'value',
      width: 160,
      render: (_, record) => renderTableEmptyPlaceholder(record.localeCode),
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
    ? GLOBAL_LANGUAGES.filter((item) =>
        Object.values(item).some((value) =>
          value.toLowerCase().includes(keywordLower),
        ),
      )
    : GLOBAL_LANGUAGES

  return (
    <>
      <Input
        placeholder={getLabel('searchByLanguageName', language)}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        rowKey="code"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}
