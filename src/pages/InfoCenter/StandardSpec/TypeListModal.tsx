import { Button, Form, Input, Modal, Space, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import LanguageLabel from '@/components/LanguageLabel';
import LanguageText from '@/components/LanguageText';
import LanguageFormItem from '@/components/LanguageFormItem';
import { getLabel } from '@/components/LanguageLabel/LabelMap';
import type { StandardSpecInfoItem } from '@/mock/information';
import type { LanguageCode } from '@/types/system';

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const;
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
};

export type StandardSpecTypeFilter = string;

export interface StandardSpecTypeItem {
  key: string;
  codePrefix: string;
  name: StandardSpecInfoItem['type'];
}

interface StandardSpecTypeForm {
  codePrefix: string;
  name: StandardSpecInfoItem['type'];
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
    key: 'voltage',
    codePrefix: 'VOLTAGE',
    name: {
      zh: '电压',
      en: 'Voltage',
      ja: '電圧',
      ko: '전압',
      th: 'แรงดันไฟฟ้า',
    },
  },
  {
    key: 'plug',
    codePrefix: 'PLUG',
    name: {
      zh: '插头',
      en: 'Plug',
      ja: 'プラグ',
      ko: '플러그',
      th: 'ปลั๊ก',
    },
  },
];

export function normalizeCodePrefix(value: string): string {
  return (
    value
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '') || 'TYPE'
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
    setTypeCreateModalOpen(true);
  };

  const closeTypeCreateModal = () => {
    setTypeCreateModalOpen(false);
    typeForm.resetFields();
  };

  const saveStandardSpecType = async () => {
    const values = await typeForm.validateFields();
    const codePrefix = normalizeCodePrefix(values.codePrefix);
    const newType: StandardSpecTypeItem = {
      key: codePrefix.toLowerCase(),
      codePrefix,
      name: completeLocalizedText(values.name, codePrefix),
    };
    onStandardSpecTypesChange([newType, ...standardSpecTypes]);
    closeTypeCreateModal();
  };

  const typeColumns: ColumnsType<StandardSpecTypeItem> = [
    {
      ...noWrapColumnProps,
      title: (
        <LanguageLabel langKey={language} labelKey="standardSpecTypeCode" />
      ),
      dataIndex: 'codePrefix',
      width: 160,
    },
    {
      ...noWrapColumnProps,
      title: (
        <LanguageLabel langKey={language} labelKey="standardSpecTypeName" />
      ),
      dataIndex: 'name',
      width: 220,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.name} />
      ),
    },
  ];

  return (
    <>
      <Modal
        title={
          <LanguageLabel langKey={language} labelKey="standardSpecTypeList" />
        }
        open={open}
        onCancel={onCancel}
        footer={null}
        width={640}
      >
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openTypeCreateModal}
          >
            <LanguageLabel langKey={language} labelKey="newStandardSpecType" />
          </Button>
        </Space>
        <Table
          rowKey="key"
          columns={typeColumns}
          dataSource={standardSpecTypes}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Modal>
      <Modal
        title={
          <LanguageLabel langKey={language} labelKey="newStandardSpecType" />
        }
        open={typeCreateModalOpen}
        onOk={saveStandardSpecType}
        onCancel={closeTypeCreateModal}
      >
        <Form form={typeForm} layout="vertical" size="small">
          <Form.Item
            name="codePrefix"
            label={
              <LanguageLabel
                langKey={language}
                labelKey="standardSpecTypeCode"
              />
            }
            rules={[
              {
                required: true,
                message: getLabel('pleaseInputStandardSpecTypeCode', language),
              },
              {
                validator: (_, value) => {
                  const codePrefix = normalizeCodePrefix(value ?? '');
                  if (
                    standardSpecTypes.some(
                      (item) => item.codePrefix === codePrefix,
                    )
                  ) {
                    return Promise.reject(
                      new Error(
                        getLabel('standardSpecTypeCodeExists', language),
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <LanguageFormItem
            langKey={language}
            name="name"
            label={
              <LanguageLabel
                langKey={language}
                labelKey="standardSpecTypeName"
              />
            }
            required
            requiredMessage={getLabel(
              'pleaseInputStandardSpecTypeName',
              language,
            )}
          />
        </Form>
      </Modal>
    </>
  );
}
