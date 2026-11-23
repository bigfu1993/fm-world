import { Button, Input, InputNumber, Select, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CITIES, type CityData } from '@/mock/cities'
import { COUNTRIES } from '@/db/countries'
import { PROVINCES } from '@/db/provinces'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import {
  useTourismInfoBindingStore,
  type CityTourismInfoBindingState,
} from '@/store/useTourismInfoBindingStore'
import { useTourismInformationStore } from '@/store/useTourismInformationStore'
import { INTERCITY_TRAFFIC_INFOS } from '@/mock/information'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import TourismInfoBindingModal, {
  type TourismInfoBindingSection,
} from '@/components/TourismInfoBindingModal'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import { createTourismInfoOptions } from '@/utils/tourismInformation'

const DEFAULT_DISPLAY_ZOOM = 8
const MIN_DISPLAY_ZOOM = 0.8
const MAX_DISPLAY_ZOOM = 100
const DISPLAY_ZOOM_TEXT_COLOR = '#1677ff'
const CLICKABLE_NAME_TEXT_COLOR = '#1677ff'

interface CityInfoBindingForm extends CityTourismInfoBindingState {
  displayZoom?: number | null
}

interface EditingDisplayZoom {
  code: string
  value: number | null
}

function normalizeDisplayZoom(value?: number | null) {
  const nextValue = value ?? DEFAULT_DISPLAY_ZOOM
  return Math.min(MAX_DISPLAY_ZOOM, Math.max(MIN_DISPLAY_ZOOM, nextValue))
}

export default function CityPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined)
  const [keyword, setKeyword] = useState('')
  const tourismInfoItems = useTourismInformationStore((state) => state.items)
  const displayZoomByCode = useTourismInfoBindingStore(
    (state) => state.cityDisplayZoomByCode,
  )
  const infoBindingByCode = useTourismInfoBindingStore(
    (state) => state.cityInfoBindingByCode,
  )
  const setDisplayZoom = useTourismInfoBindingStore(
    (state) => state.setCityDisplayZoom,
  )
  const setCityInfoBinding = useTourismInfoBindingStore(
    (state) => state.setCityInfoBinding,
  )
  const [editingDisplayZoom, setEditingDisplayZoom] = useState<EditingDisplayZoom | null>(null)
  const [bindingCity, setBindingCity] = useState<CityData | null>(null)
  const [bindingModalOpen, setBindingModalOpen] = useState(false)

  const getDisplayZoom = (code: string) => displayZoomByCode[code] ?? DEFAULT_DISPLAY_ZOOM
  const trafficInfoOptions = useMemo(
    () =>
      INTERCITY_TRAFFIC_INFOS.map((item) => ({
        value: item.id,
        label: <LanguageText langKey={language} map={item.name} />,
      })),
    [language],
  )
  const cityTourismInfoSections: TourismInfoBindingSection[] = useMemo(
    () => [
      {
        titleKey: 'cityFeatureInfo',
        fields: [
          {
            kind: 'select',
            name: 'urbanDistrictInfoIds',
            labelKey: 'urbanDistrictFeature',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'city',
              'CITY_DISTRICT',
            ),
          },
          {
            kind: 'select',
            name: 'cityLifestyleInfoIds',
            labelKey: 'cityLifestyleScene',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'city',
              'CITY_LIFESTYLE',
            ),
          },
          {
            kind: 'select',
            name: 'cityFoodSceneInfoIds',
            labelKey: 'cityFoodScene',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'city',
              'CITY_FOOD_SCENE',
            ),
          },
          {
            kind: 'select',
            name: 'cityHeritageInfoIds',
            labelKey: 'cityHeritageScene',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'city',
              'CITY_HERITAGE_SCENE',
            ),
          },
          {
            kind: 'select',
            name: 'cityEventInfoIds',
            labelKey: 'cityEventScene',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'city',
              'CITY_EVENT_SCENE',
            ),
          },
        ],
      },
      {
        titleKey: 'trafficInformation',
        fields: [
          {
            kind: 'select',
            name: 'cityTransportInfoIds',
            labelKey: 'trafficInformation',
            mode: 'multiple',
            required: true,
            options: trafficInfoOptions,
          },
          {
            kind: 'number',
            name: 'suggestedStayDays',
            labelKey: 'suggestedStayDays',
            min: 0,
            step: 0.5,
          },
        ],
      },
    ],
    [language, tourismInfoItems, trafficInfoOptions],
  )

  const openInfoBindingModal = (city: CityData) => {
    setBindingCity(city)
    setBindingModalOpen(true)
  }

  const closeInfoBindingModal = () => {
    setBindingModalOpen(false)
    setBindingCity(null)
  }

  const saveInfoBinding = (values: CityInfoBindingForm) => {
    if (!bindingCity) return
    const { displayZoom, ...infoBindingValues } = values
    setDisplayZoom(bindingCity.code, normalizeDisplayZoom(displayZoom))
    setCityInfoBinding(bindingCity.code, infoBindingValues)
    closeInfoBindingModal()
  }

  const commitDisplayZoomEdit = () => {
    if (!editingDisplayZoom) return
    const nextValue = normalizeDisplayZoom(editingDisplayZoom.value)
    setDisplayZoom(editingDisplayZoom.code, nextValue)
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
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => openInfoBindingModal(record)}
          style={{
            color: CLICKABLE_NAME_TEXT_COLOR,
            fontWeight: 600,
            height: 'auto',
            padding: 0,
          }}
        >
          <LanguageText langKey={language} map={record} />
        </Button>
      ),
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
    {
      title: <LanguageLabel langKey={language} labelKey="actions" />,
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => openInfoBindingModal(record)}
        >
          <LanguageLabel langKey={language} labelKey="infoBinding" />
        </Button>
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
      <TourismInfoBindingModal<CityInfoBindingForm>
        open={bindingModalOpen}
        language={language}
        entityCode={bindingCity?.code}
        entityName={bindingCity ?? undefined}
        entityCodeLabelKey="cityCode"
        entityNameLabelKey="cityName"
        initialValues={{
          ...(bindingCity ? (infoBindingByCode[bindingCity.code] ?? {}) : {}),
          displayZoom: bindingCity
            ? getDisplayZoom(bindingCity.code)
            : DEFAULT_DISPLAY_ZOOM,
        }}
        sections={cityTourismInfoSections}
        width={960}
        columnCount={2}
        onCancel={closeInfoBindingModal}
        onSave={saveInfoBinding}
      />
    </>
  )
}
