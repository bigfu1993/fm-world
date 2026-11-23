import { Button, Divider, Form, Input, InputNumber, Popconfirm, Select, Space, Table, message } from 'antd'
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import DraggableModal from '@/components/DraggableModal'
import TypeListManagerModal from '@/components/TypeListManagerModal'
import { listPoints } from '@/api/point'
import {
  createLandmark,
  listLandmarks,
  removeLandmark,
  updateLandmark,
  type LandmarkFormData,
} from '@/api/landmark'
import { LANDMARK_TYPES, type LandmarkType } from '@/mock/landmarkTypes'
import type { Landmark, Point } from '@/types/point'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import {
  useTourismInfoBindingStore,
  type LandmarkTourismInfoBindingState,
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

type LandmarkEditorFormData = Omit<LandmarkFormData, 'name'> & {
  name: DataFormItemValue
}
interface LandmarkInfoBindingForm extends LandmarkTourismInfoBindingState {
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

export default function LandmarkPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [landmarks, setLandmarks] = useState<Landmark[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [typeModalOpen, setTypeModalOpen] = useState(false)
  const [bindingModalOpen, setBindingModalOpen] = useState(false)
  const [editing, setEditing] = useState<Landmark | null>(null)
  const [bindingLandmark, setBindingLandmark] = useState<Landmark | null>(null)
  const [landmarkTypes, setLandmarkTypes] = useState<LandmarkType[]>(LANDMARK_TYPES)
  const tourismInfoItems = useTourismInformationStore((state) => state.items)
  const displayZoomById = useTourismInfoBindingStore(
    (state) => state.landmarkDisplayZoomById,
  )
  const infoBindingById = useTourismInfoBindingStore(
    (state) => state.landmarkInfoBindingById,
  )
  const setDisplayZoom = useTourismInfoBindingStore(
    (state) => state.setLandmarkDisplayZoom,
  )
  const setLandmarkInfoBinding = useTourismInfoBindingStore(
    (state) => state.setLandmarkInfoBinding,
  )
  const [editingDisplayZoom, setEditingDisplayZoom] =
    useState<EditingDisplayZoom | null>(null)
  const [form] = Form.useForm<LandmarkEditorFormData>()

  const getDisplayZoom = (id: string) => displayZoomById[id] ?? DEFAULT_DISPLAY_ZOOM
  const landmarkTourismInfoSections: TourismInfoBindingSection[] = useMemo(
    () => [
      {
        titleKey: 'landmarkTourismInfo',
        fields: [
          {
            kind: 'select',
            name: 'guideInfoIds',
            labelKey: 'landmarkGuideInfo',
            mode: 'multiple',
            required: true,
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'landmark',
              'GUIDE_INFO',
            ),
          },
          {
            kind: 'select',
            name: 'visitRouteInfoIds',
            labelKey: 'landmarkRouteAdvice',
            mode: 'multiple',
            required: true,
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'landmark',
              'VISIT_ROUTE',
            ),
          },
          {
            kind: 'select',
            name: 'photoInfoIds',
            labelKey: 'photoTips',
            mode: 'multiple',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'landmark',
              'PHOTO_TIP',
            ),
          },
          {
            kind: 'select',
            name: 'queueInfoId',
            labelKey: 'queueNotice',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'landmark',
              'QUEUE_NOTICE',
            ),
          },
          {
            kind: 'select',
            name: 'bestVisitTimeInfoId',
            labelKey: 'bestVisitTime',
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'landmark',
              'BEST_VISIT_TIME',
            ),
          },
          {
            kind: 'select',
            name: 'cultureInterpretationInfoIds',
            labelKey: 'cultureInterpretation',
            mode: 'multiple',
            required: true,
            options: createTourismInfoOptions(
              tourismInfoItems,
              language,
              'landmark',
              'CULTURE_INTERPRETATION',
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

  const landmarkTypeOptions = landmarkTypes.map((t) => ({
    value: t.value,
    label: <LanguageText langKey={language} map={t} />,
  }))

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openInfoBindingModal = (landmark: Landmark) => {
    setBindingLandmark(landmark)
    setBindingModalOpen(true)
  }

  const closeInfoBindingModal = () => {
    setBindingModalOpen(false)
    setBindingLandmark(null)
  }

  const saveInfoBinding = (values: LandmarkInfoBindingForm) => {
    if (!bindingLandmark) return
    const { displayZoom, ...infoBindingValues } = values
    setDisplayZoom(bindingLandmark.id, normalizeDisplayZoom(displayZoom))
    setLandmarkInfoBinding(bindingLandmark.id, infoBindingValues)
    closeInfoBindingModal()
  }

  const commitDisplayZoomEdit = () => {
    if (!editingDisplayZoom) return
    const nextValue = normalizeDisplayZoom(editingDisplayZoom.value)
    setDisplayZoom(editingDisplayZoom.id, nextValue)
    setEditingDisplayZoom(null)
  }

  const openEdit = (landmark: Landmark) => {
    setEditing(landmark)
    form.setFieldsValue({
      ...landmark,
      name: createLabelDataFormValue(landmark.name),
    })
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    const submitValues: LandmarkFormData = {
      ...values,
      name: getLabelDataFormContent(values.name),
    }
    try {
      if (editing) {
        await updateLandmark(editing.id, submitValues)
        message.success(<LanguageLabel langKey={language} labelKey="landmarkUpdated" />)
      } else {
        await createLandmark(submitValues)
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
      render: (name: Landmark['name'], record) => (
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
      title: <LanguageLabel langKey={language} labelKey="landmarkType" />,
      dataIndex: 'landmarkType',
      render: (landmarkType: string) => {
        const type = landmarkTypes.find((t) => t.value === landmarkType)
        return type ? <LanguageText langKey={language} map={type} /> : landmarkType
      },
    },
    { title: <LanguageLabel langKey={language} labelKey="introduction" />, dataIndex: 'description' },
    { title: <LanguageLabel langKey={language} labelKey="cultureExtension" />, dataIndex: 'cultureExtension' },
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

      <DraggableModal
        title={<LanguageLabel langKey={language} labelKey={editing ? 'editLandmark' : 'newLandmark'} />}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" size="small">
          <Form.Item
            name="pointId"
            label={<LanguageLabel langKey={language} labelKey="pointName" />}
            rules={[{ required: true, message: getLabel('pleaseSelectPoint', language) }]}
          >
            <Select
              size="small"
              options={pointOptions}
              getPopupContainer={modalPopupContainer}
            />
          </Form.Item>
          <DataFormItem
            langKey={language}
            name="name"
            type={['label']}
            label={<LanguageLabel langKey={language} labelKey="landmarkName" />}
            required
            requiredMessage={getLabel('pleaseInputLandmarkName', language)}
          />
          <Form.Item
            name="landmarkType"
            label={<LanguageLabel langKey={language} labelKey="landmarkType" />}
            rules={[{ required: true, message: getLabel('pleaseSelectLandmarkType', language) }]}
          >
            <Select
              size="small"
              options={landmarkTypeOptions}
              getPopupContainer={modalPopupContainer}
            />
          </Form.Item>
          <Form.Item name="description" label={<LanguageLabel langKey={language} labelKey="introduction" />}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="cultureExtension" label={<LanguageLabel langKey={language} labelKey="cultureExtension" />}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </DraggableModal>
      <TypeListManagerModal
        open={typeModalOpen}
        language={language}
        types={landmarkTypes}
        codePrefix="LANDMARK_TYPE"
        onCancel={() => setTypeModalOpen(false)}
        onTypesChange={setLandmarkTypes}
      />
      <TourismInfoBindingModal<LandmarkInfoBindingForm>
        open={bindingModalOpen}
        language={language}
        entityCode={bindingLandmark?.id}
        entityName={bindingLandmark ? { ...bindingLandmark.name } : undefined}
        entityCodeLabelKey="landmarkCode"
        entityNameLabelKey="landmarkName"
        initialValues={{
          ...(bindingLandmark
            ? (infoBindingById[bindingLandmark.id] ?? {})
            : {}),
          displayZoom: bindingLandmark
            ? getDisplayZoom(bindingLandmark.id)
            : DEFAULT_DISPLAY_ZOOM,
        }}
        sections={landmarkTourismInfoSections}
        width={960}
        columnCount={1}
        onCancel={closeInfoBindingModal}
        onSave={saveInfoBinding}
      />
    </>
  )
}
