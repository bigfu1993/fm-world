import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { listAttractions } from '@/api/attraction'
import {
  createPoint,
  listPoints,
  removePoint,
  updatePoint,
  type PointFormData,
} from '@/api/point'
import type { Attraction, Point } from '@/types/attraction'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import { modalPopupContainer } from '@/utils/popupContainer'

export default function PointPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [points, setPoints] = useState<Point[]>([])
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Point | null>(null)
  const [form] = Form.useForm<PointFormData>()

  const fetchData = async () => {
    setLoading(true)
    try {
      const [pointList, attractionList] = await Promise.all([listPoints(), listAttractions()])
      setPoints(pointList)
      setAttractions(attractionList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const attractionOptions = attractions.map((a) => ({ value: a.id, label: a.name[language] ?? a.name.en }))

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
    ? points.filter((p) => p.name.toLowerCase().includes(keywordLower))
    : points

  const columns: ColumnsType<Point> = [
    {
      title: <LanguageLabel langKey={language} labelKey="attractionName" />,
      dataIndex: 'attractionId',
      render: (attractionId: string) => {
        const attraction = attractions.find((a) => a.id === attractionId)
        return attraction ? attraction.name[language] ?? attraction.name.en : attractionId
      },
    },
    { title: <LanguageLabel langKey={language} labelKey="pointName" />, dataIndex: 'name' },
    { title: <LanguageLabel langKey={language} labelKey="introduction" />, dataIndex: 'description' },
    { title: <LanguageLabel langKey={language} labelKey="cultureExtension" />, dataIndex: 'cultureExtension' },
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
            name="attractionId"
            label={<LanguageLabel langKey={language} labelKey="attractionName" />}
            rules={[{ required: true, message: getLabel('pleaseSelectAttraction', language) }]}
          >
            <Select options={attractionOptions} getPopupContainer={modalPopupContainer} />
          </Form.Item>
          <Form.Item
            name="name"
            label={<LanguageLabel langKey={language} labelKey="pointName" />}
            rules={[{ required: true, message: getLabel('pleaseInputPointName', language) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label={<LanguageLabel langKey={language} labelKey="introduction" />}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="cultureExtension" label={<LanguageLabel langKey={language} labelKey="cultureExtension" />}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
