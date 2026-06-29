import { Button, Form, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import DraggableModal from '@/components/DraggableModal'
import DataFormItem, { type DataFormItemValue } from '@/components/DataFormItem'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import type { CultureInfoItem } from '@/mock/information'
import type { LanguageCode } from '@/types/system'

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
}

export const CULTURE_TYPE_THEME_COLOR = '#52c41a'
const typeThemeOutlineButtonStyle = {
  borderColor: CULTURE_TYPE_THEME_COLOR,
  color: CULTURE_TYPE_THEME_COLOR,
}
const typeCreateButtonStyle = {
  ...typeThemeOutlineButtonStyle,
  marginBottom: 16,
}

export type CultureCustomTypeFilter = string

export interface CultureCustomTypeItem {
  code: string
  value: string
  name: CultureInfoItem['type']
}

interface CultureCustomTypeForm {
  code: string
  value: DataFormItemValue
  name: DataFormItemValue
}

interface TypeListModalProps {
  open: boolean
  language: LanguageCode
  cultureCustomTypes: CultureCustomTypeItem[]
  onCancel: () => void
  onCultureCustomTypesChange: (nextTypes: CultureCustomTypeItem[]) => void
}

export const cultureCustomInitialTypes: CultureCustomTypeItem[] = [
  {
    code: 'CULTURE_TYPE_18492057361',
    value: 'CULTURE',
    name: {
      zh: '文化',
      en: 'Culture',
      ja: '文化',
      ko: '문화',
      th: 'วัฒนธรรม',
    },
  },
  {
    code: 'CULTURE_TYPE_62947105834',
    value: 'CUSTOMS',
    name: {
      zh: '习俗',
      en: 'Customs',
      ja: '習慣',
      ko: '관습',
      th: 'ธรรมเนียม',
    },
  },
  {
    code: 'CULTURE_TYPE_51720498361',
    value: 'RELIGION',
    name: {
      zh: '宗教',
      en: 'Religion',
      ja: '宗教',
      ko: '종교',
      th: 'ศาสนา',
    },
  },
]

export function normalizeCultureCustomTypeValue(value: string): string {
  return (
    value
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'TYPE'
  )
}

function completeLocalizedText(
  value: Partial<CultureInfoItem['type']> | undefined,
  fallback: string,
): CultureInfoItem['type'] {
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

function getTypeNameContent(
  value: DataFormItemValue | undefined,
): CultureInfoItem['type'] | undefined {
  const content = value?.content
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return undefined
  }
  return content
}

function getTypeValueContent(value: DataFormItemValue | undefined) {
  const content = value?.content
  return typeof content === 'string' ? content : ''
}

function createRandomDigits(length = 11): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

function createCultureCustomTypeCode(existingCodes: Set<string>): string {
  let code = ''
  do {
    code = `CULTURE_TYPE_${createRandomDigits()}`
  } while (existingCodes.has(code))
  return code
}

export default function TypeListModal({
  open,
  language,
  cultureCustomTypes,
  onCancel,
  onCultureCustomTypesChange,
}: TypeListModalProps) {
  const [typeCreateModalOpen, setTypeCreateModalOpen] = useState(false)
  const [typeForm] = Form.useForm<CultureCustomTypeForm>()

  const openTypeCreateModal = () => {
    typeForm.resetFields()
    typeForm.setFieldValue(
      'code',
      createCultureCustomTypeCode(
        new Set(cultureCustomTypes.map((item) => item.code)),
      ),
    )
    setTypeCreateModalOpen(true)
  }

  const closeTypeCreateModal = () => {
    setTypeCreateModalOpen(false)
    typeForm.resetFields()
  }

  const saveCultureCustomType = async () => {
    const values = await typeForm.validateFields()
    const value = normalizeCultureCustomTypeValue(
      getTypeValueContent(values.value),
    )
    if (cultureCustomTypes.some((item) => item.value === value)) {
      typeForm.setFields([
        {
          name: ['value', 'content'],
          errors: [getLabel('valueExists', language)],
        },
      ])
      return
    }
    const newType: CultureCustomTypeItem = {
      code: values.code,
      value,
      name: completeLocalizedText(getTypeNameContent(values.name), value),
    }
    onCultureCustomTypesChange([newType, ...cultureCustomTypes])
    closeTypeCreateModal()
  }

  const typeColumns: ColumnsType<CultureCustomTypeItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="code" />,
      dataIndex: 'code',
      width: 220,
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="name" />,
      dataIndex: 'name',
      width: 280,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.name} />
      ),
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
        title={
          <LanguageLabel langKey={language} labelKey="cultureCustomTypeList" />
        }
        open={open}
        onCancel={onCancel}
        footer={null}
        themeColor={CULTURE_TYPE_THEME_COLOR}
        width={860}
      >
        <Button
          size="small"
          icon={<PlusOutlined />}
          style={typeCreateButtonStyle}
          onClick={openTypeCreateModal}
        >
          <LanguageLabel langKey={language} labelKey="newCultureCustomType" />
        </Button>
        <Table
          rowKey="code"
          columns={typeColumns}
          dataSource={cultureCustomTypes}
          size="small"
          pagination={false}
        />
      </DraggableModal>
      <DraggableModal
        title={
          <LanguageLabel langKey={language} labelKey="newCultureCustomType" />
        }
        open={typeCreateModalOpen}
        onOk={saveCultureCustomType}
        onCancel={closeTypeCreateModal}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        themeColor={CULTURE_TYPE_THEME_COLOR}
        width={720}
      >
        <Form form={typeForm} layout="vertical" size="small">
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
            langKey={language}
            name="name"
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
