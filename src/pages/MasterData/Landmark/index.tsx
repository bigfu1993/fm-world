import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { listPoints } from '@/api/point'
import {
  createLandmark,
  listLandmarks,
  removeLandmark,
  updateLandmark,
  type LandmarkFormData,
} from '@/api/landmark'
import { LANDMARK_TYPES } from '@/mock/landmarkTypes'
import type { Landmark, Point } from '@/types/point'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import LanguageFormItem from '@/components/LanguageFormItem'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import { modalPopupContainer } from '@/utils/popupContainer'

export default function LandmarkPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [landmarks, setLandmarks] = useState<Landmark[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Landmark | null>(null)
  const [form] = Form.useForm<LandmarkFormData>()

  const fetchData = async () => {
    setLoading(true)
    try {
      const [landmarkList, pointList] = await Promise.all([listLandmarks(), listPoints()])
      setLandmarks(landmarkList)
      setPoints(pointList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const pointOptions = points.map((p) => ({
    value: p.id,
    label: <LanguageText langKey={language} map={{ ...p.name }} />,
  }))

  const landmarkTypeOptions = LANDMARK_TYPES.map((t) => ({
    value: t.code,
    label: <LanguageText langKey={language} map={t} />,
  }))

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (landmark: Landmark) => {
    setEditing(landmark)
    form.setFieldsValue(landmark)
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    try {
      if (editing) {
        await updateLandmark(editing.id, values)
        message.success(<LanguageLabel langKey={language} labelKey="landmarkUpdated" />)
      } else {
        await createLandmark(values)
        message.success(<LanguageLabel langKey={language} labelKey="landmarkCreated" />)
      }
      setModalOpen(false)
      fetchData()
    } catch (error) {
      message.error(error instanceof Error ? error.message : getLabel('operationFailed', language))
    }
  }

  const handleRemove = async (id: string) => {
    await removeLandmark(id)
    message.success(<LanguageLabel langKey={language} labelKey="landmarkDeleted" />)
    fetchData()
  }

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? landmarks.filter((l) => Object.values(l.name).some((value) => value.toLowerCase().includes(keywordLower)))
    : landmarks

  const columns: ColumnsType<Landmark> = [
    {
      title: <LanguageLabel langKey={language} labelKey="pointName" />,
      dataIndex: 'pointId',
      render: (pointId: string) => {
        const point = points.find((p) => p.id === pointId)
        return point ? <LanguageText langKey={language} map={{ ...point.name }} /> : pointId
      },
    },
    {
      title: <LanguageLabel langKey={language} labelKey="landmarkName" />,
      dataIndex: 'name',
      render: (name: Landmark['name']) => <LanguageText langKey={language} map={{ ...name }} />,
    },
    {
      title: <LanguageLabel langKey={language} labelKey="landmarkType" />,
      dataIndex: 'landmarkType',
      render: (landmarkType: string) => {
        const type = LANDMARK_TYPES.find((t) => t.code === landmarkType)
        return type ? <LanguageText langKey={language} map={type} /> : landmarkType
      },
    },
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
            title={<LanguageLabel langKey={language} labelKey="confirmDeleteLandmark" />}
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
          <LanguageLabel langKey={language} labelKey="newLandmark" />
        </Button>
        <Input
          placeholder={getLabel('searchByLandmarkName', language)}
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
        title={<LanguageLabel langKey={language} labelKey={editing ? 'editLandmark' : 'newLandmark'} />}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" size="small">
          <Form.Item
            name="pointId"
            label={<LanguageLabel langKey={language} labelKey="pointName" />}
            rules={[{ required: true, message: getLabel('pleaseSelectPoint', language) }]}
          >
            <Select options={pointOptions} getPopupContainer={modalPopupContainer} />
          </Form.Item>
          <LanguageFormItem
            langKey={language}
            name="name"
            label={<LanguageLabel langKey={language} labelKey="landmarkName" />}
            required
            requiredMessage={getLabel('pleaseInputLandmarkName', language)}
          />
          <Form.Item
            name="landmarkType"
            label={<LanguageLabel langKey={language} labelKey="landmarkType" />}
            rules={[{ required: true, message: getLabel('pleaseSelectLandmarkType', language) }]}
          >
            <Select options={landmarkTypeOptions} getPopupContainer={modalPopupContainer} />
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
