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
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import DataFormItem, { type DataFormItemValue } from '@/components/DataFormItem'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import { modalPopupContainer } from '@/utils/popupContainer'
import type { LocalizedText } from '@/types/destination'

type PointEditorFormData = Omit<PointFormData, 'name'> & {
  name: DataFormItemValue
}

const TYPE_LIST_THEME_COLOR = '#52c41a'
const typeListButtonStyle = {
  backgroundColor: TYPE_LIST_THEME_COLOR,
  borderColor: TYPE_LIST_THEME_COLOR,
}
const toolbarDividerStyle = { height: 24 }

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
  const [editing, setEditing] = useState<Point | null>(null)
  const [pointTypes, setPointTypes] = useState<PointType[]>(POINT_TYPES)
  const [form] = Form.useForm<PointEditorFormData>()
  const pointType = Form.useWatch('pointType', form)

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
      render: (name: Point['name']) => <LanguageText langKey={language} map={{ ...name }} />,
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
      title: <LanguageLabel langKey={language} labelKey="actions" />,
      fixed: 'right',
      width: 160,
      render: (_, record) => (
        <>
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
    </>
  )
}
