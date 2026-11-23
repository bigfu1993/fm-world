import { Button, Form, Input, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import DraggableModal from '@/components/DraggableModal';
import DataFormItem, { type DataFormItemValue } from '@/components/DataFormItem';
import LanguageLabel from '@/components/LanguageLabel';
import LanguageText from '@/components/LanguageText';
import { getLabel } from '@/components/LanguageLabel/LabelMap';
import type { StandardSpecInfoItem } from '@/mock/information';
import type { LanguageCode } from '@/types/system';

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const;
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
};
export const STANDARD_SPEC_TYPE_THEME_COLOR = '#52c41a';
const typeThemeOutlineButtonStyle = {
  borderColor: STANDARD_SPEC_TYPE_THEME_COLOR,
  color: STANDARD_SPEC_TYPE_THEME_COLOR,
};
const typeCreateButtonStyle = {
  ...typeThemeOutlineButtonStyle,
  marginBottom: 16,
};

export type StandardSpecTypeFilter = string;

export interface StandardSpecTypeItem {
  code: string;
  value: string;
  name: StandardSpecInfoItem['type'];
}

interface StandardSpecTypeForm {
  code: string;
  value: DataFormItemValue;
  name: DataFormItemValue;
}

interface TypeListModalProps {
  open: boolean;
  language: LanguageCode;
  standardSpecTypes: StandardSpecTypeItem[];
  onCancel: () => void;
  onStandardSpecTypesChange: (nextTypes: StandardSpecTypeItem[]) => void;
}

export const standardSpecInitialTypes: StandardSpecTypeItem[] = [
  {
    code: 'STANDARD_TYPE_10492837561',
    value: 'VOLTAGE',
    name: {
      zh: '电压',
      en: 'Voltage',
      ja: '電圧',
      ko: '전압',
      th: 'แรงดันไฟฟ้า',
    },
  },
  {
    code: 'STANDARD_TYPE_58392017462',
    value: 'PLUG',
    name: {
      zh: '插头',
      en: 'Plug',
      ja: 'プラグ',
      ko: '플러그',
      th: 'ปลั๊ก',
    },
  },
  {
    code: 'STANDARD_TYPE_73104928650',
    value: 'TEL_POLICE',
    name: {
      zh: '警察电话',
      en: 'Police Phone',
      ja: '警察電話',
      ko: '경찰 전화',
      th: 'เบอร์ตำรวจ',
    },
  },
  {
    code: 'STANDARD_TYPE_29061473815',
    value: 'TEL_FIRE',
    name: {
      zh: '火警电话',
      en: 'Fire Phone',
      ja: '消防電話',
      ko: '소방 전화',
      th: 'เบอร์ดับเพลิง',
    },
  },
  {
    code: 'STANDARD_TYPE_64820591734',
    value: 'TEL_HOSPITAL',
    name: {
      zh: '急救电话',
      en: 'Hospital Phone',
      ja: '救急電話',
      ko: '응급 전화',
      th: 'เบอร์ฉุกเฉินทางการแพทย์',
    },
  },
  {
    code: 'STANDARD_TYPE_90517362841',
    value: 'TEL_TRAFFIC_ACCIDENT',
    name: {
      zh: '交通事故电话',
      en: 'Traffic Accident Phone',
      ja: '交通事故電話',
      ko: '교통사고 전화',
      th: 'เบอร์แจ้งอุบัติเหตุจราจร',
    },
  },
];

export function normalizeStandardSpecTypeValue(value: string): string {
  return (
    value
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'TYPE'
  );
}

function completeLocalizedText(
  value: Partial<StandardSpecInfoItem['type']> | undefined,
  fallback: string,
): StandardSpecInfoItem['type'] {
  const firstValue =
    value?.zh?.trim() ||
    value?.en?.trim() ||
    value?.ja?.trim() ||
    value?.ko?.trim() ||
    value?.th?.trim() ||
    fallback;
  return {
    zh: value?.zh?.trim() || firstValue,
    en: value?.en?.trim() || firstValue,
    ja: value?.ja?.trim() || firstValue,
    ko: value?.ko?.trim() || firstValue,
    th: value?.th?.trim() || firstValue,
  };
}

function getTypeNameContent(
  value: DataFormItemValue | undefined,
): StandardSpecInfoItem['type'] | undefined {
  const content = value?.content;
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return undefined;
  }
  return content;
}

function getTypeValueContent(value: DataFormItemValue | undefined) {
  const content = value?.content;
  return typeof content === 'string' ? content : '';
}

function createRandomDigits(length = 11): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

function createStandardSpecTypeCode(existingCodes: Set<string>): string {
  let code: string;
  do {
    code = `STANDARD_TYPE_${createRandomDigits()}`;
  } while (existingCodes.has(code));
  return code;
}

export default function TypeListModal({
  open,
  language,
  standardSpecTypes,
  onCancel,
  onStandardSpecTypesChange,
}: TypeListModalProps) {
  const [typeCreateModalOpen, setTypeCreateModalOpen] = useState(false);
  const [typeForm] = Form.useForm<StandardSpecTypeForm>();

  const openTypeCreateModal = () => {
    typeForm.resetFields();
    typeForm.setFieldValue(
      'code',
      createStandardSpecTypeCode(
        new Set(standardSpecTypes.map((item) => item.code)),
      ),
    );
    setTypeCreateModalOpen(true);
  };

  const closeTypeCreateModal = () => {
    setTypeCreateModalOpen(false);
    typeForm.resetFields();
  };

  const saveStandardSpecType = async () => {
    const values = await typeForm.validateFields();
    const value = normalizeStandardSpecTypeValue(
      getTypeValueContent(values.value),
    );
    if (standardSpecTypes.some((item) => item.value === value)) {
      typeForm.setFields([
        {
          name: ['value', 'content'],
          errors: [getLabel('valueExists', language)],
        },
      ]);
      return;
    }
    const newType: StandardSpecTypeItem = {
      code: values.code,
      value,
      name: completeLocalizedText(getTypeNameContent(values.name), value),
    };
    onStandardSpecTypesChange([newType, ...standardSpecTypes]);
    closeTypeCreateModal();
  };

  const typeColumns: ColumnsType<StandardSpecTypeItem> = [
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
  ];

  return (
    <>
      <DraggableModal
        title={
          <LanguageLabel langKey={language} labelKey="standardSpecTypeList" />
        }
        open={open}
        onCancel={onCancel}
        footer={null}
        themeColor={STANDARD_SPEC_TYPE_THEME_COLOR}
        width={860}
      >
        <Button
          size="small"
          icon={<PlusOutlined />}
          style={typeCreateButtonStyle}
          onClick={openTypeCreateModal}
        >
          <LanguageLabel langKey={language} labelKey="newStandardSpecType" />
        </Button>
        <Table
          rowKey="code"
          columns={typeColumns}
          dataSource={standardSpecTypes}
          size="small"
          pagination={false}
        />
      </DraggableModal>
      <DraggableModal
        title={
          <LanguageLabel langKey={language} labelKey="newStandardSpecType" />
        }
        open={typeCreateModalOpen}
        onOk={saveStandardSpecType}
        onCancel={closeTypeCreateModal}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        themeColor={STANDARD_SPEC_TYPE_THEME_COLOR}
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
  );
}
