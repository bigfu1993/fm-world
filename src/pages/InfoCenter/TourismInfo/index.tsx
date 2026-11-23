import { Button, Form, Input, Select, Table, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import DataFormItem, { type DataFormItemValue } from '@/components/DataFormItem'
import DraggableModal from '@/components/DraggableModal'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import {
  TOURISM_INFO_TYPES,
  type LocalizedInfoText,
  type TourismInfoItem,
  type TourismInfoLevel,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import { useTourismInformationStore } from '@/store/useTourismInformationStore'
import { renderTableEmptyPlaceholder } from '@/utils/table'
import { LANGUAGES } from '@/types/system'

interface TourismInfoForm {
  code: string
  level: TourismInfoLevel
  typeValue: string
  value?: string
  name: DataFormItemValue
  description: DataFormItemValue
}

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}
const levelOptions: TourismInfoLevel[] = ['province', 'city', 'point', 'landmark']

function createLocalizedText(value: string): LocalizedInfoText {
  return LANGUAGES.reduce<LocalizedInfoText>((result, item) => {
    result[item.code] = value
    return result
  }, {} as LocalizedInfoText)
}

function completeLocalizedText(
  value: Partial<LocalizedInfoText> | undefined,
  fallback = '',
): LocalizedInfoText {
  const firstValue =
    value?.zh?.trim() ||
    value?.en?.trim() ||
    value?.ja?.trim() ||
    value?.ko?.trim() ||
    value?.th?.trim() ||
    fallback

  return LANGUAGES.reduce<LocalizedInfoText>((result, item) => {
    result[item.code] = value?.[item.code]?.trim() || firstValue
    return result
  }, {} as LocalizedInfoText)
}

function getLabelContent(value: DataFormItemValue | undefined): LocalizedInfoText {
  const content = value?.content
  if (content && typeof content === 'object' && !Array.isArray(content)) {
    return completeLocalizedText(content)
  }
  return createLocalizedText(typeof content === 'string' ? content : '')
}

function createRandomDigits(length = 11): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

function createTourismInfoCode(existingCodes: Set<string>): string {
  let code: string
  do {
    code = `TOURISM_${createRandomDigits()}`
  } while (existingCodes.has(code))
  return code
}

function getTourismInfoType(level: TourismInfoLevel, typeValue: string) {
  return TOURISM_INFO_TYPES.find(
    (item) => item.level === level && item.value === typeValue,
  )
}

function getDefaultTypeValue(level: TourismInfoLevel) {
  return TOURISM_INFO_TYPES.find((item) => item.level === level)?.value ?? ''
}

export default function TourismInfoPage() {
  const { token } = theme.useToken()
  const language = useAuthStore(selectCurrentLanguage)
  const items = useTourismInformationStore((state) => state.items)
  const addItem = useTourismInformationStore((state) => state.addItem)
  const updateItem = useTourismInformationStore((state) => state.updateItem)
  const [levelFilter, setLevelFilter] = useState<TourismInfoLevel | undefined>()
  const [typeFilter, setTypeFilter] = useState<string | undefined>()
  const [keyword, setKeyword] = useState('')
  const [editingItem, setEditingItem] = useState<TourismInfoItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm<TourismInfoForm>()
  const currentLevel = Form.useWatch('level', form)
  const primaryOutlineButtonStyle = {
    borderColor: token.colorPrimary,
    color: token.colorPrimary,
  }

  const typeOptions = TOURISM_INFO_TYPES.filter(
    (item) => !levelFilter || item.level === levelFilter,
  ).map((item) => ({
    value: item.value,
    label: <LanguageText langKey={language} map={item.name} />,
  }))
  const modalTypeOptions = TOURISM_INFO_TYPES.filter(
    (item) => item.level === currentLevel,
  ).map((item) => ({
    value: item.value,
    label: <LanguageText langKey={language} map={item.name} />,
  }))

  const generateCode = () =>
    createTourismInfoCode(new Set(items.map((item) => item.code)))

  const openCreateModal = () => {
    const level = levelFilter ?? 'province'
    setEditingItem(null)
    form.resetFields()
    form.setFieldsValue({
      code: generateCode(),
      level,
      typeValue: getDefaultTypeValue(level),
      value: '',
      name: { type: 'label', content: createLocalizedText('') },
      description: { type: 'label', content: createLocalizedText('') },
    })
    setModalOpen(true)
  }

  const openEditModal = (record: TourismInfoItem) => {
    setEditingItem(record)
    form.resetFields()
    form.setFieldsValue({
      code: record.code,
      level: record.level,
      typeValue: record.typeValue,
      value: record.value,
      name: { type: 'label', content: record.name },
      description: { type: 'label', content: record.description },
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingItem(null)
    form.resetFields()
  }

  const saveItem = async () => {
    const values = await form.validateFields()
    const type = getTourismInfoType(values.level, values.typeValue)
    if (!type) return
    const nextItem: TourismInfoItem = {
      id: editingItem?.id ?? `tourism-${values.code.toLowerCase()}`,
      code: values.code,
      level: values.level,
      typeValue: values.typeValue,
      type: type.name,
      value: values.value?.trim(),
      name: getLabelContent(values.name),
      description: getLabelContent(values.description),
    }
    if (editingItem) {
      updateItem(editingItem.id, nextItem)
    } else {
      addItem(nextItem)
    }
    closeModal()
  }

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = items.filter((item) => {
    if (levelFilter && item.level !== levelFilter) return false
    if (typeFilter && item.typeValue !== typeFilter) return false
    if (!keywordLower) return true
    const textValues = [
      item.code,
      item.value,
      ...Object.values(item.type),
      ...Object.values(item.name),
      ...Object.values(item.description),
    ].filter(Boolean) as string[]
    return textValues.some((value) => value.toLowerCase().includes(keywordLower))
  })

  const columns: ColumnsType<TourismInfoItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="code" />,
      dataIndex: 'code',
      width: 200,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="tourismInfoLevel" />,
      dataIndex: 'level',
      width: 140,
      render: (level: TourismInfoLevel) => (
        <LanguageLabel langKey={language} labelKey={level} />
      ),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="tourismInfoType" />,
      key: 'type',
      width: 180,
      render: (_, record) => <LanguageText langKey={language} map={record.type} />,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="name" />,
      key: 'name',
      width: 260,
      render: (_, record) =>
        renderTableEmptyPlaceholder(record.name[language] ?? record.name.en),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="value" />,
      key: 'value',
      width: 220,
      render: (_, record) => renderTableEmptyPlaceholder(record.value),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="supplement" />,
      key: 'description',
      width: 320,
      render: (_, record) =>
        renderTableEmptyPlaceholder(
          record.description[language] ?? record.description.en,
        ),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="actions" />,
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => openEditModal(record)}>
          <LanguageLabel langKey={language} labelKey="edit" />
        </Button>
      ),
    },
  ]

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <Button
          icon={<PlusOutlined />}
          onClick={openCreateModal}
          style={primaryOutlineButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="newStandardSpec" />
        </Button>
        <Select
          allowClear
          placeholder={getLabel('filterByTourismInfoLevel', language)}
          style={{ width: 160 }}
          value={levelFilter}
          onChange={(value) => {
            setLevelFilter(value)
            setTypeFilter(undefined)
          }}
          options={levelOptions.map((level) => ({
            value: level,
            label: <LanguageLabel langKey={language} labelKey={level} />,
          }))}
        />
        <Select
          allowClear
          placeholder={getLabel('filterByTourismInfoType', language)}
          style={{ width: 180 }}
          value={typeFilter}
          onChange={setTypeFilter}
          options={typeOptions}
        />
        <Input
          placeholder={getLabel('searchByTourismInfo', language)}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          style={{ width: 360 }}
        />
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
      />
      <DraggableModal
        title={<LanguageLabel langKey={language} labelKey="editTourismInformation" />}
        open={modalOpen}
        onOk={saveItem}
        onCancel={closeModal}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        width={820}
      >
        <Form form={form} layout="vertical" size="small">
          <Form.Item
            name="code"
            label={<LanguageLabel langKey={language} labelKey="code" />}
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="level"
            label={<LanguageLabel langKey={language} labelKey="tourismInfoLevel" />}
            rules={[{ required: true }]}
          >
            <Select
              size="small"
              disabled={!!editingItem}
              options={levelOptions.map((level) => ({
                value: level,
                label: <LanguageLabel langKey={language} labelKey={level} />,
              }))}
              onChange={(value) => {
                form.setFieldValue('typeValue', getDefaultTypeValue(value))
              }}
            />
          </Form.Item>
          <Form.Item
            name="typeValue"
            label={<LanguageLabel langKey={language} labelKey="tourismInfoType" />}
            rules={[{ required: true }]}
          >
            <Select
              size="small"
              disabled={!!editingItem}
              options={modalTypeOptions}
            />
          </Form.Item>
          <Form.Item
            name="value"
            label={<LanguageLabel langKey={language} labelKey="value" />}
          >
            <Input size="small" disabled={!!editingItem} />
          </Form.Item>
          <DataFormItem
            name="name"
            langKey={language}
            type={['label']}
            label={<LanguageLabel langKey={language} labelKey="name" />}
            required
            requiredMessage={getLabel('pleaseInputName', language)}
          />
          <DataFormItem
            name="description"
            langKey={language}
            type={['label']}
            label={<LanguageLabel langKey={language} labelKey="supplement" />}
          />
        </Form>
      </DraggableModal>
    </>
  )
}
