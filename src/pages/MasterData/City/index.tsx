import { Input, InputNumber, Select, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CITIES, type CityData } from '@/mock/cities'
import { COUNTRIES } from '@/db/countries'
import { PROVINCES } from '@/db/provinces'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

const DEFAULT_DISPLAY_ZOOM = 8
const MIN_DISPLAY_ZOOM = 0.8
const MAX_DISPLAY_ZOOM = 100
const DISPLAY_ZOOM_TEXT_COLOR = '#1677ff'

interface EditingDisplayZoom {
  code: string
  value: number | null
}

export default function CityPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined)
  const [keyword, setKeyword] = useState('')
  const [displayZoomByCode, setDisplayZoomByCode] = useState<Record<string, number>>({})
  const [editingDisplayZoom, setEditingDisplayZoom] = useState<EditingDisplayZoom | null>(null)

  const getDisplayZoom = (code: string) => displayZoomByCode[code] ?? DEFAULT_DISPLAY_ZOOM

  const commitDisplayZoomEdit = () => {
    if (!editingDisplayZoom) return
    const value = editingDisplayZoom.value ?? DEFAULT_DISPLAY_ZOOM
    const nextValue = Math.min(MAX_DISPLAY_ZOOM, Math.max(MIN_DISPLAY_ZOOM, value))
    setDisplayZoomByCode((prev) => ({
      ...prev,
      [editingDisplayZoom.code]: nextValue,
    }))
    setEditingDisplayZoom(null)
  }

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
      title: <LanguageLabel langKey={language} labelKey="province" />,
      dataIndex: 'provinceCode',
      render: (provinceCode: string) => {
        const province = PROVINCES.find((p) => p.code === provinceCode)
        return province ? <LanguageText langKey={language} map={province} /> : provinceCode
      },
    },
    {
      title: <LanguageLabel langKey={language} labelKey="cityName" />,
      dataIndex: 'code',
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
    {
      title: (
        <span style={{ whiteSpace: 'nowrap' }}>
          <LanguageLabel langKey={language} labelKey="displayZoom" />
        </span>
      ),
      key: 'displayZoom',
      width: 160,
      render: (_, record) =>
        editingDisplayZoom?.code === record.code ? (
          <InputNumber
            autoFocus
            min={MIN_DISPLAY_ZOOM}
            max={MAX_DISPLAY_ZOOM}
            step={0.1}
            value={editingDisplayZoom.value}
            onChange={(value) =>
              setEditingDisplayZoom((prev) =>
                prev ? { ...prev, value: typeof value === 'number' ? value : null } : prev,
              )
            }
            onBlur={commitDisplayZoomEdit}
            onPressEnter={commitDisplayZoomEdit}
            style={{ width: 104 }}
          />
        ) : (
          <span
            onClick={() =>
              setEditingDisplayZoom({
                code: record.code,
                value: getDisplayZoom(record.code),
              })
            }
            style={{
              color: DISPLAY_ZOOM_TEXT_COLOR,
              cursor: 'pointer',
              display: 'inline-block',
              fontWeight: 600,
              minWidth: 72,
            }}
          >
            {getDisplayZoom(record.code)}x
          </span>
        ),
    },
  ]

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = CITIES.filter((city) => {
    if (countryFilter && city.countryCode !== countryFilter) return false
    if (!keywordLower) return true
    const country = COUNTRIES.find((c) => c.code === city.countryCode)
    const province = PROVINCES.find((p) => p.code === city.provinceCode)
    return [
      ...Object.values(city),
      ...(country ? Object.values(country) : []),
      ...(province ? Object.values(province) : []),
    ].some((value) => value.toLowerCase().includes(keywordLower))
  })

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
        <Input
          placeholder={getLabel('searchByCityName', language)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 240 }}
          allowClear
        />
      </Space>
      <Table rowKey="code" columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
    </>
  )
}
