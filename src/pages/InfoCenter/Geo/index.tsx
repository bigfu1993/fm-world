import { Breadcrumb, Button, Input, Tag, message } from 'antd'
import { COUNTRIES } from '@/mock/countries'
import { PROVINCES, type Province } from '@/mock/provinces'
import { CITIES, type CityData } from '@/mock/cities'
import { GEO_LIST } from '@/mock/geo'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import type { LanguageCode } from '@/types/system'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel, type LabelKey } from '@/components/LanguageLabel/LabelMap'

const countryCodes = Array.from(new Set(PROVINCES.map((p) => p.countryCode)))
const countryOptions = countryCodes
  .map((code) => COUNTRIES.find((c) => c.code === code))
  .filter((c): c is NonNullable<typeof c> => !!c)

const geoLookup = new Map(GEO_LIST.map((g) => [g.code, JSON.stringify(g.geo, null, 2)]))

function countryGeoCode(countryCode: string): string {
  return countryCode
}

function provinceGeoCode(province: Province): string {
  return `${province.countryCode}*${province.code}`
}

function cityGeoCode(city: CityData): string {
  return `${city.countryCode}*${city.provinceCode}*${city.code}`
}

function matchesKeyword(item: Record<string, string>, keyword: string): boolean {
  if (!keyword) return true
  return Object.values(item).some((value) => value.toLowerCase().includes(keyword))
}

interface ListColumnProps<T extends { code: string }> {
  titleKey: LabelKey
  items: T[]
  selectedCode?: string
  onSelect: (code: string) => void
  langKey: LanguageCode
  keyword: string
  onKeywordChange: (keyword: string) => void
  getGeoCode: (item: T) => string
  hasData: (geoCode: string) => boolean
  hasMissingChild?: (item: T) => boolean
}

function ListColumn<T extends { code: string }>({
  titleKey,
  items,
  selectedCode,
  onSelect,
  langKey,
  keyword,
  onKeywordChange,
  getGeoCode,
  hasData,
  hasMissingChild,
}: ListColumnProps<T>) {
  return (
    <div style={{ width: 220, borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>
          <LanguageLabel langKey={langKey} labelKey={titleKey} />
        </div>
        <Input
          size="small"
          allowClear
          placeholder={getLabel('search', langKey)}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.map((item) => (
          <div
            key={item.code}
            onClick={() => onSelect(item.code)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: item.code === selectedCode ? '#e6f4ff' : undefined,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {hasMissingChild?.(item) && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#ff4d4f',
                    flexShrink: 0,
                  }}
                />
              )}
              <LanguageText langKey={langKey} map={item} />
            </span>
            {hasData(getGeoCode(item)) && (
              <Tag
                color="blue"
                style={{ fontSize: 10, lineHeight: '14px', padding: '0 4px', marginInlineEnd: 0 }}
              >
                JSON
              </Tag>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GeoInfoPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
  const [provinceCode, setProvinceCode] = useState<string | undefined>(undefined)
  const [cityCode, setCityCode] = useState<string | undefined>(undefined)
  const [geoJsonByCode, setGeoJsonByCode] = useState<Record<string, string>>({})
  const [countryKeyword, setCountryKeyword] = useState('')
  const [provinceKeyword, setProvinceKeyword] = useState('')
  const [cityKeyword, setCityKeyword] = useState('')

  const provinces = countryCode ? PROVINCES.filter((p) => p.countryCode === countryCode) : []
  const cities = provinceCode ? CITIES.filter((c) => c.provinceCode === provinceCode) : []

  const filteredCountries = countryOptions.filter((c) =>
    matchesKeyword(c, countryKeyword.trim().toLowerCase()),
  )
  const filteredProvinces = provinces.filter((p) =>
    matchesKeyword(p, provinceKeyword.trim().toLowerCase()),
  )
  const filteredCities = cities.filter((c) => matchesKeyword(c, cityKeyword.trim().toLowerCase()))

  const hasData = (geoCode: string) => !!geoJsonByCode[geoCode]?.trim() || geoLookup.has(geoCode)

  const provinceHasMissingChild = (province: Province) => {
    const citiesOf = CITIES.filter((c) => c.provinceCode === province.code)
    return citiesOf.length > 0 && citiesOf.some((c) => !hasData(cityGeoCode(c)))
  }

  const countryHasMissingChild = (country: { code: string }) => {
    const provincesOf = PROVINCES.filter((p) => p.countryCode === country.code)
    return (
      provincesOf.length > 0 &&
      provincesOf.some((p) => !hasData(provinceGeoCode(p)) || provinceHasMissingChild(p))
    )
  }

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode)
  const selectedProvince = PROVINCES.find((p) => p.code === provinceCode)
  const selectedCity = CITIES.find((c) => c.code === cityCode)

  const selectedGeoCode = selectedCity
    ? cityGeoCode(selectedCity)
    : selectedProvince
      ? provinceGeoCode(selectedProvince)
      : selectedCountry
        ? countryGeoCode(selectedCountry.code)
        : undefined

  const breadcrumbItems = [selectedCountry, selectedProvince, selectedCity]
    .filter((item): item is NonNullable<typeof item> => !!item)
    .map((item) => ({ title: <LanguageText langKey={language} map={item} /> }))

  const handleSelectCountry = (code: string) => {
    setCountryCode(code)
    setProvinceCode(undefined)
    setCityCode(undefined)
  }

  const handleSelectProvince = (code: string) => {
    setProvinceCode(code)
    setCityCode(undefined)
  }

  const handleSubmit = () => {
    message.success(getLabel('submitSuccess', language))
  }

  const currentValue = selectedGeoCode
    ? geoJsonByCode[selectedGeoCode] ?? geoLookup.get(selectedGeoCode) ?? ''
    : ''

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 480 }}>
      <div style={{ display: 'flex', flex: '0 0 auto', border: '1px solid #f0f0f0' }}>
        <ListColumn
          titleKey="country"
          items={filteredCountries}
          selectedCode={countryCode}
          onSelect={handleSelectCountry}
          langKey={language}
          keyword={countryKeyword}
          onKeywordChange={setCountryKeyword}
          getGeoCode={(item) => countryGeoCode(item.code)}
          hasData={hasData}
          hasMissingChild={countryHasMissingChild}
        />
        <ListColumn
          titleKey="province"
          items={filteredProvinces}
          selectedCode={provinceCode}
          onSelect={handleSelectProvince}
          langKey={language}
          keyword={provinceKeyword}
          onKeywordChange={setProvinceKeyword}
          getGeoCode={provinceGeoCode}
          hasData={hasData}
          hasMissingChild={provinceHasMissingChild}
        />
        <ListColumn
          titleKey="city"
          items={filteredCities}
          selectedCode={cityCode}
          onSelect={setCityCode}
          langKey={language}
          keyword={cityKeyword}
          onKeywordChange={setCityKeyword}
          getGeoCode={cityGeoCode}
          hasData={hasData}
        />
      </div>
      <div style={{ flex: 1, marginLeft: 16, display: 'flex', flexDirection: 'column' }}>
        <Breadcrumb style={{ marginBottom: 12 }} items={breadcrumbItems} />
        <div style={{ marginBottom: 8, fontWeight: 600 }}>
          <LanguageLabel langKey={language} labelKey="geoJsonData" />
        </div>
        {selectedGeoCode ? (
          <>
            <Input.TextArea
              value={currentValue}
              onChange={(e) =>
                setGeoJsonByCode((prev) => ({ ...prev, [selectedGeoCode]: e.target.value }))
              }
              style={{ flex: 1, fontFamily: 'monospace', fontSize: 12 }}
              placeholder="{ &quot;type&quot;: &quot;Feature&quot;, ... }"
            />
            <Button
              type="primary"
              disabled={!currentValue.trim()}
              onClick={handleSubmit}
              style={{ marginTop: 12, alignSelf: 'flex-start' }}
            >
              <LanguageLabel langKey={language} labelKey="submit" />
            </Button>
          </>
        ) : (
          <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
            {getLabel('pleaseSelectRegionHint', language)}
          </div>
        )}
      </div>
    </div>
  )
}
