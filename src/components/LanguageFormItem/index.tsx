import type { ReactNode } from 'react'
import { Form, Input } from 'antd'
import { LANGUAGES, type LanguageCode } from '@/types/system'
import type { LocalizedText } from '@/types/destination'
import LanguageLabel from '@/components/LanguageLabel'
import { LANGUAGE_NAME_KEYS } from '@/components/LanguageLabel/LabelMap'

interface LanguageRowsProps {
  langKey: LanguageCode
  value?: LocalizedText
  onChange?: (value: LocalizedText) => void
}

function LanguageRows({ langKey, value, onChange }: LanguageRowsProps) {
  return (
    <>
      {LANGUAGES.map((l) => (
        <div key={l.code} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ width: 120 }}>
            <LanguageLabel langKey={langKey} labelKey={LANGUAGE_NAME_KEYS[l.code]} />
          </span>
          <Input
            value={value?.[l.code]}
            onChange={(e) => onChange?.({ ...value, [l.code]: e.target.value } as LocalizedText)}
          />
        </div>
      ))}
    </>
  )
}

interface LanguageFormItemProps {
  langKey: LanguageCode
  label?: ReactNode
  name?: string | (string | number)[]
  mode?: 'edit' | 'view'
  value?: LocalizedText
  required?: boolean
  requiredMessage?: string
}

export default function LanguageFormItem({
  langKey,
  label,
  name = 'names',
  mode = 'edit',
  value,
  required,
  requiredMessage,
}: LanguageFormItemProps) {
  if (mode === 'view') {
    return (
      <>
        {label}
        {LANGUAGES.map((l) => (
          <div key={l.code} style={{ display: 'flex', marginBottom: 8 }}>
            <span style={{ width: 120 }}>
              <LanguageLabel langKey={langKey} labelKey={LANGUAGE_NAME_KEYS[l.code]} />
            </span>
            <div>{value?.[l.code]}</div>
          </div>
        ))}
      </>
    )
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required: true, message: requiredMessage }] : undefined}
    >
      <LanguageRows langKey={langKey} />
    </Form.Item>
  )
}
