import type { ReactNode } from 'react';
import { Form, Input } from 'antd';
import type { LanguageCode } from '@/types/system';
import type { LocalizedText } from '@/types/destination';
import type { GlobalLanguage } from '@/mock/languages';
import LanguageText from '@/components/LanguageText';
import { useGlobalLanguages } from '@/context/GlobalLanguageContext';
import { useAuthStore } from '@/store/useAuthStore';

function useAvailableLanguages(): GlobalLanguage[] {
  const globalLanguages = useGlobalLanguages();
  const accountLanguages = useAuthStore((s) => s.user?.languages) ?? [];
  return globalLanguages.filter((g) =>
    accountLanguages.includes(g.code as LanguageCode),
  );
}

interface LanguageRowsProps {
  langKey: LanguageCode;
  value?: LocalizedText;
  onChange?: (value: LocalizedText) => void;
}

function LanguageRows({ langKey, value, onChange }: LanguageRowsProps) {
  const availableLanguages = useAvailableLanguages();
  return (
    <>
      {availableLanguages.map((lang) => (
        <div
          key={lang.code}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}
        >
          <span style={{ width: 120 }}>
            <LanguageText langKey={langKey} map={lang} />
          </span>
          <Input
            value={value?.[lang.code as LanguageCode]}
            onChange={(e) =>
              onChange?.({
                ...value,
                [lang.code]: e.target.value,
              } as LocalizedText)
            }
            style={{ fontSize: 12 }}
          />
        </div>
      ))}
    </>
  );
}

interface LanguageFormItemProps {
  langKey: LanguageCode;
  label?: ReactNode;
  name?: string | (string | number)[];
  mode?: 'edit' | 'view';
  value?: LocalizedText;
  required?: boolean;
  requiredMessage?: string;
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
  const availableLanguages = useAvailableLanguages();

  if (mode === 'view') {
    return (
      <>
        {label}
        {availableLanguages.map((lang) => (
          <div key={lang.code} style={{ display: 'flex', marginBottom: 8 }}>
            <span style={{ width: 120 }}>
              <LanguageText langKey={langKey} map={lang} />
            </span>
            <div>{value?.[lang.code as LanguageCode]}</div>
          </div>
        ))}
      </>
    );
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={
        required ? [{ required: true, message: requiredMessage }] : undefined
      }
    >
      <LanguageRows langKey={langKey} />
    </Form.Item>
  );
}
