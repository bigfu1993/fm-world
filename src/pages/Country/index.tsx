import { Input, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { COUNTRIES, type CountryData } from '@/mock/countries'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

export default function CountryPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')

  const columns: ColumnsType<CountryData> = [
    { title: <LanguageLabel langKey={language} labelKey="countryCode" />, dataIndex: 'code' },
    {
      title: <LanguageLabel langKey={language} labelKey="countryName" />,
      dataIndex: 'code',
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
  ]

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? COUNTRIES.filter((country) =>
        Object.values(country).some((value) => value.toLowerCase().includes(keywordLower)),
      )
    : COUNTRIES

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder={getLabel('searchByCountryName', language)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>
      <Table rowKey="code" columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
    </>
  )
}
