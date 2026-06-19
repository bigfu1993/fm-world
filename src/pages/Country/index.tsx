import { Button, Table, Modal, Form, Input, Switch, Popconfirm, message, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import {
  createCountry,
  listCountries,
  removeCountry,
  toggleCountryStatus,
  updateCountry,
  type CountryFormData,
} from '@/api/country'
import type { Country } from '@/types/destination'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import LanguageFormItem from '@/components/LanguageFormItem'

export default function CountryPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Country | null>(null)
  const [form] = Form.useForm<CountryFormData>()

  const fetchData = async () => {
    setLoading(true)
    try {
      setCountries(await listCountries())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (country: Country) => {
    setEditing(country)
    form.setFieldsValue(country)
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    try {
      if (editing) {
        await updateCountry(editing.id, values)
        message.success(<LanguageLabel langKey={language} labelKey="countryUpdated" />)
      } else {
        await createCountry(values)
        message.success(<LanguageLabel langKey={language} labelKey="countryCreated" />)
      }
      setModalOpen(false)
      fetchData()
    } catch (error) {
      message.error(error instanceof Error ? error.message : getLabel('operationFailed', language))
    }
  }

  const handleRemove = async (id: string) => {
    await removeCountry(id)
    message.success(<LanguageLabel langKey={language} labelKey="countryDeleted" />)
    fetchData()
  }

  const handleToggleStatus = async (id: string) => {
    await toggleCountryStatus(id)
    fetchData()
  }

  const columns: ColumnsType<Country> = [
    { title: <LanguageLabel langKey={language} labelKey="countryCode" />, dataIndex: 'code' },
    {
      title: <LanguageLabel langKey={language} labelKey="countryName" />,
      dataIndex: 'names',
      render: (names: Country['names']) => names[language],
    },
    {
      title: <LanguageLabel langKey={language} labelKey="status" />,
      dataIndex: 'status',
      render: (status: Country['status'], record) => (
        <Switch
          checked={status === 'enabled'}
          checkedChildren={<LanguageLabel langKey={language} labelKey="enabled" />}
          unCheckedChildren={<LanguageLabel langKey={language} labelKey="disabled" />}
          onChange={() => handleToggleStatus(record.id)}
        />
      ),
    },
    { title: <LanguageLabel langKey={language} labelKey="createdAt" />, dataIndex: 'createdAt' },
    {
      title: <LanguageLabel langKey={language} labelKey="actions" />,
      fixed: 'right',
      width: 160,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEdit(record)}>
            <LanguageLabel langKey={language} labelKey="edit" />
          </Button>
          <Popconfirm
            title={<LanguageLabel langKey={language} labelKey="confirmDeleteCountry" />}
            onConfirm={() => handleRemove(record.id)}
          >
            <Button type="link" danger>
              <LanguageLabel langKey={language} labelKey="delete" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={openCreate} style={{ marginBottom: 16 }}>
        <LanguageLabel langKey={language} labelKey="newCountry" />
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={countries}
        loading={loading}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={
          <LanguageLabel langKey={language} labelKey={editing ? 'editCountry' : 'newCountry'} />
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" size="small">
          <Form.Item
            name="code"
            label={<LanguageLabel langKey={language} labelKey="countryCode" />}
            rules={[{ required: true, message: getLabel('pleaseInputCountryCode', language) }]}
          >
            <Input disabled={!!editing} placeholder="JP" />
          </Form.Item>
          <LanguageFormItem
            langKey={language}
            name="names"
            label={<LanguageLabel langKey={language} labelKey="countryName" />}
            required
            requiredMessage={getLabel('pleaseInputCountryName', language)}
          />
        </Form>
      </Modal>
    </>
  )
}
