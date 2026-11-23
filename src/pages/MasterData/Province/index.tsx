import { Button, Input, InputNumber, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PROVINCES, type Province } from '@/db/provinces'
import { COUNTRIES } from '@/db/countries'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import {
  useTourismInfoBindingStore,
  type ProvinceTourismInfoBindingState,
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

interface ProvinceInfoBindingForm extends ProvinceTourismInfoBindingState {
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

export default function ProvincePage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')
  const tourismInfoItems = useTourismInformationStore((state) => state.items)
  const displayZoomByCode = useTourismInfoBindingStore(
    (state) => state.provinceDisplayZoomByCode,
  )
  const infoBindingByCode = useTourismInfoBindingStore(
    (state) => state.provinceInfoBindingByCode,
  )
  const setDisplayZoom = useTourismInfoBindingStore(
    (state) => state.setProvinceDisplayZoom,
  )
  const setProvinceInfoBinding = useTourismInfoBindingStore(
    (state) => state.setProvinceInfoBinding,
  )
  const [editingDisplayZoom, setEditingDisplayZoom] = useState<EditingDisplayZoom | null>(null)
  const [bindingProvince, setBindingProvince] = useState<Province | null>(null)
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
  const provinceTourismInfoSections: TourismInfoBindingSection[] = useMemo(
    () => [
      {
        titleKey: 'regionalFeatureInfo',
        fields: [
          {
            kind: 'select',
            name: 'regionalLandscapeInfoIds',
            labelKey: 'regionalLandscape',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'province',
              'REGIONAL_LANDSCAPE',
            ),
          },
          {
            kind: 'select',
            name: 'regionalCultureBeltInfoIds',
            labelKey: 'regionalCultureBelt',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'province',
              'REGIONAL_CULTURE_BELT',
            ),
          },
          {
            kind: 'select',
            name: 'regionalHeritageClusterInfoIds',
            labelKey: 'regionalHeritageCluster',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'province',
              'REGIONAL_HERITAGE_CLUSTER',
            ),
          },
          {
            kind: 'select',
            name: 'regionalCuisineSystemInfoIds',
            labelKey: 'regionalCuisineSystem',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'province',
              'REGIONAL_CUISINE_SYSTEM',
            ),
          },
          {
            kind: 'select',
            name: 'regionalSeasonalEventInfoIds',
            labelKey: 'regionalSeasonalEvent',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'province',
              'REGIONAL_SEASONAL_EVENT',
            ),
          },
        ],
      },
      {
        titleKey: 'trafficInformation',
        fields: [
          {
            kind: 'select',
            name: 'regionalTrafficInfoIds',
            labelKey: 'trafficInformation',
            mode: 'multiple',
            required: true,
            options: trafficInfoOptions,
          },
          {
            kind: 'number',
            name: 'recommendedStayDays',
            labelKey: 'recommendedStayDays',
            min: 0,
            step: 0.5,
          },
        ],
      },
    ],
    [language, tourismInfoItems, trafficInfoOptions],
  )

  const openInfoBindingModal = (province: Province) => {
    setBindingProvince(province)
    setBindingModalOpen(true)
  }

  const closeInfoBindingModal = () => {
    setBindingModalOpen(false)
    setBindingProvince(null)
  }

  const saveInfoBinding = (values: ProvinceInfoBindingForm) => {
    if (!bindingProvince) return
    const { displayZoom, ...infoBindingValues } = values
    setDisplayZoom(bindingProvince.code, normalizeDisplayZoom(displayZoom))
    setProvinceInfoBinding(bindingProvince.code, infoBindingValues)
    closeInfoBindingModal()
  }

  const commitDisplayZoomEdit = () => {
    if (!editingDisplayZoom) return
    const nextValue = normalizeDisplayZoom(editingDisplayZoom.value)
    setDisplayZoom(editingDisplayZoom.code, nextValue)
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
      <TourismInfoBindingModal<ProvinceInfoBindingForm>
        open={bindingModalOpen}
        language={language}
        entityCode={bindingProvince?.code}
        entityName={bindingProvince ?? undefined}
        entityCodeLabelKey="provinceCode"
        entityNameLabelKey="provinceName"
        initialValues={{
          ...(bindingProvince
            ? (infoBindingByCode[bindingProvince.code] ?? {})
            : {}),
          displayZoom: bindingProvince
            ? getDisplayZoom(bindingProvince.code)
            : DEFAULT_DISPLAY_ZOOM,
        }}
        sections={provinceTourismInfoSections}
        width={960}
        columnCount={2}
        onCancel={closeInfoBindingModal}
        onSave={saveInfoBinding}
      />
    </>
  )
}
