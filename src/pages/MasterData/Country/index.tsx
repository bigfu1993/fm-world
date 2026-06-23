import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { COUNTRIES, type CountryData } from '@/db/countries'
import {
  COMMUNICATION_INFOS,
  CULTURE_CUSTOM_INFOS,
  INTERCITY_TRAFFIC_INFOS,
  STANDARD_SPEC_INFOS,
} from '@/mock/information'
import { GLOBAL_LANGUAGES } from '@/mock/languages'
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

interface CountryInfoBindingForm {
  displayZoom?: number | null
  communicationInfoId?: string
  intercityTrafficInfoId?: string
  nationalPowerInfoId?: string
  officialLanguageCodes?: string[]
  networkRestricted?: boolean
  cultureCustomInfoId?: string
}

interface CountryInfoBindingState {
  communicationInfoId?: string
  intercityTrafficInfoId?: string
  nationalPowerInfoId?: string
  officialLanguageCodes?: string[]
  networkRestricted?: boolean
  cultureCustomInfoId?: string
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
  const intercityTrafficInfoOptions = INTERCITY_TRAFFIC_INFOS.map((item) => ({
    label: item.name[language] ?? item.name.en,
    value: item.id,
  }))
  const nationalPowerInfoOptions = STANDARD_SPEC_INFOS.map((item) => ({
    label: item.code,
    value: item.id,
  }))
  const officialLanguageOptions = GLOBAL_LANGUAGES.map((item) => ({
    label: `${item[language] ?? item.en ?? item.code} (${item.code})`,
    value: item.code,
  }))
  const cultureCustomInfoOptions = CULTURE_CUSTOM_INFOS.map((item) => ({
    label: item.code,
    value: item.id,
  }))

  const openInfoBindingModal = (country: CountryData) => {
    setBindingCountry(country)
    bindingForm.resetFields()
    bindingForm.setFieldsValue({
      networkRestricted: false,
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
      title: <LanguageLabel langKey={language} labelKey="countryCode" />,
      dataIndex: 'code',
    },
    {
      title: <LanguageLabel langKey={language} labelKey="countryName" />,
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
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder={getLabel('searchByCountryName', language)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>
      <Table
        rowKey="code"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
      />
      <Modal
        title={<LanguageLabel langKey={language} labelKey="infoBinding" />}
        open={bindingModalOpen}
        onOk={saveInfoBinding}
        onCancel={closeInfoBindingModal}
      >
        <Form form={bindingForm} layout="vertical" size="small">
          <Form.Item
            label={<LanguageLabel langKey={language} labelKey="countryCode" />}
          >
            <Input disabled value={bindingCountry?.code} />
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
            name="displayZoom"
            label={<LanguageLabel langKey={language} labelKey="displayZoom" />}
          >
            <InputNumber
              min={MIN_DISPLAY_ZOOM}
              max={MAX_DISPLAY_ZOOM}
              step={0.1}
              style={{ width: 160 }}
            />
          </Form.Item>
          <Form.Item
            name="communicationInfoId"
            label={
              <LanguageLabel
                langKey={language}
                labelKey="communicationInformation"
              />
            }
          >
            <Select
              allowClear
              options={communicationInfoOptions}
              placeholder={getLabel(
                'pleaseSelectCommunicationInformation',
                language,
              )}
              getPopupContainer={informationPopupContainer}
            />
          </Form.Item>
          <Form.Item
            name="intercityTrafficInfoId"
            label={
              <LanguageLabel
                langKey={language}
                labelKey="intercityTrafficInformation"
              />
            }
          >
            <Select
              allowClear
              options={intercityTrafficInfoOptions}
              placeholder={getLabel(
                'pleaseSelectIntercityTrafficInformation',
                language,
              )}
              getPopupContainer={informationPopupContainer}
            />
          </Form.Item>
          <Form.Item
            name="nationalPowerInfoId"
            label={<LanguageLabel langKey={language} labelKey="nationalPower" />}
          >
            <Select
              allowClear
              options={nationalPowerInfoOptions}
              placeholder={getLabel('pleaseSelectNationalPower', language)}
              getPopupContainer={informationPopupContainer}
            />
          </Form.Item>
          <Form.Item
            name="officialLanguageCodes"
            label={
              <LanguageLabel langKey={language} labelKey="officialLanguage" />
            }
          >
            <Select
              allowClear
              mode="multiple"
              options={officialLanguageOptions}
              placeholder={getLabel('pleaseSelectOfficialLanguage', language)}
              getPopupContainer={informationPopupContainer}
            />
          </Form.Item>
          <Form.Item
            name="networkRestricted"
            valuePropName="checked"
          >
            <Checkbox>
              <LanguageLabel langKey={language} labelKey="networkRestricted" />
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="cultureCustomInfoId"
            label={<LanguageLabel langKey={language} labelKey="cultureCustoms" />}
          >
            <Select
              allowClear
              options={cultureCustomInfoOptions}
              placeholder={getLabel('pleaseSelectCultureCustoms', language)}
              getPopupContainer={informationPopupContainer}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
