import { Input, InputNumber, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PROVINCES, type Province } from '@/db/provinces'
import { COUNTRIES } from '@/db/countries'
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

export default function ProvincePage() {
  const language = useAuthStore(selectCurrentLanguage)
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

  const columns: ColumnsType<Province> = [
    {
      title: <LanguageLabel langKey={language} labelKey="countryName" />,
      dataIndex: 'belongTo',
      render: (belongTo: string) => {
        const country = COUNTRIES.find((c) => c.code === belongTo)
        return country ? <LanguageText langKey={language} map={country} /> : belongTo
      },
    },
    {
      title: <LanguageLabel langKey={language} labelKey="provinceName" />,
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
  const dataSource = keywordLower
    ? PROVINCES.filter((province) => {
        const country = COUNTRIES.find((c) => c.code === province.belongTo)
        return [...Object.values(province), ...(country ? Object.values(country) : [])].some(
          (value) => value.toLowerCase().includes(keywordLower),
        )
      })
    : PROVINCES

  return (
    <>
      <Input
        placeholder={getLabel('searchByProvinceName', language)}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: 220, marginBottom: 16 }}
      />
      <Table rowKey="code" columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
    </>
  )
}
