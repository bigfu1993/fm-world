import { Input, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { GLOBAL_LANGUAGES, type GlobalLanguage } from '@/mock/languages'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

export default function LanguagePage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')

  const columns: ColumnsType<GlobalLanguage> = [
    { title: <LanguageLabel langKey={language} labelKey="languageCode" />, dataIndex: 'code' },
    {
      title: <LanguageLabel langKey={language} labelKey="languageName" />,
      dataIndex: 'code',
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
  ]

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? GLOBAL_LANGUAGES.filter((item) =>
        Object.values(item).some((value) => value.toLowerCase().includes(keywordLower)),
      )
    : GLOBAL_LANGUAGES

  return (
    <>
      <Input
        placeholder={getLabel('searchByLanguageName', language)}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table rowKey="code" columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
    </>
  )
}
