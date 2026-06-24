import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  theme,
} from 'antd';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import LanguageLabel from '@/components/LanguageLabel';
import LanguageText from '@/components/LanguageText';
import { getLabel } from '@/components/LanguageLabel/LabelMap';
import DraggableModal from '@/components/DraggableModal';
import DataFormItem, {
  DATA_FORM_ITEM_TYPE_LABEL_KEYS,
  defaultDataFormItemValue,
  type DataFormItemValue,
} from '@/components/DataFormItem';
import {
  STANDARD_SPEC_INFOS,
  type StandardSpecInfoItem,
  type StandardSpecSupplementContent,
  type StandardSpecSupplementFile,
} from '@/mock/information';
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore';
import type { LanguageCode } from '@/types/system';
import { renderTableEmptyPlaceholder } from '@/utils/table';
import TypeListModal, {
  normalizeCodePrefix,
  standardSpecInitialTypes,
  type StandardSpecTypeFilter,
  type StandardSpecTypeItem,
} from './TypeListModal';

const noWrapColumnStyle = { whiteSpace: 'nowrap' } as const;
const noWrapColumnProps = {
  onCell: () => ({ style: noWrapColumnStyle }),
  onHeaderCell: () => ({ style: noWrapColumnStyle }),
};
const orangePrimaryButtonStyle = {
  backgroundColor: '#fa8c16',
  borderColor: '#fa8c16',
};
const toolbarDividerStyle = {
  height: 24,
};

type StandardSpecFormMode = 'create' | 'edit';

interface StandardSpecForm {
  code: string;
  typeKey: StandardSpecTypeFilter;
  parameter: DataFormItemValue;
  supplement: DataFormItemValue;
}

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

function createLocalizedText(value: string): StandardSpecInfoItem['parameter'] {
  return {
    zh: value,
    en: value,
    ja: value,
    ko: value,
    th: value,
  };
}

function completeLocalizedText(
  value: Partial<StandardSpecInfoItem['description']> | undefined,
  fallback = '',
): StandardSpecInfoItem['description'] {
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

function isLocalizedText(
  value: DataFormItemValue['content'],
): value is StandardSpecInfoItem['description'] {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function normalizeDataFormFiles(
  value: DataFormItemValue['content'],
): StandardSpecSupplementFile[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      uid: item.uid,
      name: item.name,
      url: item.url,
    }))
    .filter((item) => item.name);
}

function getFileDataText(files: StandardSpecSupplementFile[]): string {
  return files.map((item) => item.name).join('、');
}

function normalizeDataFormInfo(value: DataFormItemValue | undefined): {
  type: DataFormItemValue['type'];
  content: StandardSpecSupplementContent;
} {
  const type = value?.type ?? defaultDataFormItemValue.type;
  if (type === 'label') {
    const textContent = isLocalizedText(value?.content)
      ? value.content
      : createLocalizedText(
          typeof value?.content === 'string' ? value.content : '',
        );
    return {
      type,
      content: completeLocalizedText(textContent),
    };
  }
  if (type === 'file') {
    return {
      type,
      content: normalizeDataFormFiles(value?.content),
    };
  }
  return {
    type,
    content: typeof value?.content === 'string' ? value.content.trim() : '',
  };
}

function getDataFormDisplayTextMap(
  content: StandardSpecSupplementContent,
): StandardSpecInfoItem['description'] {
  if (typeof content === 'string') return createLocalizedText(content);
  if (Array.isArray(content)) {
    return createLocalizedText(getFileDataText(content));
  }
  return completeLocalizedText(content);
}

function getStandardSpecParameterValue(
  item: StandardSpecInfoItem,
): DataFormItemValue {
  if (!item.parameterInfo) {
    return {
      type: 'label',
      content: item.parameter,
    };
  }
  return {
    type: item.parameterInfo.type,
    content: item.parameterInfo.content as DataFormItemValue['content'],
  };
}

function getStandardSpecParameterDisplayMap(
  item: StandardSpecInfoItem,
): StandardSpecInfoItem['parameter'] {
  return item.parameterInfo
    ? getDataFormDisplayTextMap(item.parameterInfo.content)
    : item.parameter;
}

function getStandardSpecSupplementValue(
  item: StandardSpecInfoItem,
): DataFormItemValue {
  if (!item.supplement) {
    return {
      type: 'label',
      content: item.description,
    };
  }
  return {
    type: item.supplement.type,
    content: item.supplement.content as DataFormItemValue['content'],
  };
}

function getStandardSpecSupplementDisplayMap(
  item: StandardSpecInfoItem,
): StandardSpecInfoItem['description'] {
  return item.supplement
    ? getDataFormDisplayTextMap(item.supplement.content)
    : item.description;
}

function hasSupplementDisplayContent(item: StandardSpecInfoItem): boolean {
  return Object.values(getStandardSpecSupplementDisplayMap(item)).some(
    (value) => value.trim(),
  );
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
  const { token } = theme.useToken();
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
  const [editForm] = Form.useForm<StandardSpecForm>();
  const primaryOutlineButtonStyle = {
    borderColor: token.colorPrimary,
    color: token.colorPrimary,
  };

  const typeFilterOptions = standardSpecTypes.map((item) => ({
    label: <LanguageText langKey={language} map={item.name} />,
    selectedLabel: item.name[language] ?? item.name.en,
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
      parameter: { ...defaultDataFormItemValue },
      supplement: { ...defaultDataFormItemValue },
    });
    setEditModalOpen(true);
  };

  const openEditModal = (record: StandardSpecInfoItem) => {
    setFormMode('edit');
    setEditingSpec(record);
    editForm.setFieldsValue({
      code: record.code,
      typeKey: getStandardSpecTypeKey(record, standardSpecTypes),
      parameter: getStandardSpecParameterValue(record),
      supplement: getStandardSpecSupplementValue(record),
    });
    setEditModalOpen(true);
  };

  const refreshCreateCode = (typeKey: StandardSpecTypeFilter) => {
    if (formMode !== 'create') return;
    editForm.setFieldValue('code', generateCode(typeKey));
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingSpec(null);
    editForm.resetFields();
  };

  const saveStandardSpec = async () => {
    const values = await editForm.validateFields();
    const parameterInfo = normalizeDataFormInfo(values.parameter);
    const parameterDisplayMap = getDataFormDisplayTextMap(
      parameterInfo.content,
    );
    const supplement = normalizeDataFormInfo(values.supplement);
    const supplementDisplayMap = getDataFormDisplayTextMap(supplement.content);
    if (editingSpec) {
      setStandardSpecs((prev) =>
        prev.map((item) =>
          item.id === editingSpec.id
            ? {
                ...item,
                parameter: parameterDisplayMap,
                parameterInfo,
                description: supplementDisplayMap,
                supplement,
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
        parameter: parameterDisplayMap,
        parameterInfo,
        description: supplementDisplayMap,
        supplement,
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
      ...Object.values(getStandardSpecParameterDisplayMap(item)),
      ...Object.values(getStandardSpecSupplementDisplayMap(item)),
    ];
    return textValues.some((value) =>
      value.toLowerCase().includes(keywordLower),
    );
  });

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
      render: (_, record) => {
        const parameterMap = getStandardSpecParameterDisplayMap(record);
        return renderTableEmptyPlaceholder(
          parameterMap[language] ?? parameterMap.en,
        );
      },
    },
    {
      ...noWrapColumnProps,
      title: (
        <LanguageLabel langKey={language} labelKey="standardSpecDescription" />
      ),
      dataIndex: 'description',
      width: 420,
      render: (_, record) => {
        if (!hasSupplementDisplayContent(record)) {
          return renderTableEmptyPlaceholder(null);
        }
        const supplement = getStandardSpecSupplementValue(record);
        return (
          <Space size={6}>
            <Tag>
              {getLabel(
                DATA_FORM_ITEM_TYPE_LABEL_KEYS[supplement.type],
                language,
              )}
            </Tag>
            <LanguageText
              langKey={language}
              map={getStandardSpecSupplementDisplayMap(record)}
            />
          </Space>
        );
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
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<UnorderedListOutlined />}
          onClick={() => setTypeModalOpen(true)}
          style={orangePrimaryButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="standardSpecTypeList" />
        </Button>
        <Divider type="vertical" style={toolbarDividerStyle} />
        <Button
          icon={<PlusOutlined />}
          onClick={openCreateModal}
          style={primaryOutlineButtonStyle}
        >
          <LanguageLabel langKey={language} labelKey="newStandardSpec" />
        </Button>
        <Select
          allowClear
          optionLabelProp="selectedLabel"
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
      <DraggableModal
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
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
      >
        <Form form={editForm} layout="vertical" size="small">
          {/* {JSON.stringify(editForm)} */}
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
              size="small"
              disabled={formMode === 'edit'}
              options={typeFilterOptions}
              onChange={refreshCreateCode}
            />
          </Form.Item>
          <DataFormItem
            name="parameter"
            langKey={language}
            label={
              <LanguageLabel
                langKey={language}
                labelKey="standardSpecParameter"
              />
            }
            required
            requiredMessage={getLabel(
              'pleaseInputStandardSpecParameter',
              language,
            )}
          />
          <DataFormItem
            name="supplement"
            langKey={language}
            type={['text', 'label', 'file']}
            label={
              <LanguageLabel
                langKey={language}
                labelKey="standardSpecDescription"
              />
            }
            required
            requiredMessage={getLabel('pleaseInputSupplementContent', language)}
          />
        </Form>
      </DraggableModal>
      <TypeListModal
        open={typeModalOpen}
        language={language}
        standardSpecTypes={standardSpecTypes}
        onCancel={() => setTypeModalOpen(false)}
        onStandardSpecTypesChange={setStandardSpecTypes}
      />
    </>
  );
}
