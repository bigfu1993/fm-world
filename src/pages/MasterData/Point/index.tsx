import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import {
  createPoint,
  listPoints,
  removePoint,
  updatePoint,
  type PointFormData,
} from '@/api/point'
import { CITIES } from '@/mock/cities'
import { POINT_TYPES } from '@/mock/pointTypes'
import type { Point } from '@/types/point'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import LanguageFormItem from '@/components/LanguageFormItem'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import { modalPopupContainer } from '@/utils/popupContainer'

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

export default function PointPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Point | null>(null)
  const [form] = Form.useForm<PointFormData>()

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

  const pointTypeOptions = POINT_TYPES.map((t) => ({
    value: t.code,
    label: <LanguageText langKey={language} map={t} />,
  }))

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (point: Point) => {
    setEditing(point)
    form.setFieldsValue(point)
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    try {
      if (editing) {
        await updatePoint(editing.id, values)
        message.success(<LanguageLabel langKey={language} labelKey="pointUpdated" />)
      } else {
        await createPoint(values)
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
      render: (pointType: string) => {
        const type = POINT_TYPES.find((t) => t.code === pointType)
        return type ? <LanguageText langKey={language} map={type} /> : pointType
      },
    },
    {
      title: <LanguageLabel langKey={language} labelKey="coordinates" />,
      dataIndex: 'coordinates',
      render: (coordinates: Point['coordinates']) => coordinates.join(', '),
    },
    { title: <LanguageLabel langKey={language} labelKey="website" />, dataIndex: 'website' },
    { title: <LanguageLabel langKey={language} labelKey="ticketUrl" />, dataIndex: 'ticketUrl' },
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

      <Modal
        title={<LanguageLabel langKey={language} labelKey={editing ? 'editPoint' : 'newPoint'} />}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" size="small">
          <Form.Item
            name="cityCode"
            label={<LanguageLabel langKey={language} labelKey="city" />}
            rules={[{ required: true, message: getLabel('pleaseSelectCity', language) }]}
          >
            <Select options={cityOptions} getPopupContainer={modalPopupContainer} />
          </Form.Item>
          <LanguageFormItem
            langKey={language}
            name="name"
            label={<LanguageLabel langKey={language} labelKey="pointName" />}
            required
            requiredMessage={getLabel('pleaseInputPointName', language)}
          />
          <Form.Item
            name="pointType"
            label={<LanguageLabel langKey={language} labelKey="pointType" />}
            rules={[{ required: true, message: getLabel('pleaseSelectPointType', language) }]}
          >
            <Select options={pointTypeOptions} getPopupContainer={modalPopupContainer} />
          </Form.Item>
          <Form.Item
            name="coordinates"
            label={<LanguageLabel langKey={language} labelKey="coordinates" />}
            rules={[{ required: true, message: getLabel('pleaseInputCoordinates', language) }]}
          >
            <CoordinatesInput langKey={language} />
          </Form.Item>
          <Form.Item name="website" label={<LanguageLabel langKey={language} labelKey="website" />}>
            <Input />
          </Form.Item>
          <Form.Item name="ticketUrl" label={<LanguageLabel langKey={language} labelKey="ticketUrl" />}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
