import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Table,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { ReactNode } from 'react'
import { COUNTRIES, type CountryData } from '@/db/countries'
import {
  COMMUNICATION_INFOS,
  CULTURE_CUSTOM_INFOS,
  CURRENCY_PAYMENT_INFOS,
  CURRENCY_INFOS,
  ENTRY_POLICY_INFOS,
  RELIGION_INFOS,
  SECURITY_RISK_INFOS,
  STANDARD_SPEC_INFOS,
  type StandardSpecInfoItem,
} from '@/mock/information'
import { GLOBAL_LANGUAGES } from '@/mock/languages'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import DraggableModal from '@/components/DraggableModal'

const DEFAULT_DISPLAY_ZOOM = 8
const MIN_DISPLAY_ZOOM = 0.8
const MAX_DISPLAY_ZOOM = 100
const DEFAULT_SAFETY_LEVEL = 50
const MIN_SAFETY_LEVEL = 0
const MAX_SAFETY_LEVEL = 100
const INFO_BINDING_MODAL_WIDTH = 1400
const INFO_BINDING_MODAL_HORIZONTAL_PADDING = 48
const INFO_BINDING_MODAL_COLUMN_GAP = 32
const INFO_BINDING_MODAL_COLUMN_SHRINK = 80
const infoBindingModalBaseColumnWidth =
  (INFO_BINDING_MODAL_WIDTH -
    INFO_BINDING_MODAL_HORIZONTAL_PADDING -
    INFO_BINDING_MODAL_COLUMN_GAP * 3) /
  4
const infoBindingModalNarrowColumnWidth =
  infoBindingModalBaseColumnWidth - INFO_BINDING_MODAL_COLUMN_SHRINK
const DISPLAY_ZOOM_TEXT_COLOR = '#1677ff'
const CLICKABLE_NAME_TEXT_COLOR = '#1677ff'
const infoBindingModalFormLayoutStyle = {
  display: 'grid',
  gridTemplateColumns: [
    `${infoBindingModalNarrowColumnWidth}px`,
    `${infoBindingModalNarrowColumnWidth}px`,
    'minmax(0, 1fr)',
    'minmax(0, 1fr)',
  ].join(' '),
  columnGap: INFO_BINDING_MODAL_COLUMN_GAP,
  alignItems: 'start',
} as const
const infoBindingModalBasicColumnStyle = {
  gridColumn: '1 / 2',
} as const
const infoBindingModalStandardColumnStyle = {
  gridColumn: '2 / 3',
} as const
const infoBindingModalNoticeColumnStyle = {
  gridColumn: '3 / 4',
} as const
const infoBindingModalCultureColumnStyle = {
  gridColumn: '4 / 5',
} as const
const infoBindingModalSectionTitleStyle = {
  fontSize: 14,
  margin: '0 0 16px',
} as const
const safetyLevelSliderStyle = {
  width: 'calc(100% - 60px)',
  margin: '0 auto',
} as const
const SAFETY_LEVEL_MARK_FONT_SIZE = 10
const safetyLevelMarkValues = [0, 50, 100] as const
const safetyLevelMarkLabelKeys = [
  'safetyDanger',
  'safetyAttention',
  'safetyExtremelySafe',
] as const

interface EditingDisplayZoom {
  code: string
  value: number | null
}

interface CountryInfoBindingForm {
  displayZoom?: number | null
  safetyLevel?: number
  communicationInfoId?: string
  currencyInfoId?: string
  standardSpecInfoIds?: Record<string, string | undefined>
  officialLanguageCodes?: string[]
  entryPolicyInfoId?: string
  securityRiskInfoId?: string
  cultureCustomInfoId?: string
  tippingCultureInfoId?: string
  religionInfoId?: string
}

interface CountryInfoBindingState {
  safetyLevel?: number
  communicationInfoId?: string
  currencyInfoId?: string
  standardSpecInfoIds?: Record<string, string | undefined>
  officialLanguageCodes?: string[]
  entryPolicyInfoId?: string
  securityRiskInfoId?: string
  cultureCustomInfoId?: string
  tippingCultureInfoId?: string
  religionInfoId?: string
}

function getStandardSpecTypeFieldKey(type: StandardSpecInfoItem['type']) {
  return type.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function normalizeDisplayZoom(value?: number | null) {
  const nextValue = value ?? DEFAULT_DISPLAY_ZOOM
  return Math.min(MAX_DISPLAY_ZOOM, Math.max(MIN_DISPLAY_ZOOM, nextValue))
}

export default function CountryPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')
  const [displayZoomByCode, setDisplayZoomByCode] = useState<
    Record<string, number>
  >({})
  const [editingDisplayZoom, setEditingDisplayZoom] =
    useState<EditingDisplayZoom | null>(null)
  const [infoBindingByCode, setInfoBindingByCode] = useState<
    Record<string, CountryInfoBindingState>
  >({})
  const [bindingCountry, setBindingCountry] = useState<CountryData | null>(null)
  const [bindingModalOpen, setBindingModalOpen] = useState(false)
  const [bindingForm] = Form.useForm<CountryInfoBindingForm>()

  const getDisplayZoom = (code: string) =>
    displayZoomByCode[code] ?? DEFAULT_DISPLAY_ZOOM
  const informationPopupContainer = (triggerNode: HTMLElement) =>
    triggerNode.parentElement ?? document.body
  const communicationInfoOptions = COMMUNICATION_INFOS.map((item) => ({
    label: item.name[language] ?? item.name.en,
    value: item.id,
  }))
  const currencyInfoOptions = CURRENCY_INFOS.map((item) => ({
    label: (
      <>
        {item.code} - <LanguageText langKey={language} map={item.name} />
      </>
    ),
    value: item.id,
  }))
  const entryPolicyInfoOptions = ENTRY_POLICY_INFOS.map((item) => ({
    label: <LanguageText langKey={language} map={item.name} />,
    value: item.id,
  }))
  const securityRiskInfoOptions = SECURITY_RISK_INFOS.map((item) => ({
    label: <LanguageText langKey={language} map={item.safetyOverview} />,
    value: item.id,
  }))
  const standardSpecTypes = STANDARD_SPEC_INFOS.reduce<
    StandardSpecInfoItem['type'][]
  >((types, item) => {
    const typeKey = getStandardSpecTypeFieldKey(item.type)
    if (
      types.some(
        (typeItem) => getStandardSpecTypeFieldKey(typeItem) === typeKey,
      )
    ) {
      return types
    }
    return [...types, item.type]
  }, [])
  const standardSpecOptionsByTypeKey = standardSpecTypes.reduce<
    Record<string, { label: string; value: string }[]>
  >((optionsByTypeKey, typeItem) => {
    const typeKey = getStandardSpecTypeFieldKey(typeItem)
    optionsByTypeKey[typeKey] = STANDARD_SPEC_INFOS
      .filter((item) => getStandardSpecTypeFieldKey(item.type) === typeKey)
      .map((item) => ({
        label: item.parameter[language] ?? item.parameter.en,
        value: item.id,
      }))
    return optionsByTypeKey
  }, {})
  const officialLanguageOptions = GLOBAL_LANGUAGES.map((item) => ({
    label: `${item[language] ?? item.en ?? item.localeCode} (${item.code})`,
    value: item.localeCode,
  }))
  const cultureCustomInfoOptions = CULTURE_CUSTOM_INFOS.map((item) => ({
    label: item.code,
    value: item.id,
  }))
  const tippingCultureInfoOptions = CURRENCY_PAYMENT_INFOS.map((item) => ({
    label: <LanguageText langKey={language} map={item.tippingCulture} />,
    value: item.id,
  }))
  const religionInfoOptions = RELIGION_INFOS.map((item) => ({
    label: <LanguageText langKey={language} map={item.name} />,
    value: item.id,
  }))
  const safetyLevelMarks = safetyLevelMarkValues.reduce<
    Record<number, ReactNode>
  >((marks, value, index) => {
    marks[value] = (
      <LanguageLabel
        langKey={language}
        labelKey={safetyLevelMarkLabelKeys[index]}
        direction="col"
        fontSize={SAFETY_LEVEL_MARK_FONT_SIZE}
      />
    )
    return marks
  }, {})

  const openInfoBindingModal = (country: CountryData) => {
    setBindingCountry(country)
    bindingForm.resetFields()
    bindingForm.setFieldsValue({
      safetyLevel: DEFAULT_SAFETY_LEVEL,
      ...infoBindingByCode[country.code],
      displayZoom: getDisplayZoom(country.code),
    })
    setBindingModalOpen(true)
  }

  const closeInfoBindingModal = () => {
    setBindingModalOpen(false)
    setBindingCountry(null)
    bindingForm.resetFields()
  }

  const saveInfoBinding = async () => {
    if (!bindingCountry) return
    const values = await bindingForm.validateFields()
    const { displayZoom, ...infoBindingValues } = values
    const nextDisplayZoom = normalizeDisplayZoom(displayZoom)
    setDisplayZoomByCode((prev) => ({
      ...prev,
      [bindingCountry.code]: nextDisplayZoom,
    }))
    setInfoBindingByCode((prev) => ({
      ...prev,
      [bindingCountry.code]: infoBindingValues,
    }))
    closeInfoBindingModal()
  }

  const commitDisplayZoomEdit = () => {
    if (!editingDisplayZoom) return
    const nextValue = normalizeDisplayZoom(editingDisplayZoom.value)
    setDisplayZoomByCode((prev) => ({
      ...prev,
      [editingDisplayZoom.code]: nextValue,
    }))
    setEditingDisplayZoom(null)
  }

  const columns: ColumnsType<CountryData> = [
    {
      title: <LanguageLabel langKey={language} labelKey="code" />,
      dataIndex: 'code',
    },
    {
      title: <LanguageLabel langKey={language} labelKey="name" />,
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
                prev
                  ? {
                      ...prev,
                      value: typeof value === 'number' ? value : null,
                    }
                  : prev,
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
    ? COUNTRIES.filter((country) =>
        Object.values(country).some((value) =>
          value.toLowerCase().includes(keywordLower),
        ),
      )
    : COUNTRIES

  return (
    <>
      <Input
        placeholder={getLabel('searchByCountryName', language)}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        rowKey="code"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
      />
      <DraggableModal
        title={<LanguageLabel langKey={language} labelKey="infoBinding" />}
        open={bindingModalOpen}
        onOk={saveInfoBinding}
        onCancel={closeInfoBindingModal}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        width={INFO_BINDING_MODAL_WIDTH}
      >
        <Form
          form={bindingForm}
          layout="vertical"
          size="small"
          style={infoBindingModalFormLayoutStyle}
        >
          <div style={infoBindingModalBasicColumnStyle}>
            <h3 style={infoBindingModalSectionTitleStyle}>
              <LanguageLabel
                langKey={language}
                labelKey="basicInformation"
                fontSize={14}
              />
            </h3>
            <Form.Item
              label={<LanguageLabel langKey={language} labelKey="countryCode" />}
            >
              <Input size="small" disabled value={bindingCountry?.code} />
            </Form.Item>
            <Form.Item
              label={<LanguageLabel langKey={language} labelKey="countryName" />}
            >
              {bindingCountry ? (
                <div
                  style={{
                    minHeight: 24,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LanguageText langKey={language} map={bindingCountry} />
                </div>
              ) : null}
            </Form.Item>
            <Form.Item
              name="officialLanguageCodes"
              label={
                <LanguageLabel langKey={language} labelKey="officialLanguage" />
              }
            >
              <Select
                size="small"
                allowClear
                mode="multiple"
                options={officialLanguageOptions}
                placeholder={getLabel('pleaseSelectOfficialLanguage', language)}
                getPopupContainer={informationPopupContainer}
              />
            </Form.Item>
            <Form.Item
              name="currencyInfoId"
              label={<LanguageLabel langKey={language} labelKey="currency" />}
            >
              <Select
                size="small"
                allowClear
                options={currencyInfoOptions}
                placeholder={getLabel('pleaseSelectCurrency', language)}
                getPopupContainer={informationPopupContainer}
              />
            </Form.Item>
            <Form.Item
              name="entryPolicyInfoId"
              label={<LanguageLabel langKey={language} labelKey="entryPolicy" />}
            >
              <Select
                size="small"
                allowClear
                options={entryPolicyInfoOptions}
                placeholder={getLabel('pleaseSelectEntryPolicy', language)}
                getPopupContainer={informationPopupContainer}
              />
            </Form.Item>
            <Form.Item
              name="safetyLevel"
              label={<LanguageLabel langKey={language} labelKey="safetyLevel" />}
            >
              <Slider
                min={MIN_SAFETY_LEVEL}
                max={MAX_SAFETY_LEVEL}
                step={1}
                marks={safetyLevelMarks}
                style={safetyLevelSliderStyle}
              />
            </Form.Item>
            <Form.Item
              name="displayZoom"
              label={<LanguageLabel langKey={language} labelKey="displayZoom" />}
            >
              <InputNumber
                size="small"
                min={MIN_DISPLAY_ZOOM}
                max={MAX_DISPLAY_ZOOM}
                step={0.1}
                style={{ width: 160 }}
              />
            </Form.Item>
          </div>
          <div style={infoBindingModalStandardColumnStyle}>
            <h3 style={infoBindingModalSectionTitleStyle}>
              <LanguageLabel
                langKey={language}
                labelKey="standardSpecification"
                fontSize={14}
              />
            </h3>
            <Form.Item
              name="communicationInfoId"
              label={
                <LanguageLabel
                  langKey={language}
                  labelKey="communication"
                />
              }
            >
              <Select
                size="small"
                allowClear
                options={communicationInfoOptions}
                placeholder={getLabel(
                  'pleaseSelectCommunicationInformation',
                  language,
                )}
                getPopupContainer={informationPopupContainer}
              />
            </Form.Item>
            {standardSpecTypes.map((typeItem) => {
              const typeKey = getStandardSpecTypeFieldKey(typeItem)
              return (
                <Form.Item
                  key={typeKey}
                  name={['standardSpecInfoIds', typeKey]}
                  label={<LanguageText langKey={language} map={typeItem} />}
                >
                  <Select
                    size="small"
                    allowClear
                    options={standardSpecOptionsByTypeKey[typeKey]}
                    placeholder={typeItem[language] ?? typeItem.en}
                    getPopupContainer={informationPopupContainer}
                  />
                </Form.Item>
              )
            })}
          </div>
          <div style={infoBindingModalNoticeColumnStyle}>
            <h3 style={infoBindingModalSectionTitleStyle}>
              <LanguageLabel
                langKey={language}
                labelKey="securityRisk"
                fontSize={14}
              />
            </h3>
            <Form.Item
              name="securityRiskInfoId"
              label={<LanguageLabel langKey={language} labelKey="securityRisk" />}
            >
              <Select
                size="small"
                allowClear
                options={securityRiskInfoOptions}
                placeholder={getLabel('pleaseSelectSecurityRisk', language)}
                getPopupContainer={informationPopupContainer}
              />
            </Form.Item>
          </div>
          <div style={infoBindingModalCultureColumnStyle}>
            <h3 style={infoBindingModalSectionTitleStyle}>
              <LanguageLabel
                langKey={language}
                labelKey="cultureCustoms"
                fontSize={14}
              />
            </h3>
            <Form.Item
              name="cultureCustomInfoId"
              label={
                <LanguageLabel langKey={language} labelKey="cultureCustoms" />
              }
            >
              <Select
                size="small"
                allowClear
                options={cultureCustomInfoOptions}
                placeholder={getLabel('pleaseSelectCultureCustoms', language)}
                getPopupContainer={informationPopupContainer}
              />
            </Form.Item>
            <Form.Item
              name="tippingCultureInfoId"
              label={
                <LanguageLabel langKey={language} labelKey="tippingCulture" />
              }
            >
              <Select
                size="small"
                allowClear
                options={tippingCultureInfoOptions}
                placeholder={getLabel('pleaseSelectTippingCulture', language)}
                getPopupContainer={informationPopupContainer}
              />
            </Form.Item>
            <Form.Item
              name="religionInfoId"
              label={<LanguageLabel langKey={language} labelKey="religion" />}
            >
              <Select
                size="small"
                allowClear
                options={religionInfoOptions}
                placeholder={getLabel('pleaseSelectReligion', language)}
                getPopupContainer={informationPopupContainer}
              />
            </Form.Item>
          </div>
        </Form>
      </DraggableModal>
    </>
  )
}
