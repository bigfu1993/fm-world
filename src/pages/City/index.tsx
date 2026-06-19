import { Select, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CITIES, type CityData } from '@/mock/cities'
import { COUNTRIES } from '@/mock/countries'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

export default function CityPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined)

  const countryOptions = Array.from(new Set(CITIES.map((c) => c.countryCode)))
    .map((code) => COUNTRIES.find((c) => c.code === code))
    .filter((c): c is NonNullable<typeof c> => !!c)
    .map((c) => ({ label: c[language] ?? c.en, value: c.code }))

  const columns: ColumnsType<CityData> = [
    {
      title: <LanguageLabel langKey={language} labelKey="country" />,
      dataIndex: 'countryCode',
      render: (countryCode: string) => {
        const country = COUNTRIES.find((c) => c.code === countryCode)
        return country ? <LanguageText langKey={language} map={country} /> : countryCode
      },
    },
    {
      title: <LanguageLabel langKey={language} labelKey="cityName" />,
      dataIndex: 'code',
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
  ]

  const dataSource = countryFilter
    ? CITIES.filter((c) => c.countryCode === countryFilter)
    : CITIES

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Select
          allowClear
          placeholder={getLabel('filterByCountry', language)}
          style={{ width: 200 }}
          value={countryFilter}
          onChange={setCountryFilter}
          options={countryOptions}
        />
      </Space>
      <Table rowKey="code" columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
    </>
  )
}
