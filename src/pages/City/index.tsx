import { Button, Table, Modal, Form, Select, Switch, Popconfirm, message, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import {
  createCity,
  listCities,
  removeCity,
  toggleCityStatus,
  updateCity,
  type CityFormData,
} from '@/api/city'
import { listCountries } from '@/api/country'
import type { City, Country } from '@/types/destination'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import { getLabel } from '@/components/LanguageLabel/LabelMap'
import LanguageFormItem from '@/components/LanguageFormItem'

export default function CityPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [cities, setCities] = useState<City[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<City | null>(null)
  const [form] = Form.useForm<CityFormData>()

  const fetchData = async (params?: { countryId?: string }) => {
    setLoading(true)
    try {
      setCities(await listCities(params?.countryId ?? countryFilter))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    listCountries().then(setCountries)
    fetchData({})
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally run once on mount
  }, [])

  const handleFilterChange = (countryId?: string) => {
    setCountryFilter(countryId)
    fetchData({ countryId })
  }

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (city: City) => {
    setEditing(city)
    form.setFieldsValue(city)
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    try {
      if (editing) {
        await updateCity(editing.id, values)
        message.success(<LanguageLabel langKey={language} labelKey="cityUpdated" />)
      } else {
        await createCity(values)
        message.success(<LanguageLabel langKey={language} labelKey="cityCreated" />)
      }
      setModalOpen(false)
      fetchData()
    } catch (error) {
      message.error(error instanceof Error ? error.message : getLabel('operationFailed', language))
    }
  }

  const handleRemove = async (id: string) => {
    await removeCity(id)
    message.success(<LanguageLabel langKey={language} labelKey="cityDeleted" />)
    fetchData()
  }

  const handleToggleStatus = async (id: string) => {
    await toggleCityStatus(id)
    fetchData()
  }

  const columns: ColumnsType<City> = [
    {
      title: <LanguageLabel langKey={language} labelKey="country" />,
      dataIndex: 'countryId',
      render: (countryId: string) => countries.find((c) => c.id === countryId)?.names[language] ?? countryId,
    },
    {
      title: <LanguageLabel langKey={language} labelKey="cityName" />,
      dataIndex: 'names',
      render: (names: City['names']) => names[language],
    },
    {
      title: <LanguageLabel langKey={language} labelKey="status" />,
      dataIndex: 'status',
      render: (status: City['status'], record) => (
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
            title={<LanguageLabel langKey={language} labelKey="confirmDeleteCity" />}
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
      <Space style={{ marginBottom: 16 }}>
        <Select
          allowClear
          placeholder={getLabel('filterByCountry', language)}
          style={{ width: 200 }}
          value={countryFilter}
          onChange={handleFilterChange}
          options={countries.map((c) => ({ label: c.names[language], value: c.id }))}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          <LanguageLabel langKey={language} labelKey="newCity" />
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={cities}
        loading={loading}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={<LanguageLabel langKey={language} labelKey={editing ? 'editCity' : 'newCity'} />}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" size="small">
          <Form.Item
            name="countryId"
            label={<LanguageLabel langKey={language} labelKey="country" />}
            rules={[{ required: true, message: getLabel('pleaseSelectCountry', language) }]}
          >
            <Select options={countries.map((c) => ({ label: c.names[language], value: c.id }))} />
          </Form.Item>
          <LanguageFormItem
            langKey={language}
            name="names"
            label={<LanguageLabel langKey={language} labelKey="cityName" />}
            required
            requiredMessage={getLabel('pleaseInputCityName', language)}
          />
        </Form>
      </Modal>
    </>
  )
}
