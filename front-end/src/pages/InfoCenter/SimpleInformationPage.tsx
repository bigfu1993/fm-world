import { Button, Form, Input, Table, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { ReactNode } from 'react'
import LanguageLabel from '@/components/LanguageLabel'
import { getLabel, type LabelKey } from '@/components/LanguageLabel/LabelMap'
import DraggableModal from '@/components/DraggableModal'
import DataFormItem, {
  defaultDataFormItemValue,
  type DataFormItemValue,
} from '@/components/DataFormItem'
import type {
  InformationItem,
  LocalizedInfoText,
  StandardSpecSupplementContent,
  StandardSpecSupplementFile,
  StandardSpecSupplementType,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import { renderTableEmptyPlaceholder } from '@/utils/table'

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}

interface DataFormInfo {
  type: StandardSpecSupplementType
  content: StandardSpecSupplementContent
}

interface ManagedInformationItem extends InformationItem {
  nameInfo?: DataFormInfo
  supplement?: DataFormInfo
}

interface SimpleInformationForm {
  code: string
  value?: string
  name: DataFormItemValue
  supplement: DataFormItemValue
}

interface SimpleInformationPageProps {
  initialItems: InformationItem[]
  codePrefix: string
  editTitleLabelKey: LabelKey
  searchPlaceholderLabelKey?: LabelKey
  toolbarExtra?: ReactNode
  valueDisabledOnEdit?: boolean
}

function createLocalizedText(value: string): LocalizedInfoText {
  return {
    zh: value,
    en: value,
    ja: value,
    ko: value,
    th: value,
  }
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
  return {
    zh: value?.zh?.trim() || firstValue,
    en: value?.en?.trim() || firstValue,
    ja: value?.ja?.trim() || firstValue,
    ko: value?.ko?.trim() || firstValue,
    th: value?.th?.trim() || firstValue,
  }
}

function isLocalizedText(
  value: DataFormItemValue['content'],
): value is LocalizedInfoText {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function normalizeDataFormFiles(
  value: DataFormItemValue['content'],
): StandardSpecSupplementFile[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => ({
      uid: item.uid,
      name: item.name,
      url: item.url,
    }))
    .filter((item) => item.name)
}

function getFileDataText(files: StandardSpecSupplementFile[]): string {
  return files.map((item) => item.name).join('、')
}

function normalizeDataFormInfo(value: DataFormItemValue | undefined): DataFormInfo {
  const type = value?.type ?? defaultDataFormItemValue.type
  if (type === 'label') {
    const textContent = isLocalizedText(value?.content)
      ? value.content
      : createLocalizedText(
          typeof value?.content === 'string' ? value.content : '',
        )
    return {
      type,
      content: completeLocalizedText(textContent),
    }
  }
  if (type === 'file') {
    return {
      type,
      content: normalizeDataFormFiles(value?.content),
    }
  }
  return {
    type,
    content: typeof value?.content === 'string' ? value.content.trim() : '',
  }
}

function getDataFormDisplayTextMap(
  content: StandardSpecSupplementContent,
): LocalizedInfoText {
  if (typeof content === 'string') return createLocalizedText(content)
  if (Array.isArray(content)) {
    return createLocalizedText(getFileDataText(content))
  }
  return completeLocalizedText(content)
}

function getNameValue(item: ManagedInformationItem): DataFormItemValue {
  if (!item.nameInfo) {
    return {
      type: 'label',
      content: item.name,
    }
  }
  return {
    type: item.nameInfo.type,
    content: item.nameInfo.content as DataFormItemValue['content'],
  }
}

function getNameDisplayMap(item: ManagedInformationItem): LocalizedInfoText {
  return item.nameInfo ? getDataFormDisplayTextMap(item.nameInfo.content) : item.name
}

function getSupplementValue(item: ManagedInformationItem): DataFormItemValue {
  if (!item.supplement) return { ...defaultDataFormItemValue }
  return {
    type: item.supplement.type,
    content: item.supplement.content as DataFormItemValue['content'],
  }
}

function getSupplementDisplayMap(item: ManagedInformationItem): LocalizedInfoText {
  return item.supplement
    ? getDataFormDisplayTextMap(item.supplement.content)
    : createLocalizedText('')
}

function hasLocalizedDisplayContent(value: LocalizedInfoText): boolean {
  return Object.values(value).some((text) => text.trim())
}

function createRandomDigits(length = 11): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

function createInformationCode(prefix: string, existingCodes: Set<string>): string {
  let code: string
  do {
    code = `${prefix}_${createRandomDigits()}`
  } while (existingCodes.has(code))
  return code
}

export default function SimpleInformationPage({
  initialItems,
  codePrefix,
  editTitleLabelKey,
  searchPlaceholderLabelKey = 'searchByInformationItem',
  toolbarExtra,
  valueDisabledOnEdit,
}: SimpleInformationPageProps) {
  const { token } = theme.useToken()
  const language = useAuthStore(selectCurrentLanguage)
  const [items, setItems] = useState<ManagedInformationItem[]>(initialItems)
  const [keyword, setKeyword] = useState('')
  const [editingItem, setEditingItem] = useState<ManagedInformationItem | null>(
    null,
  )
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editForm] = Form.useForm<SimpleInformationForm>()
  const primaryOutlineButtonStyle = {
    borderColor: token.colorPrimary,
    color: token.colorPrimary,
  }

  const generateCode = () =>
    createInformationCode(codePrefix, new Set(items.map((item) => item.code)))

  const openCreateModal = () => {
    setEditingItem(null)
    editForm.resetFields()
    editForm.setFieldsValue({
      code: generateCode(),
      value: '',
      name: { type: 'label', content: createLocalizedText('') },
      supplement: { ...defaultDataFormItemValue },
    })
    setEditModalOpen(true)
  }

  const openEditModal = (record: ManagedInformationItem) => {
    setEditingItem(record)
    editForm.setFieldsValue({
      code: record.code,
      value: record.value,
      name: getNameValue(record),
      supplement: getSupplementValue(record),
    })
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
    setEditingItem(null)
    editForm.resetFields()
  }

  const saveItem = async () => {
    const values = await editForm.validateFields()
    const nameInfo = normalizeDataFormInfo(values.name)
    const nameDisplayMap = getDataFormDisplayTextMap(nameInfo.content)
    const supplement = normalizeDataFormInfo(values.supplement)
    const supplementDisplayMap = getDataFormDisplayTextMap(supplement.content)
    const nextSupplement = hasLocalizedDisplayContent(supplementDisplayMap)
      ? supplement
      : undefined

    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                value: values.value?.trim(),
                name: nameDisplayMap,
                nameInfo,
                supplement: nextSupplement,
              }
            : item,
        ),
      )
    } else {
      const code = values.code || generateCode()
      const newItem: ManagedInformationItem = {
        id: `${codePrefix.toLowerCase()}-${code.toLowerCase()}`,
        code,
        value: values.value?.trim(),
        name: nameDisplayMap,
        nameInfo,
        supplement: nextSupplement,
      }
      setItems((prev) => [newItem, ...prev])
    }
    closeEditModal()
  }

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? items.filter((item) => {
        const nameMap = getNameDisplayMap(item)
        const supplementMap = getSupplementDisplayMap(item)
        const textValues = [
          item.code,
          item.value,
          ...Object.values(nameMap),
          ...Object.values(supplementMap),
        ].filter(Boolean) as string[]
        return textValues.some((value) =>
          value.toLowerCase().includes(keywordLower),
        )
      })
    : items

  const columns: ColumnsType<ManagedInformationItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="code" />,
      dataIndex: 'code',
      width: 200,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="name" />,
      key: 'name',
      width: 260,
      render: (_, record) => {
        const nameMap = getNameDisplayMap(record)
        return renderTableEmptyPlaceholder(nameMap[language] ?? nameMap.en)
      },
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
      key: 'supplement',
      width: 260,
      render: (_, record) => {
        const supplementMap = getSupplementDisplayMap(record)
        return renderTableEmptyPlaceholder(
          supplementMap[language] ?? supplementMap.en,
        )
      },
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
        {toolbarExtra}
        <Button
          icon={<PlusOutlined />}
          onClick={openCreateModal}
          style={primaryOutlineButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="newStandardSpec" />
        </Button>
        <Input
          placeholder={getLabel(searchPlaceholderLabelKey, language)}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
      />
      <DraggableModal
        title={
          <LanguageLabel
            langKey={language}
            labelKey={editingItem ? editTitleLabelKey : 'newStandardSpec'}
          />
        }
        open={editModalOpen}
        onOk={saveItem}
        onCancel={closeEditModal}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
      >
        <Form form={editForm} layout="vertical" size="small">
          <Form.Item
            name="code"
            label={<LanguageLabel langKey={language} labelKey="code" />}
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="value"
            label={<LanguageLabel langKey={language} labelKey="value" />}
            rules={[{ required: true, message: getLabel('pleaseInputValue', language) }]}
          >
            <Input disabled={valueDisabledOnEdit && !!editingItem} />
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
            name="supplement"
            langKey={language}
            type={['text', 'label', 'file']}
            label={<LanguageLabel langKey={language} labelKey="supplement" />}
          />
        </Form>
      </DraggableModal>
    </>
  )
}
