import { Input } from 'antd'
import { COUNTRIES } from '@/mock/countries'
import { PROVINCES } from '@/mock/provinces'
import { CITIES } from '@/mock/cities'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

const countryCodes = Array.from(new Set(PROVINCES.map((p) => p.countryCode)))
const countryOptions = countryCodes
  .map((code) => COUNTRIES.find((c) => c.code === code))
  .filter((c): c is NonNullable<typeof c> => !!c)

interface ListColumnProps<T extends { code: string }> {
  items: T[]
  selectedCode?: string
  onSelect: (code: string) => void
  langKey: ReturnType<typeof selectCurrentLanguage>
}

function ListColumn<T extends { code: string }>({
  items,
  selectedCode,
  onSelect,
  langKey,
}: ListColumnProps<T>) {
  return (
    <div style={{ width: 200, borderRight: '1px solid #f0f0f0', overflowY: 'auto' }}>
      {items.map((item) => (
        <div
          key={item.code}
          onClick={() => onSelect(item.code)}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            background: item.code === selectedCode ? '#e6f4ff' : undefined,
          }}
        >
          <LanguageText langKey={langKey} map={item} />
        </div>
      ))}
    </div>
  )
}

export default function GeoInfoPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
  const [provinceCode, setProvinceCode] = useState<string | undefined>(undefined)
  const [cityCode, setCityCode] = useState<string | undefined>(undefined)
  const [geoJsonByCode, setGeoJsonByCode] = useState<Record<string, string>>({})

  const provinces = countryCode ? PROVINCES.filter((p) => p.countryCode === countryCode) : []
  const cities = provinceCode ? CITIES.filter((c) => c.provinceCode === provinceCode) : []

  const selectedCode = cityCode ?? provinceCode ?? countryCode

  const handleSelectCountry = (code: string) => {
    setCountryCode(code)
    setProvinceCode(undefined)
    setCityCode(undefined)
  }

  const handleSelectProvince = (code: string) => {
    setProvinceCode(code)
    setCityCode(undefined)
  }

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 480 }}>
      <div style={{ display: 'flex', flex: '0 0 auto', border: '1px solid #f0f0f0' }}>
        <ListColumn
          items={countryOptions}
          selectedCode={countryCode}
          onSelect={handleSelectCountry}
          langKey={language}
        />
        <ListColumn
          items={provinces}
          selectedCode={provinceCode}
          onSelect={handleSelectProvince}
          langKey={language}
        />
        <ListColumn
          items={cities}
          selectedCode={cityCode}
          onSelect={setCityCode}
          langKey={language}
        />
      </div>
      <div style={{ flex: 1, marginLeft: 16, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>
          <LanguageLabel langKey={language} labelKey="geoJsonData" />
        </div>
        {selectedCode ? (
          <Input.TextArea
            value={geoJsonByCode[selectedCode] ?? ''}
            onChange={(e) =>
              setGeoJsonByCode((prev) => ({ ...prev, [selectedCode]: e.target.value }))
            }
            style={{ flex: 1, fontFamily: 'monospace' }}
            placeholder="{ &quot;type&quot;: &quot;Feature&quot;, ... }"
          />
        ) : (
          <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            {getLabel('pleaseSelectRegionHint', language)}
          </div>
        )}
      </div>
    </div>
  )
}
