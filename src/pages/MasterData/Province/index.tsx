import { Input, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PROVINCES, type Province } from '@/mock/provinces'
import { COUNTRIES } from '@/mock/countries'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

export default function ProvincePage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')

  const columns: ColumnsType<Province> = [
    {
      title: <LanguageLabel langKey={language} labelKey="countryName" />,
      dataIndex: 'countryCode',
      render: (countryCode: string) => {
        const country = COUNTRIES.find((c) => c.code === countryCode)
        return country ? <LanguageText langKey={language} map={country} /> : countryCode
      },
    },
    {
      title: <LanguageLabel langKey={language} labelKey="provinceName" />,
      dataIndex: 'code',
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
  ]

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? PROVINCES.filter((province) => {
        const country = COUNTRIES.find((c) => c.code === province.countryCode)
        return [...Object.values(province), ...(country ? Object.values(country) : [])].some(
          (value) => value.toLowerCase().includes(keywordLower),
        )
      })
    : PROVINCES

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder={getLabel('searchByProvinceName', language)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 220 }}
        />
      </Space>
      <Table rowKey="code" columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
    </>
  )
}
