import { Form, Input, InputNumber, Select } from 'antd'
import type { ReactNode } from 'react'
import DraggableModal from '@/components/DraggableModal'
import DataFormItem from '@/components/DataFormItem'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel, type LabelKey } from '@/components/LanguageLabel/LabelMap'
import type { CustomSupplementInfo } from '@/types/infoBinding'
import type { LanguageCode } from '@/types/system'

export interface TourismInfoNumberField {
  kind: 'number'
  name: string
  labelKey: LabelKey
  min?: number
  max?: number
  step?: number
}

export interface TourismInfoDataField {
  kind: 'select'
  name: string
  labelKey: LabelKey
  options: TourismInfoSelectOption[]
  required?: boolean
  mode?: 'multiple'
}

export type TourismInfoBindingField =
  | TourismInfoNumberField
  | TourismInfoDataField

export interface TourismInfoSelectOption {
  label: ReactNode
  value: string
}

export interface TourismInfoBindingSection {
  titleKey: LabelKey
  fields: TourismInfoBindingField[]
}

export interface TourismInfoBindingFormValue {
  displayZoom?: number | null
  customSupplement?: CustomSupplementInfo
}

interface TourismInfoBindingModalProps<
  T extends TourismInfoBindingFormValue,
> {
  open: boolean
  language: LanguageCode
  entityCode?: string
  entityName?: Record<string, string>
  entityCodeLabelKey: LabelKey
  entityNameLabelKey: LabelKey
  initialValues: Partial<T>
  sections: TourismInfoBindingSection[]
  width?: number
  columnCount?: number
  onCancel: () => void
  onSave: (values: T) => void
}

const DEFAULT_DISPLAY_ZOOM = 8
const MIN_DISPLAY_ZOOM = 0.8
const MAX_DISPLAY_ZOOM = 100
const modalHeaderGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  columnGap: 24,
  marginBottom: 8,
} as const
const entityNameDisplayStyle = {
  minHeight: 24,
  display: 'flex',
  alignItems: 'center',
} as const
const sectionTitleStyle = {
  fontSize: 14,
  margin: '0 0 16px',
} as const
const supplementSectionStyle = {
  marginTop: 16,
} as const
const informationPopupContainer = (triggerNode: HTMLElement) =>
  triggerNode.parentElement ?? document.body

function normalizeDisplayZoom(value?: number | null) {
  const nextValue = value ?? DEFAULT_DISPLAY_ZOOM
  return Math.min(MAX_DISPLAY_ZOOM, Math.max(MIN_DISPLAY_ZOOM, nextValue))
}

function createLayoutStyle(columnCount: number) {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
    columnGap: 24,
    alignItems: 'start',
  } as const
}

export default function TourismInfoBindingModal<
  T extends TourismInfoBindingFormValue,
>({
  open,
  language,
  entityCode,
  entityName,
  entityCodeLabelKey,
  entityNameLabelKey,
  initialValues,
  sections,
  width = 1080,
  columnCount = 2,
  onCancel,
  onSave,
}: TourismInfoBindingModalProps<T>) {
  const [form] = Form.useForm<T>()

  useEffect(() => {
    if (!open) return
    form.resetFields()
    form.setFieldsValue({
      ...initialValues,
      displayZoom: normalizeDisplayZoom(initialValues.displayZoom),
    } as T)
  }, [entityCode, form, initialValues, open])

  const save = async () => {
    const values = await form.validateFields()
    onSave({
      ...values,
      displayZoom: normalizeDisplayZoom(values.displayZoom),
    } as T)
  }

  return (
    <DraggableModal
      title={<LanguageLabel langKey={language} labelKey="infoBinding" />}
      open={open}
      onOk={save}
      onCancel={onCancel}
      okButtonProps={{ size: 'small' }}
      cancelButtonProps={{ size: 'small' }}
      destroyOnHidden
      width={width}
    >
      <Form form={form} layout="vertical" size="small">
        <div style={modalHeaderGridStyle}>
          <Form.Item
            label={<LanguageLabel langKey={language} labelKey={entityCodeLabelKey} />}
          >
            <Input size="small" disabled value={entityCode} />
          </Form.Item>
          <Form.Item
            label={<LanguageLabel langKey={language} labelKey={entityNameLabelKey} />}
          >
            <div style={entityNameDisplayStyle}>
              {entityName ? (
                <LanguageText langKey={language} map={entityName} />
              ) : null}
            </div>
          </Form.Item>
          <Form.Item
            name="displayZoom"
            label={<LanguageLabel langKey={language} labelKey="displayZoom" />}
          >
            <InputNumber
              size="small"
              min={MIN_DISPLAY_ZOOM}
              max={MAX_DISPLAY_ZOOM}
              step={0.1}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>
        <div style={createLayoutStyle(columnCount)}>
          {sections.map((section) => (
            <div key={section.titleKey}>
              <h3 style={sectionTitleStyle}>
                <LanguageLabel
                  langKey={language}
                  labelKey={section.titleKey}
                  fontSize={14}
                />
              </h3>
              {section.fields.map((field) => {
                if (field.kind === 'number') {
                  return (
                    <Form.Item
                      key={field.name}
                      name={field.name}
                      label={<LanguageLabel langKey={language} labelKey={field.labelKey} />}
                    >
                      <InputNumber
                        size="small"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  )
                }
                return (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    label={<LanguageLabel langKey={language} labelKey={field.labelKey} />}
                    rules={
                      field.required
                        ? [
                            {
                              required: true,
                              message: getLabel('missingRequiredInfo', language),
                            },
                          ]
                        : undefined
                    }
                  >
                    <Select
                      size="small"
                      allowClear
                      mode={field.mode}
                      options={field.options}
                      placeholder={getLabel(field.labelKey, language)}
                      getPopupContainer={informationPopupContainer}
                    />
                  </Form.Item>
                )
              })}
            </div>
          ))}
        </div>
        <div style={supplementSectionStyle}>
          <DataFormItem
            name="customSupplement"
            label={
              <LanguageLabel langKey={language} labelKey="customSupplementInfo" />
            }
            langKey={language}
            type={['label']}
          />
        </div>
      </Form>
    </DraggableModal>
  )
}
