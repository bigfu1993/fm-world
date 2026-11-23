import { Button, Form, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import DraggableModal from '@/components/DraggableModal'
import DataFormItem, { type DataFormItemValue } from '@/components/DataFormItem'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import { LANGUAGES, type LanguageCode } from '@/types/system'

export interface ManagedTypeItem extends Record<string, string> {
  code: string
  value: string
}

interface TypeFormData {
  code: string
  value: DataFormItemValue
  name: DataFormItemValue
}

interface TypeListManagerModalProps<T extends ManagedTypeItem> {
  open: boolean
  language: LanguageCode
  types: T[]
  codePrefix: string
  onCancel: () => void
  onTypesChange: (nextTypes: T[]) => void
}

const TYPE_LIST_THEME_COLOR = '#52c41a'
const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}
const typeCreateButtonStyle = {
  borderColor: TYPE_LIST_THEME_COLOR,
  color: TYPE_LIST_THEME_COLOR,
  marginBottom: 16,
}

function getTextContent(value: DataFormItemValue | undefined) {
  return typeof value?.content === 'string' ? value.content : ''
}

function getLabelContent(value: DataFormItemValue | undefined) {
  const content = value?.content
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return undefined
  }
  return content
}

function normalizeTypeValue(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^[-_]+|[-_]+$/g, '') || 'type'
  )
}

function createRandomDigits(length = 11): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

function createTypeCode(prefix: string, existingCodes: Set<string>): string {
  let code: string
  do {
    code = `${prefix}_${createRandomDigits()}`
  } while (existingCodes.has(code))
  return code
}

function completeTypeName(value: Record<string, string> | undefined, fallback: string) {
  const firstValue =
    value?.zh?.trim() ||
    value?.en?.trim() ||
    value?.ja?.trim() ||
    value?.ko?.trim() ||
    value?.th?.trim() ||
    fallback

  return LANGUAGES.reduce<Record<string, string>>((result, item) => {
    result[item.code] = value?.[item.code]?.trim() || firstValue
    return result
  }, {})
}

export default function TypeListManagerModal<T extends ManagedTypeItem>({
  open,
  language,
  types,
  codePrefix,
  onCancel,
  onTypesChange,
}: TypeListManagerModalProps<T>) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [form] = Form.useForm<TypeFormData>()

  const openCreateModal = () => {
    form.resetFields()
    form.setFieldValue('code', createTypeCode(codePrefix, new Set(types.map((item) => item.code))))
    setCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false)
    form.resetFields()
  }

  const saveType = async () => {
    const values = await form.validateFields()
    const value = normalizeTypeValue(getTextContent(values.value))
    if (types.some((item) => item.value === value)) {
      form.setFields([
        {
          name: ['value', 'content'],
          errors: [getLabel('valueExists', language)],
        },
      ])
      return
    }

    const nextType = {
      ...completeTypeName(getLabelContent(values.name), value),
      code: values.code,
      value,
    } as T
    onTypesChange([nextType, ...types])
    closeCreateModal()
  }

  const columns: ColumnsType<T> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="code" />,
      dataIndex: 'code',
      width: 220,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="name" />,
      key: 'name',
      width: 280,
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="value" />,
      dataIndex: 'value',
      width: 220,
    },
  ]

  return (
    <>
      <DraggableModal
        title={<LanguageLabel langKey={language} labelKey="standardSpecTypeList" />}
        open={open}
        onCancel={onCancel}
        footer={null}
        themeColor={TYPE_LIST_THEME_COLOR}
        width={860}
      >
        <Button
          size="small"
          icon={<PlusOutlined />}
          style={typeCreateButtonStyle}
          onClick={openCreateModal}
        >
          <LanguageLabel langKey={language} labelKey="newStandardSpecType" />
        </Button>
        <Table
          rowKey="code"
          columns={columns}
          dataSource={types}
          size="small"
          pagination={false}
        />
      </DraggableModal>
      <DraggableModal
        title={<LanguageLabel langKey={language} labelKey="newStandardSpecType" />}
        open={createModalOpen}
        onOk={saveType}
        onCancel={closeCreateModal}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        themeColor={TYPE_LIST_THEME_COLOR}
        width={720}
      >
        <Form form={form} layout="vertical" size="small">
          <Form.Item
            name="code"
            label={<LanguageLabel langKey={language} labelKey="code" />}
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <DataFormItem
            name="value"
            langKey={language}
            type={['text']}
            label={<LanguageLabel langKey={language} labelKey="value" />}
            required
            requiredMessage={getLabel('pleaseInputValue', language)}
          />
          <DataFormItem
            name="name"
            langKey={language}
            type={['label']}
            label={<LanguageLabel langKey={language} labelKey="name" />}
            required
            requiredMessage={getLabel('pleaseInputName', language)}
          />
        </Form>
      </DraggableModal>
    </>
  )
}
