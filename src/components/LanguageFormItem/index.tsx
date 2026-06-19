import type { ReactNode } from 'react'
import { Form, Input } from 'antd'
import type { LanguageCode } from '@/types/system'
import type { LocalizedText } from '@/types/destination'
import LanguageLabel from '@/components/LanguageLabel'
import { LANGUAGE_NAME_KEYS } from '@/components/LanguageLabel/LabelMap'
import { useGlobalLanguages } from '@/context/GlobalLanguageContext'
import { useAuthStore } from '@/store/useAuthStore'

function useAvailableLanguages(): LanguageCode[] {
  const globalLanguages = useGlobalLanguages()
  const accountLanguages = useAuthStore((s) => s.user?.languages) ?? []
  return accountLanguages.filter((code) => globalLanguages.some((g) => g.code === code))
}

interface LanguageRowsProps {
  langKey: LanguageCode
  value?: LocalizedText
  onChange?: (value: LocalizedText) => void
}

function LanguageRows({ langKey, value, onChange }: LanguageRowsProps) {
  const availableLanguages = useAvailableLanguages()
  return (
    <>
      {availableLanguages.map((code) => (
        <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ width: 120 }}>
            <LanguageLabel langKey={langKey} labelKey={LANGUAGE_NAME_KEYS[code]} />
          </span>
          <Input
            value={value?.[code]}
            onChange={(e) => onChange?.({ ...value, [code]: e.target.value } as LocalizedText)}
            style={{ fontSize: 12 }}
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
  const availableLanguages = useAvailableLanguages()

  if (mode === 'view') {
    return (
      <>
        {label}
        {availableLanguages.map((code) => (
          <div key={code} style={{ display: 'flex', marginBottom: 8 }}>
            <span style={{ width: 120 }}>
              <LanguageLabel langKey={langKey} labelKey={LANGUAGE_NAME_KEYS[code]} />
            </span>
            <div>{value?.[code]}</div>
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
