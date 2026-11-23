import { Button, Divider, Form, Input, InputNumber, Popconfirm, Row, Col, Select, Space, Switch, Table, message } from 'antd'
import { PlusOutlined, MinusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import DraggableModal from '@/components/DraggableModal'
import TypeListManagerModal from '@/components/TypeListManagerModal'
import {
  createPoint,
  listPoints,
  removePoint,
  updatePoint,
  type PointFormData,
} from '@/api/point'
import { CITIES } from '@/mock/cities'
import { POINT_TYPES, type PointType } from '@/mock/pointTypes'
import type { Point } from '@/types/point'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import {
  useTourismInfoBindingStore,
  type PointTourismInfoBindingState,
} from '@/store/useTourismInfoBindingStore'
import { useTourismInformationStore } from '@/store/useTourismInformationStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import DataFormItem, { type DataFormItemValue } from '@/components/DataFormItem'
import TourismInfoBindingModal, {
  type TourismInfoBindingSection,
} from '@/components/TourismInfoBindingModal'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import { modalPopupContainer } from '@/utils/popupContainer'
import { createTourismInfoOptions } from '@/utils/tourismInformation'
import type { LocalizedText } from '@/types/destination'

type PointEditorFormData = Omit<PointFormData, 'name'> & {
  name: DataFormItemValue
}
interface PointInfoBindingForm extends PointTourismInfoBindingState {
  displayZoom?: number | null
}

const DEFAULT_DISPLAY_ZOOM = 8
const MIN_DISPLAY_ZOOM = 0.8
const MAX_DISPLAY_ZOOM = 100
const DISPLAY_ZOOM_TEXT_COLOR = '#1677ff'
const CLICKABLE_NAME_TEXT_COLOR = '#1677ff'
const TYPE_LIST_THEME_COLOR = '#52c41a'
const typeListButtonStyle = {
  backgroundColor: TYPE_LIST_THEME_COLOR,
  borderColor: TYPE_LIST_THEME_COLOR,
}
const toolbarDividerStyle = { height: 24 }

interface EditingDisplayZoom {
  id: string
  value: number | null
}

function normalizeDisplayZoom(value?: number | null) {
  const nextValue = value ?? DEFAULT_DISPLAY_ZOOM
  return Math.min(MAX_DISPLAY_ZOOM, Math.max(MIN_DISPLAY_ZOOM, nextValue))
}

function CoordinatesInput({
  langKey,
  value,
  onChange,
}: {
  langKey: Parameters<typeof getLabel>[1]
  value?: [number, number]
  onChange?: (value: [number, number]) => void
}) {
  const [lat, lng] = value ?? [undefined, undefined]
  return (
    <Space.Compact>
      <InputNumber
        value={lat}
        onChange={(v) => onChange?.([v ?? 0, lng ?? 0])}
        placeholder={getLabel('latitude', langKey)}
      />
      <InputNumber
        value={lng}
        onChange={(v) => onChange?.([lat ?? 0, v ?? 0])}
        placeholder={getLabel('longitude', langKey)}
      />
    </Space.Compact>
  )
}

function BusinessHoursField({ language }: { language: Parameters<typeof getLabel>[1] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <Form.List name="businessHours">
        {(fields, { add, remove }) => (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <LanguageLabel langKey={language} labelKey="businessHours" />
              <Button type="dashed" size="small" onClick={() => add()} icon={<PlusOutlined />}>
                <LanguageLabel langKey={language} labelKey="addTimeRange" fontSize={10} />
              </Button>
            </div>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'start']}
                  rules={[{ required: true, message: getLabel('pleaseInputBusinessHoursRange', language) }]}
                  noStyle
                >
                  <Input placeholder="09:00" style={{ width: 90 }} />
                </Form.Item>
                <span>-</span>
                <Form.Item
                  {...field}
                  name={[field.name, 'end']}
                  rules={[{ required: true, message: getLabel('pleaseInputBusinessHoursRange', language) }]}
                  noStyle
                >
                  <Input placeholder="22:00" style={{ width: 90 }} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
          </>
        )}
      </Form.List>
    </div>
  )
}

function AttractionFields({ language }: { language: Parameters<typeof getLabel>[1] }) {
  return (
    <>
      <Form.Item name="website" label={<LanguageLabel langKey={language} labelKey="website" />}>
        <Input />
      </Form.Item>
      <Form.Item name="ticketUrl" label={<LanguageLabel langKey={language} labelKey="ticketUrl" />}>
        <Input />
      </Form.Item>
    </>
  )
}

function StayFields({ language }: { language: Parameters<typeof getLabel>[1] }) {
  return (
    <>
      <Form.Item name="checkInTime" label={<LanguageLabel langKey={language} labelKey="checkInTime" />}>
        <Input placeholder="14:00" />
      </Form.Item>
      <Form.Item name="checkOutTime" label={<LanguageLabel langKey={language} labelKey="checkOutTime" />}>
        <Input placeholder="12:00" />
      </Form.Item>
      <Form.Item name="starRating" label={<LanguageLabel langKey={language} labelKey="starRating" />}>
        <InputNumber min={1} max={5} style={{ width: '100%' }} />
      </Form.Item>
    </>
  )
}

function TransportFields({ language }: { language: Parameters<typeof getLabel>[1] }) {
  return (
    <>
      <Form.Item name="scheduleInfo" label={<LanguageLabel langKey={language} labelKey="scheduleInfo" />}>
        <Input.TextArea rows={2} />
      </Form.Item>
      <Form.Item name="routeInfo" label={<LanguageLabel langKey={language} labelKey="routeInfo" />}>
        <Input.TextArea rows={2} />
      </Form.Item>
    </>
  )
}

function FoodFields({ language }: { language: Parameters<typeof getLabel>[1] }) {
  return (
    <Form.Item name="avgCost" label={<LanguageLabel langKey={language} labelKey="avgCost" />}>
      <InputNumber min={0} style={{ width: '100%' }} />
    </Form.Item>
  )
}

function ShoppingFields({ language }: { language: Parameters<typeof getLabel>[1] }) {
  return (
    <Form.Item name="brandIntro" label={<LanguageLabel langKey={language} labelKey="brandIntro" />}>
      <Input.TextArea rows={2} />
    </Form.Item>
  )
}

function PointTypeFields({
  pointType,
  language,
}: {
  pointType?: string
  language: Parameters<typeof getLabel>[1]
}) {
  switch (pointType) {
    case 'stay':
      return <StayFields language={language} />
    case 'transport':
      return <TransportFields language={language} />
    case 'food':
      return <FoodFields language={language} />
    case 'shopping':
      return <ShoppingFields language={language} />
    case 'attraction':
      return <AttractionFields language={language} />
    default:
      return null
  }
}

function createLabelDataFormValue(content: LocalizedText): DataFormItemValue {
  return {
    type: 'label',
    content,
  }
}

function getLabelDataFormContent(value: DataFormItemValue): LocalizedText {
  const content = value.content
  if (content && typeof content === 'object' && !Array.isArray(content)) {
    return content
  }
  return {} as LocalizedText
}

export default function PointPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [typeModalOpen, setTypeModalOpen] = useState(false)
  const [bindingModalOpen, setBindingModalOpen] = useState(false)
  const [editing, setEditing] = useState<Point | null>(null)
  const [bindingPoint, setBindingPoint] = useState<Point | null>(null)
  const [pointTypes, setPointTypes] = useState<PointType[]>(POINT_TYPES)
  const tourismInfoItems = useTourismInformationStore((state) => state.items)
  const displayZoomById = useTourismInfoBindingStore(
    (state) => state.pointDisplayZoomById,
  )
  const infoBindingById = useTourismInfoBindingStore(
    (state) => state.pointInfoBindingById,
  )
  const setDisplayZoom = useTourismInfoBindingStore(
    (state) => state.setPointDisplayZoom,
  )
  const setPointInfoBinding = useTourismInfoBindingStore(
    (state) => state.setPointInfoBinding,
  )
  const [editingDisplayZoom, setEditingDisplayZoom] =
    useState<EditingDisplayZoom | null>(null)
  const [form] = Form.useForm<PointEditorFormData>()
  const pointType = Form.useWatch('pointType', form)

  const getDisplayZoom = (id: string) => displayZoomById[id] ?? DEFAULT_DISPLAY_ZOOM
  const pointTourismInfoSections: TourismInfoBindingSection[] = useMemo(
    () => [
      {
        titleKey: 'pointTourismInfo',
        fields: [
          {
            kind: 'select',
            name: 'openingInfoId',
            labelKey: 'openingNotice',
            required: true,
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'point',
              'OPENING_NOTICE',
            ),
          },
          {
            kind: 'select',
            name: 'ticketInfoId',
            labelKey: 'ticketNotice',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'point',
              'TICKET_NOTICE',
            ),
          },
          {
            kind: 'select',
            name: 'reservationInfoId',
            labelKey: 'reservationNotice',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'point',
              'RESERVATION_NOTICE',
            ),
          },
          {
            kind: 'select',
            name: 'facilityInfoIds',
            labelKey: 'facilityNotice',
            mode: 'multiple',
            required: true,
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'point',
              'FACILITY_NOTICE',
            ),
          },
          {
            kind: 'select',
            name: 'arrivalInfoIds',
            labelKey: 'arrivalGuide',
            mode: 'multiple',
            required: true,
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'point',
              'ARRIVAL_GUIDE',
            ),
          },
          {
            kind: 'select',
            name: 'accessibilityInfoId',
            labelKey: 'accessibility',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'point',
              'ACCESSIBILITY',
            ),
          },
          {
            kind: 'select',
            name: 'crowdInfoId',
            labelKey: 'crowdNotice',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'point',
              'CROWD_NOTICE',
            ),
          },
          {
            kind: 'number',
            name: 'suggestedVisitMinutes',
            labelKey: 'suggestedVisitMinutes',
            min: 0,
            step: 5,
          },
        ],
      },
    ],
    [language, tourismInfoItems],
  )

  const fetchData = async () => {
    setLoading(true)
    try {
      setPoints(await listPoints())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const cityOptions = CITIES.map((city) => ({
    value: city.code,
    label: <LanguageText langKey={language} map={city} />,
  }))

  const pointTypeOptions = pointTypes.map((t) => ({
    value: t.value,
    label: <LanguageText langKey={language} map={t} />,
  }))

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    form.setFieldsValue({ businessHours: [{ start: '', end: '' }] })
    setModalOpen(true)
  }

  const openInfoBindingModal = (point: Point) => {
    setBindingPoint(point)
    setBindingModalOpen(true)
  }

  const closeInfoBindingModal = () => {
    setBindingModalOpen(false)
    setBindingPoint(null)
  }

  const saveInfoBinding = (values: PointInfoBindingForm) => {
    if (!bindingPoint) return
    const { displayZoom, ...infoBindingValues } = values
    setDisplayZoom(bindingPoint.id, normalizeDisplayZoom(displayZoom))
    setPointInfoBinding(bindingPoint.id, infoBindingValues)
    closeInfoBindingModal()
  }

  const commitDisplayZoomEdit = () => {
    if (!editingDisplayZoom) return
    const nextValue = normalizeDisplayZoom(editingDisplayZoom.value)
    setDisplayZoom(editingDisplayZoom.id, nextValue)
    setEditingDisplayZoom(null)
  }

  const openEdit = (point: Point) => {
    setEditing(point)
    form.setFieldsValue({
      ...point,
      name: createLabelDataFormValue(point.name),
    })
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    const submitValues: PointFormData = {
      ...values,
      name: getLabelDataFormContent(values.name),
    }
    try {
      if (editing) {
        await updatePoint(editing.id, submitValues)
        message.success(<LanguageLabel langKey={language} labelKey="pointUpdated" />)
      } else {
        await createPoint(submitValues)
        message.success(<LanguageLabel langKey={language} labelKey="pointCreated" />)
      }
      setModalOpen(false)
      fetchData()
    } catch (error) {
      message.error(error instanceof Error ? error.message : getLabel('operationFailed', language))
    }
  }

  const handleRemove = async (id: string) => {
    await removePoint(id)
    message.success(<LanguageLabel langKey={language} labelKey="pointDeleted" />)
    fetchData()
  }

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? points.filter((p) => Object.values(p.name).some((value) => value.toLowerCase().includes(keywordLower)))
    : points

  const columns: ColumnsType<Point> = [
    {
      title: <LanguageLabel langKey={language} labelKey="city" />,
      dataIndex: 'cityCode',
      render: (cityCode: string) => {
        const city = CITIES.find((c) => c.code === cityCode)
        return city ? <LanguageText langKey={language} map={city} /> : cityCode
      },
    },
    {
      title: <LanguageLabel langKey={language} labelKey="pointName" />,
      dataIndex: 'name',
      render: (name: Point['name'], record) => (
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
          <LanguageText langKey={language} map={{ ...name }} />
        </Button>
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="pointType" />,
      dataIndex: 'pointType',
      render: (pointTypeCode: string) => {
        const type = pointTypes.find((t) => t.value === pointTypeCode)
        return type ? <LanguageText langKey={language} map={type} /> : pointTypeCode
      },
    },
    {
      title: <LanguageLabel langKey={language} labelKey="coordinates" />,
      dataIndex: 'coordinates',
      render: (coordinates: Point['coordinates']) => coordinates.join(', '),
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
        editingDisplayZoom?.id === record.id ? (
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
                id: record.id,
                value: getDisplayZoom(record.id),
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
            {getDisplayZoom(record.id)}x
          </span>
        ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="actions" />,
      fixed: 'right',
      width: 240,
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openInfoBindingModal(record)}>
            <LanguageLabel langKey={language} labelKey="infoBinding" />
          </Button>
          <Button type="link" onClick={() => openEdit(record)}>
            <LanguageLabel langKey={language} labelKey="edit" />
          </Button>
          <Popconfirm
            title={<LanguageLabel langKey={language} labelKey="confirmDeletePoint" />}
            onConfirm={() => handleRemove(record.id)}
          >
            <Button type="link" danger>
              <LanguageLabel langKey={language} labelKey="delete" />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<UnorderedListOutlined />}
          onClick={() => setTypeModalOpen(true)}
          style={typeListButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="standardSpecTypeList" />
        </Button>
        <Divider type="vertical" style={toolbarDividerStyle} />
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          <LanguageLabel langKey={language} labelKey="newPoint" />
        </Button>
        <Input
          placeholder={getLabel('searchByPointName', language)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 240 }}
          allowClear
        />
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />

      <DraggableModal
        title={<LanguageLabel langKey={language} labelKey={editing ? 'editPoint' : 'newPoint'} />}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        destroyOnHidden
        width={720}
      >
        <Form form={form} layout="vertical" size="small">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="cityCode"
                label={<LanguageLabel langKey={language} labelKey="city" />}
                rules={[{ required: true, message: getLabel('pleaseSelectCity', language) }]}
              >
                <Select
                  size="small"
                  options={cityOptions}
                  getPopupContainer={modalPopupContainer}
                />
              </Form.Item>
              <DataFormItem
                langKey={language}
                name="name"
                type={['label']}
                label={<LanguageLabel langKey={language} labelKey="pointName" />}
                required
                requiredMessage={getLabel('pleaseInputPointName', language)}
              />
              <Form.Item
                name="coordinates"
                label={<LanguageLabel langKey={language} labelKey="coordinates" />}
                rules={[{ required: true, message: getLabel('pleaseInputCoordinates', language) }]}
              >
                <CoordinatesInput langKey={language} />
              </Form.Item>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <LanguageLabel langKey={language} labelKey="supportsService" />
                <Form.Item name="supportsService" valuePropName="checked" initialValue={false} noStyle>
                  <Switch />
                </Form.Item>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <LanguageLabel langKey={language} labelKey="needsReservation" />
                <Form.Item name="needsReservation" valuePropName="checked" initialValue={false} noStyle>
                  <Switch />
                </Form.Item>
              </div>
              <BusinessHoursField language={language} />
            </Col>
            <Col span={12}>
              <Form.Item
                name="pointType"
                label={<LanguageLabel langKey={language} labelKey="pointType" />}
                rules={[{ required: true, message: getLabel('pleaseSelectPointType', language) }]}
              >
                <Select
                  size="small"
                  options={pointTypeOptions}
                  getPopupContainer={modalPopupContainer}
                />
              </Form.Item>
              <PointTypeFields pointType={pointType} language={language} />
            </Col>
          </Row>
        </Form>
      </DraggableModal>
      <TypeListManagerModal
        open={typeModalOpen}
        language={language}
        types={pointTypes}
        codePrefix="POINT_TYPE"
        onCancel={() => setTypeModalOpen(false)}
        onTypesChange={setPointTypes}
      />
      <TourismInfoBindingModal<PointInfoBindingForm>
        open={bindingModalOpen}
        language={language}
        entityCode={bindingPoint?.id}
        entityName={bindingPoint ? { ...bindingPoint.name } : undefined}
        entityCodeLabelKey="pointCode"
        entityNameLabelKey="pointName"
        initialValues={{
          ...(bindingPoint ? (infoBindingById[bindingPoint.id] ?? {}) : {}),
          displayZoom: bindingPoint
            ? getDisplayZoom(bindingPoint.id)
            : DEFAULT_DISPLAY_ZOOM,
        }}
        sections={pointTourismInfoSections}
        width={960}
        columnCount={1}
        onCancel={closeInfoBindingModal}
        onSave={saveInfoBinding}
      />
    </>
  )
}
