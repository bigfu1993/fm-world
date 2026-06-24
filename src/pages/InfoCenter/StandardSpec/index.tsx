import { Button, Divider, Form, Input, Modal, Select, Space, Table } from 'antd';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import LanguageLabel from '@/components/LanguageLabel';
import LanguageText from '@/components/LanguageText';
import LanguageFormItem from '@/components/LanguageFormItem';
import { getLabel } from '@/components/LanguageLabel/LabelMap';
import {
  STANDARD_SPEC_INFOS,
  type StandardSpecInfoItem,
} from '@/mock/information';
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore';

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const;
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
};
const orangeOutlineButtonStyle = {
  borderColor: '#fa8c16',
  color: '#fa8c16',
};
const toolbarDividerStyle = {
  height: 24,
};

type StandardSpecTypeFilter = string;
type StandardSpecFormMode = 'create' | 'edit';

interface StandardSpecForm {
  code: string;
  typeKey: StandardSpecTypeFilter;
  parameter: string;
  description: string;
}

interface StandardSpecTypeItem {
  key: string;
  codePrefix: string;
  name: StandardSpecInfoItem['type'];
}

interface StandardSpecTypeForm {
  codePrefix: string;
  name: StandardSpecInfoItem['type'];
}

const standardSpecInitialTypes: StandardSpecTypeItem[] = [
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

const defaultStandardSpecTypeName: StandardSpecInfoItem['type'] = {
  zh: '类型',
  en: 'Type',
  ja: 'タイプ',
  ko: '유형',
  th: 'ประเภท',
};

function getStandardSpecTypeKey(
  item: StandardSpecInfoItem,
  standardSpecTypes: StandardSpecTypeItem[],
): StandardSpecTypeFilter {
  return (
    standardSpecTypes.find((typeItem) => typeItem.name.en === item.type.en)
      ?.key ?? item.type.en.toLowerCase()
  );
}

function getStandardSpecTypeByKey(
  standardSpecTypes: StandardSpecTypeItem[],
  typeKey: StandardSpecTypeFilter,
) {
  return standardSpecTypes.find((item) => item.key === typeKey);
}

function normalizeCodePrefix(value: string): string {
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

function createLocalizedText(value: string): StandardSpecInfoItem['parameter'] {
  return {
    zh: value,
    en: value,
    ja: value,
    ko: value,
    th: value,
  };
}

function createFallbackStandardSpecTypeName(
  typeKey: StandardSpecTypeFilter,
): StandardSpecInfoItem['type'] {
  return {
    ...defaultStandardSpecTypeName,
    zh: typeKey,
    en: typeKey,
  };
}

function createRandomDigits(length = 10): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

function createStandardSpecCode(
  typeKey: StandardSpecTypeFilter,
  standardSpecTypes: StandardSpecTypeItem[],
  existingCodes: Set<string>,
): string {
  const codePrefix =
    getStandardSpecTypeByKey(standardSpecTypes, typeKey)?.codePrefix ??
    normalizeCodePrefix(typeKey);
  let code = '';
  do {
    code = `${codePrefix}${createRandomDigits()}`;
  } while (existingCodes.has(code));
  return code;
}

export default function StandardSpecPage() {
  const language = useAuthStore(selectCurrentLanguage);
  const [keyword, setKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState<
    StandardSpecTypeFilter | undefined
  >(undefined);
  const [standardSpecs, setStandardSpecs] = useState(STANDARD_SPEC_INFOS);
  const [editingSpec, setEditingSpec] = useState<StandardSpecInfoItem | null>(
    null,
  );
  const [standardSpecTypes, setStandardSpecTypes] = useState(
    standardSpecInitialTypes,
  );
  const [formMode, setFormMode] = useState<StandardSpecFormMode>('create');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [typeCreateModalOpen, setTypeCreateModalOpen] = useState(false);
  const [editForm] = Form.useForm<StandardSpecForm>();
  const [typeForm] = Form.useForm<StandardSpecTypeForm>();

  const typeFilterOptions = standardSpecTypes.map((item) => ({
    label: <LanguageText langKey={language} map={item.name} />,
    value: item.key,
  }));

  const generateCode = (typeKey: StandardSpecTypeFilter) =>
    createStandardSpecCode(
      typeKey,
      standardSpecTypes,
      new Set(standardSpecs.map((item) => item.code)),
    );

  const openCreateModal = () => {
    const typeKey = typeFilter ?? standardSpecTypes[0]?.key ?? 'type';
    setFormMode('create');
    setEditingSpec(null);
    editForm.resetFields();
    editForm.setFieldsValue({
      code: generateCode(typeKey),
      typeKey,
      parameter: '',
      description: '',
    });
    setEditModalOpen(true);
  };

  const openEditModal = (record: StandardSpecInfoItem) => {
    setFormMode('edit');
    setEditingSpec(record);
    editForm.setFieldsValue({
      code: record.code,
      typeKey: getStandardSpecTypeKey(record, standardSpecTypes),
      parameter: record.parameter[language] ?? record.parameter.en,
      description: record.description[language] ?? record.description.en,
    });
    setEditModalOpen(true);
  };

  const refreshCreateCode = (typeKey: StandardSpecTypeFilter) => {
    if (formMode !== 'create') return;
    editForm.setFieldValue('code', generateCode(typeKey));
  };

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
    setStandardSpecTypes((prev) => [newType, ...prev]);
    closeTypeCreateModal();
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingSpec(null);
    editForm.resetFields();
  };

  const saveStandardSpec = async () => {
    const values = await editForm.validateFields();
    if (editingSpec) {
      setStandardSpecs((prev) =>
        prev.map((item) =>
          item.id === editingSpec.id
            ? {
                ...item,
                parameter: {
                  ...item.parameter,
                  [language]: values.parameter,
                },
                description: {
                  ...item.description,
                  [language]: values.description,
                },
              }
            : item,
        ),
      );
    } else {
      const existingCodes = new Set(standardSpecs.map((item) => item.code));
      const code =
        values.code && !existingCodes.has(values.code)
          ? values.code
          : generateCode(values.typeKey);
      const newStandardSpec: StandardSpecInfoItem = {
        id: `standard-${code.toLowerCase()}`,
        code,
        type:
          getStandardSpecTypeByKey(standardSpecTypes, values.typeKey)?.name ??
          createFallbackStandardSpecTypeName(values.typeKey),
        parameter: createLocalizedText(values.parameter),
        description: createLocalizedText(values.description),
      };
      setStandardSpecs((prev) => [newStandardSpec, ...prev]);
    }
    closeEditModal();
  };

  const keywordLower = keyword.trim().toLowerCase();
  const dataSource = standardSpecs.filter((item) => {
    if (
      typeFilter &&
      getStandardSpecTypeKey(item, standardSpecTypes) !== typeFilter
    ) {
      return false;
    }
    if (!keywordLower) return true;
    const textValues = [
      item.code,
      ...Object.values(item.type),
      ...Object.values(item.parameter),
      ...Object.values(item.description),
    ];
    return textValues.some((value) =>
      value.toLowerCase().includes(keywordLower),
    );
  });

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

  const columns: ColumnsType<StandardSpecInfoItem> = [
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="standardSpecType" />,
      dataIndex: 'type',
      width: 140,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.type} />
      ),
    },
    {
      ...noWrapColumnProps,
      title: <LanguageLabel langKey={language} labelKey="standardSpecCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      ...noWrapColumnProps,
      title: (
        <LanguageLabel langKey={language} labelKey="standardSpecParameter" />
      ),
      dataIndex: 'parameter',
      width: 220,
      render: (_, record) => record.parameter[language] ?? record.parameter.en,
    },
    {
      ...noWrapColumnProps,
      title: (
        <LanguageLabel langKey={language} labelKey="standardSpecDescription" />
      ),
      dataIndex: 'description',
      width: 420,
      render: (_, record) => (
        <LanguageText langKey={language} map={record.description} />
      ),
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
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<UnorderedListOutlined />}
          onClick={() => setTypeModalOpen(true)}
          style={orangeOutlineButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="standardSpecTypeList" />
        </Button>
        <Divider type="vertical" style={toolbarDividerStyle} />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateModal}
        >
          <LanguageLabel langKey={language} labelKey="newStandardSpec" />
        </Button>
        <Select
          allowClear
          placeholder={getLabel('filterByStandardSpecType', language)}
          value={typeFilter}
          options={typeFilterOptions}
          onChange={setTypeFilter}
          style={{ width: 200 }}
        />
        <Input
          placeholder={getLabel('searchByStandardSpec', language)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
      <Modal
        title={
          <LanguageLabel
            langKey={language}
            labelKey={
              formMode === 'create' ? 'newStandardSpec' : 'editStandardSpec'
            }
          />
        }
        open={editModalOpen}
        onOk={saveStandardSpec}
        onCancel={closeEditModal}
      >
        <Form form={editForm} layout="vertical" size="small">
          <Form.Item
            name="code"
            label={
              <LanguageLabel langKey={language} labelKey="standardSpecCode" />
            }
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="typeKey"
            label={
              <LanguageLabel langKey={language} labelKey="standardSpecType" />
            }
            rules={[{ required: true }]}
          >
            <Select
              disabled={formMode === 'edit'}
              options={typeFilterOptions}
              onChange={refreshCreateCode}
            />
          </Form.Item>
          <Form.Item
            name="parameter"
            label={
              <LanguageLabel
                langKey={language}
                labelKey="standardSpecParameter"
              />
            }
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label={
              <LanguageLabel
                langKey={language}
                labelKey="standardSpecDescription"
              />
            }
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          <LanguageLabel langKey={language} labelKey="standardSpecTypeList" />
        }
        open={typeModalOpen}
        onCancel={() => setTypeModalOpen(false)}
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
