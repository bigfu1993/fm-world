import { Button, Form, Input, Radio, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { ReactNode } from 'react';
import LanguageLabel from '@/components/LanguageLabel';
import { getLabel, type LabelKey } from '@/components/LanguageLabel/LabelMap';
import LanguageText from '@/components/LanguageText';
import { useGlobalLanguages } from '@/context/GlobalLanguageContext';
import type { GlobalLanguage } from '@/mock/languages';
import { useAuthStore } from '@/store/useAuthStore';
import type { LocalizedText } from '@/types/destination';
import type { LanguageCode } from '@/types/system';

export type DataFormItemType = 'text' | 'label' | 'file';
export type DataFormItemContent = LocalizedText | string | UploadFile[];

export interface DataFormItemValue {
  type: DataFormItemType;
  content?: DataFormItemContent;
}

interface DataFormItemProps {
  name: string | (string | number)[];
  label?: ReactNode;
  langKey: LanguageCode;
  type?: DataFormItemType[];
  disabled?: boolean;
  required?: boolean;
  requiredMessage?: string;
}

interface DataFormItemTypeOption {
  type: DataFormItemType;
  labelKey: LabelKey;
}

interface LanguageRowsProps {
  langKey: LanguageCode;
  value?: LocalizedText;
  onChange?: (value: LocalizedText) => void;
  disabled?: boolean;
}

export const defaultDataFormItemTypes: DataFormItemType[] = ['text', 'label'];

export const defaultDataFormItemValue: DataFormItemValue = {
  type: 'text',
  content: undefined,
};

export const DATA_FORM_ITEM_TYPE_LABEL_KEYS: Record<
  DataFormItemType,
  LabelKey
> = {
  text: 'dataFormTypeText',
  label: 'dataFormTypeLabel',
  file: 'dataFormTypeFile',
};

const dataFormItemTypeOptions: DataFormItemTypeOption[] = [
  {
    type: 'text',
    labelKey: DATA_FORM_ITEM_TYPE_LABEL_KEYS.text,
  },
  {
    type: 'label',
    labelKey: DATA_FORM_ITEM_TYPE_LABEL_KEYS.label,
  },
  {
    type: 'file',
    labelKey: DATA_FORM_ITEM_TYPE_LABEL_KEYS.file,
  },
];

const dataFormItemTypeValues = new Set(
  dataFormItemTypeOptions.map((item) => item.type),
);

function useAvailableLanguages(): GlobalLanguage[] {
  const globalLanguages = useGlobalLanguages();
  const accountLanguages = useAuthStore((s) => s.user?.languages) ?? [];
  return globalLanguages.filter((g) =>
    accountLanguages.includes(g.code as LanguageCode),
  );
}

function DataFormLanguageRows({
  langKey,
  value,
  onChange,
  disabled,
}: LanguageRowsProps) {
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
            disabled={disabled}
            value={value?.[lang.code as LanguageCode]}
            onChange={(event) =>
              onChange?.({
                ...value,
                [lang.code]: event.target.value,
              } as LocalizedText)
            }
          />
        </div>
      ))}
    </>
  );
}

function toNamePath(name: DataFormItemProps['name']): (string | number)[] {
  return Array.isArray(name) ? name : [name];
}

function normalizeUploadValue(
  event: UploadFile[] | { fileList?: UploadFile[] },
) {
  if (Array.isArray(event)) return event;
  return event?.fileList ?? [];
}

function normalizeTypeOptions(type: DataFormItemProps['type']) {
  const sourceTypes = type?.length ? type : defaultDataFormItemTypes;
  const seen = new Set<DataFormItemType>();
  const enabledTypes = sourceTypes.filter((item): item is DataFormItemType => {
    if (!dataFormItemTypeValues.has(item) || seen.has(item)) return false;
    seen.add(item);
    return true;
  });
  return enabledTypes.length ? enabledTypes : defaultDataFormItemTypes;
}

function hasLabelContent(value: LocalizedText | undefined) {
  return Object.values(value ?? {}).some((item) => item.trim());
}

export default function DataFormItem({
  name,
  label,
  langKey,
  type,
  disabled,
  required,
  requiredMessage,
}: DataFormItemProps) {
  const form = Form.useFormInstance();
  const namePath = useMemo(() => toNamePath(name), [name]);
  const typeName = useMemo(() => [...namePath, 'type'], [namePath]);
  const contentName = useMemo(() => [...namePath, 'content'], [namePath]);
  const enabledTypes = useMemo(() => normalizeTypeOptions(type), [type]);
  const defaultType = enabledTypes[0];
  const watchedType = Form.useWatch(typeName, form) as
    | DataFormItemType
    | undefined;
  const activeType =
    watchedType && enabledTypes.includes(watchedType)
      ? watchedType
      : defaultType;
  const finalRequiredMessage =
    requiredMessage ?? getLabel('pleaseInputSupplementContent', langKey);
  const contentLabel = enabledTypes.length === 1 ? label : undefined;

  useEffect(() => {
    const currentType = form.getFieldValue(typeName) as
      | DataFormItemType
      | undefined;
    if (currentType && enabledTypes.includes(currentType)) return;
    form.setFieldValue(typeName, defaultType);
    form.setFieldValue(contentName, undefined);
  }, [contentName, defaultType, enabledTypes, form, typeName]);

  const changeType = (nextType: DataFormItemType) => {
    form.setFieldValue(typeName, nextType);
    form.setFieldValue(contentName, undefined);
  };

  const textRules = required
    ? [{ required: true, message: finalRequiredMessage }]
    : undefined;
  const labelRules = required
    ? [
        {
          validator: (_: unknown, value: LocalizedText | undefined) => {
            if (hasLabelContent(value)) return Promise.resolve();
            return Promise.reject(new Error(finalRequiredMessage));
          },
        },
      ]
    : undefined;
  const fileRules = required
    ? [
        {
          validator: (_: unknown, value: UploadFile[] | undefined) => {
            if (value?.length) return Promise.resolve();
            return Promise.reject(new Error(finalRequiredMessage));
          },
        },
      ]
    : undefined;

  const renderContentItem = () => {
    if (activeType === 'text') {
      return (
        <Form.Item name={contentName} label={contentLabel} rules={textRules}>
          <Input
            disabled={disabled}
            placeholder={getLabel('dataFormTextPlaceholder', langKey)}
          />
        </Form.Item>
      );
    }
    if (activeType === 'label') {
      return (
        <Form.Item
          name={contentName}
          label={contentLabel}
          required={required}
          rules={labelRules}
        >
          <DataFormLanguageRows langKey={langKey} disabled={disabled} />
        </Form.Item>
      );
    }
    return (
      <Form.Item
        name={contentName}
        label={contentLabel}
        required={required}
        valuePropName="fileList"
        getValueFromEvent={normalizeUploadValue}
        rules={fileRules}
      >
        <Upload beforeUpload={() => false}>
          <Button disabled={disabled} size="small" icon={<UploadOutlined />}>
            <LanguageLabel langKey={langKey} labelKey="dataFormFileUpload" />
          </Button>
        </Upload>
      </Form.Item>
    );
  };

  const contentItem = renderContentItem();

  if (enabledTypes.length === 1) {
    return contentItem;
  }

  return (
    <Space direction="vertical" size={8} style={{ width: '100%' }}>
      <Form.Item
        name={typeName}
        label={label}
        required={required}
        initialValue={defaultType}
      >
        <Radio.Group
          disabled={disabled}
          onChange={(event) => changeType(event.target.value)}
        >
          {enabledTypes.map((item) => (
            <Radio key={item} value={item}>
              <LanguageLabel
                langKey={langKey}
                labelKey={DATA_FORM_ITEM_TYPE_LABEL_KEYS[item]}
              />
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      {contentItem}
    </Space>
  );
}
