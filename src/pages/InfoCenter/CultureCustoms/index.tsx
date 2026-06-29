import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Table,
  theme,
} from 'antd'
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import DraggableModal from '@/components/DraggableModal'
import DataFormItem, {
  defaultDataFormItemValue,
  type DataFormItemValue,
} from '@/components/DataFormItem'
import {
  CULTURE_INFOS,
  type CultureInfoItem,
  type StandardSpecSupplementContent,
  type StandardSpecSupplementFile,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import { renderTableEmptyPlaceholder } from '@/utils/table'
import TypeListModal, {
  CULTURE_TYPE_THEME_COLOR,
  cultureCustomInitialTypes,
  type CultureCustomTypeFilter,
  type CultureCustomTypeItem,
} from './TypeListModal'

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}
const typeListPrimaryButtonStyle = {
  backgroundColor: CULTURE_TYPE_THEME_COLOR,
  borderColor: CULTURE_TYPE_THEME_COLOR,
}
const toolbarDividerStyle = {
  height: 24,
}

type CultureCustomFormMode = 'create' | 'edit'

interface CultureCustomForm {
  code: string
  typeKey: CultureCustomTypeFilter
  name: DataFormItemValue
  supplement: DataFormItemValue
}

const defaultCultureCustomTypeName: CultureInfoItem['type'] = {
  zh: '类型',
  en: 'Type',
  ja: 'タイプ',
  ko: '유형',
  th: 'ประเภท',
}

function getCultureCustomTypeKey(
  item: CultureInfoItem,
  cultureCustomTypes: CultureCustomTypeItem[],
): CultureCustomTypeFilter {
  return (
    cultureCustomTypes.find((typeItem) => typeItem.name.en === item.type.en)
      ?.code ?? item.type.en.toLowerCase()
  )
}

function getCultureCustomTypeByKey(
  cultureCustomTypes: CultureCustomTypeItem[],
  typeKey: CultureCustomTypeFilter,
) {
  return cultureCustomTypes.find((item) => item.code === typeKey)
}

function createLocalizedText(value: string): CultureInfoItem['name'] {
  return {
    zh: value,
    en: value,
    ja: value,
    ko: value,
    th: value,
  }
}

function completeLocalizedText(
  value: Partial<CultureInfoItem['description']> | undefined,
  fallback = '',
): CultureInfoItem['description'] {
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
): value is CultureInfoItem['description'] {
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

function normalizeDataFormInfo(value: DataFormItemValue | undefined): {
  type: DataFormItemValue['type']
  content: StandardSpecSupplementContent
} {
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
): CultureInfoItem['description'] {
  if (typeof content === 'string') return createLocalizedText(content)
  if (Array.isArray(content)) {
    return createLocalizedText(getFileDataText(content))
  }
  return completeLocalizedText(content)
}

function getCultureCustomNameValue(
  item: CultureInfoItem,
): DataFormItemValue {
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

function getCultureCustomNameDisplayMap(
  item: CultureInfoItem,
): CultureInfoItem['name'] {
  return item.nameInfo
    ? getDataFormDisplayTextMap(item.nameInfo.content)
    : item.name
}

function getCultureCustomSupplementValue(
  item: CultureInfoItem,
): DataFormItemValue {
  if (!item.supplement) {
    if (!hasLocalizedDisplayContent(item.description)) {
      return { ...defaultDataFormItemValue }
    }
    return {
      type: 'label',
      content: item.description,
    }
  }
  return {
    type: item.supplement.type,
    content: item.supplement.content as DataFormItemValue['content'],
  }
}

function getCultureCustomSupplementDisplayMap(
  item: CultureInfoItem,
): CultureInfoItem['description'] {
  return item.supplement
    ? getDataFormDisplayTextMap(item.supplement.content)
    : item.description
}

function hasLocalizedDisplayContent(
  value: CultureInfoItem['description'],
): boolean {
  return Object.values(value).some((text) => text.trim())
}

function createFallbackCultureCustomTypeName(
  typeKey: CultureCustomTypeFilter,
): CultureInfoItem['type'] {
  return {
    ...defaultCultureCustomTypeName,
    zh: typeKey,
    en: typeKey,
  }
}

function createRandomDigits(length = 11): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

function createCultureCustomCode(existingCodes: Set<string>): string {
  let code = ''
  do {
    code = `CULTURE_${createRandomDigits()}`
  } while (existingCodes.has(code))
  return code
}

export default function CultureCustomsPage() {
  const { token } = theme.useToken()
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')
  const [typeFilter, setTypeFilter] = useState<
    CultureCustomTypeFilter | undefined
  >(undefined)
  const [cultureCustoms, setCultureCustoms] = useState(CULTURE_INFOS)
  const [cultureCustomTypes, setCultureCustomTypes] = useState(
    cultureCustomInitialTypes,
  )
  const [editingItem, setEditingItem] = useState<CultureInfoItem | null>(
    null,
  )
  const [formMode, setFormMode] = useState<CultureCustomFormMode>('create')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [typeModalOpen, setTypeModalOpen] = useState(false)
  const [editForm] = Form.useForm<CultureCustomForm>()
  const primaryOutlineButtonStyle = {
    borderColor: token.colorPrimary,
    color: token.colorPrimary,
  }

  const typeFilterOptions = cultureCustomTypes.map((item) => ({
    label: <LanguageText langKey={language} map={item.name} />,
    selectedLabel: item.name[language] ?? item.name.en,
    value: item.code,
  }))

  const generateCode = () =>
    createCultureCustomCode(new Set(cultureCustoms.map((item) => item.code)))

  const openCreateModal = () => {
    const typeKey = typeFilter ?? cultureCustomTypes[0]?.code ?? 'type'
    setFormMode('create')
    setEditingItem(null)
    editForm.resetFields()
    editForm.setFieldsValue({
      code: generateCode(),
      typeKey,
      name: { ...defaultDataFormItemValue },
      supplement: { ...defaultDataFormItemValue },
    })
    setEditModalOpen(true)
  }

  const openEditModal = (record: CultureInfoItem) => {
    setFormMode('edit')
    setEditingItem(record)
    editForm.setFieldsValue({
      code: record.code,
      typeKey: getCultureCustomTypeKey(record, cultureCustomTypes),
      name: getCultureCustomNameValue(record),
      supplement: getCultureCustomSupplementValue(record),
    })
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
    setEditingItem(null)
    editForm.resetFields()
  }

  const saveCultureCustom = async () => {
    const values = await editForm.validateFields()
    const nameInfo = normalizeDataFormInfo(values.name)
    const nameDisplayMap = getDataFormDisplayTextMap(nameInfo.content)
    const supplement = normalizeDataFormInfo(values.supplement)
    const supplementDisplayMap = getDataFormDisplayTextMap(supplement.content)
    const nextSupplement = hasLocalizedDisplayContent(supplementDisplayMap)
      ? supplement
      : undefined
    if (editingItem) {
      setCultureCustoms((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: nameDisplayMap,
                nameInfo,
                description: supplementDisplayMap,
                supplement: nextSupplement,
              }
            : item,
        ),
      )
    } else {
      const existingCodes = new Set(cultureCustoms.map((item) => item.code))
      const code =
        values.code && !existingCodes.has(values.code)
          ? values.code
          : generateCode()
      const newCultureCustom: CultureInfoItem = {
        id: `culture-${code.toLowerCase()}`,
        code,
        type:
          getCultureCustomTypeByKey(cultureCustomTypes, values.typeKey)
            ?.name ?? createFallbackCultureCustomTypeName(values.typeKey),
        name: nameDisplayMap,
        nameInfo,
        description: supplementDisplayMap,
        supplement: nextSupplement,
      }
      setCultureCustoms((prev) => [newCultureCustom, ...prev])
    }
    closeEditModal()
  }

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = cultureCustoms.filter((item) => {
    if (
      typeFilter &&
      getCultureCustomTypeKey(item, cultureCustomTypes) !== typeFilter
    ) {
      return false
    }
    if (!keywordLower) return true
    const textValues = [
      item.code,
      item.value,
      ...Object.values(item.type),
      ...Object.values(getCultureCustomNameDisplayMap(item)),
      ...Object.values(getCultureCustomSupplementDisplayMap(item)),
    ].filter(Boolean) as string[]
    return textValues.some((value) =>
      value.toLowerCase().includes(keywordLower),
    )
  })

  const columns: ColumnsType<CultureInfoItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="code" />,
      dataIndex: 'code',
      width: 200,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="cultureCustomType" />,
      dataIndex: 'type',
      width: 220,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.type} />
      ),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="name" />,
      key: 'name',
      width: 220,
      render: (_, record) => {
        const nameMap = getCultureCustomNameDisplayMap(record)
        return renderTableEmptyPlaceholder(nameMap[language] ?? nameMap.en)
      },
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="value" />,
      key: 'value',
      width: 160,
      render: (_, record) => renderTableEmptyPlaceholder(record.value),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="supplement" />,
      key: 'supplement',
      width: 220,
      render: (_, record) => {
        const supplementMap = getCultureCustomSupplementDisplayMap(record)
        return renderTableEmptyPlaceholder(
          supplementMap[language] ?? supplementMap.en,
        )
      },
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="actions" />,
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => openEditModal(record)}>
          <LanguageLabel langKey={language} labelKey="edit" />
        </Button>
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
          style={typeListPrimaryButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="cultureCustomTypeList" />
        </Button>
        <Divider type="vertical" style={toolbarDividerStyle} />
        <Button
          icon={<PlusOutlined />}
          onClick={openCreateModal}
          style={primaryOutlineButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="newCultureCustom" />
        </Button>
        <Select
          allowClear
          optionLabelProp="selectedLabel"
          placeholder={getLabel('filterByCultureCustomType', language)}
          value={typeFilter}
          options={typeFilterOptions}
          onChange={setTypeFilter}
          style={{ width: 200 }}
        />
        <Input
          placeholder={getLabel('searchByCultureCustom', language)}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          style={{ width: 280 }}
        />
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 'max-content' }}
      />
      <DraggableModal
        title={
          <LanguageLabel
            langKey={language}
            labelKey={
              formMode === 'create' ? 'newCultureCustom' : 'editCultureCustom'
            }
          />
        }
        open={editModalOpen}
        onOk={saveCultureCustom}
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
            name="typeKey"
            label={<LanguageLabel langKey={language} labelKey="cultureCustomType" />}
            rules={[{ required: true }]}
          >
            <Select
              size="small"
              disabled={formMode === 'edit'}
              options={typeFilterOptions}
            />
          </Form.Item>
          <DataFormItem
            name="name"
            langKey={language}
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
      <TypeListModal
        open={typeModalOpen}
        language={language}
        cultureCustomTypes={cultureCustomTypes}
        onCancel={() => setTypeModalOpen(false)}
        onCultureCustomTypesChange={setCultureCustomTypes}
      />
    </>
  )
}
