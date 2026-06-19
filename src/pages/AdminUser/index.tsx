import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Popconfirm,
  message,
  Space,
  Tag,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import {
  createAdminUser,
  listAdminUsers,
  removeAdminUser,
  resetAdminUserPassword,
  toggleAdminUserStatus,
  updateAdminUser,
  type AdminUserFormData,
} from '@/api/adminUser'
import { listRoles } from '@/api/role'
import { LANGUAGES } from '@/types/system'
import type { AdminUser, Role } from '@/types/system'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

const PAGE_SIZE = 10

export default function AdminUserPage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AdminUser | null>(null)
  const [resetTarget, setResetTarget] = useState<AdminUser | null>(null)
  const [form] = Form.useForm<AdminUserFormData>()
  const [resetForm] = Form.useForm<{ password: string }>()

  const fetchData = async (params?: { page?: number; username?: string }) => {
    setLoading(true)
    try {
      const currentPage = params?.page ?? page
      const result = await listAdminUsers({
        username: params?.username ?? username,
        page: currentPage,
        pageSize: PAGE_SIZE,
      })
      setUsers(result.list)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    listRoles().then(setRoles)
    fetchData({ page: 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally run once on mount
  }, [])

  const handleSearch = () => {
    setPage(1)
    fetchData({ page: 1, username })
  }

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (user: AdminUser) => {
    setEditing(user)
    form.setFieldsValue(user)
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    try {
      if (editing) {
        await updateAdminUser(editing.id, values)
        message.success(<LanguageLabel langKey={language} labelKey="accountUpdated" />)
      } else {
        await createAdminUser(values)
        message.success(<LanguageLabel langKey={language} labelKey="accountCreated" />)
      }
      setModalOpen(false)
      fetchData()
    } catch (error) {
      message.error(error instanceof Error ? error.message : getLabel('operationFailed', language))
    }
  }

  const handleRemove = async (id: string) => {
    await removeAdminUser(id)
    message.success(<LanguageLabel langKey={language} labelKey="accountDeleted" />)
    fetchData()
  }

  const handleToggleStatus = async (id: string) => {
    await toggleAdminUserStatus(id)
    fetchData()
  }

  const handleResetPassword = async () => {
    if (!resetTarget) return
    const values = await resetForm.validateFields()
    await resetAdminUserPassword(resetTarget.id, values.password)
    message.success(<LanguageLabel langKey={language} labelKey="passwordResetSuccess" />)
    setResetTarget(null)
  }

  const columns: ColumnsType<AdminUser> = [
    { title: <LanguageLabel langKey={language} labelKey="username" />, dataIndex: 'username' },
    { title: <LanguageLabel langKey={language} labelKey="displayName" />, dataIndex: 'displayName' },
    { title: <LanguageLabel langKey={language} labelKey="email" />, dataIndex: 'email' },
    {
      title: <LanguageLabel langKey={language} labelKey="role" />,
      dataIndex: 'roleIds',
      render: (roleIds: string[]) => (
        <>
          {roleIds.map((id) => (
            <Tag key={id}>{roles.find((r) => r.id === id)?.name ?? id}</Tag>
          ))}
        </>
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="languageField" />,
      dataIndex: 'languages',
      render: (languageCodes: AdminUser['languages']) => (
        <>
          {languageCodes.map((code, index) => (
            <Tag key={code} color={index === 0 ? 'blue' : undefined}>
              {LANGUAGES.find((l) => l.code === code)?.label ?? code}
              {index === 0 ? `（${getLabel('defaultTag', language)}）` : ''}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="status" />,
      dataIndex: 'status',
      render: (status: AdminUser['status'], record) => (
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
      width: 220,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEdit(record)}>
            <LanguageLabel langKey={language} labelKey="edit" />
          </Button>
          <Button type="link" onClick={() => setResetTarget(record)}>
            <LanguageLabel langKey={language} labelKey="resetPassword" />
          </Button>
          <Popconfirm
            title={<LanguageLabel langKey={language} labelKey="confirmDeleteAccount" />}
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
        <Input
          placeholder={getLabel('searchByUsername', language)}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 200 }}
        />
        <Button onClick={handleSearch}>
          <LanguageLabel langKey={language} labelKey="search" />
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          <LanguageLabel langKey={language} labelKey="createAccount" />
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        scroll={{ x: 'max-content' }}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total,
          onChange: (nextPage) => {
            setPage(nextPage)
            fetchData({ page: nextPage })
          },
        }}
      />

      <Modal
        title={
          <LanguageLabel langKey={language} labelKey={editing ? 'editAccount' : 'createAccount'} />
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label={<LanguageLabel langKey={language} labelKey="username" />}
            rules={[{ required: true, message: getLabel('pleaseInputUsername', language) }]}
          >
            <Input disabled={!!editing} />
          </Form.Item>
          <Form.Item
            name="displayName"
            label={<LanguageLabel langKey={language} labelKey="displayName" />}
            rules={[{ required: true, message: getLabel('pleaseInputDisplayName', language) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={<LanguageLabel langKey={language} labelKey="email" />}
            rules={[{ required: true, type: 'email', message: getLabel('pleaseInputEmail', language) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="roleIds"
            label={<LanguageLabel langKey={language} labelKey="role" />}
            rules={[{ required: true, message: getLabel('pleaseSelectRole', language) }]}
          >
            <Select
              mode="multiple"
              options={roles.map((r) => ({ label: r.name, value: r.id }))}
              placeholder={getLabel('pleaseSelectRole', language)}
            />
          </Form.Item>
          <Form.Item
            name="languages"
            label={<LanguageLabel langKey={language} labelKey="languageField" />}
            rules={[{ required: true, message: getLabel('pleaseSelectLanguage', language) }]}
            extra={getLabel('languageOrderHint', language)}
          >
            <Select
              mode="multiple"
              options={LANGUAGES.map((l) => ({ label: l.label, value: l.code }))}
              placeholder={getLabel('selectLanguagePlaceholder', language)}
            />
          </Form.Item>
          {!editing && (
            <Form.Item
              name="password"
              label={<LanguageLabel langKey={language} labelKey="initialPassword" />}
              extra={getLabel('defaultPasswordHint', language)}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>

      <Modal
        title={<LanguageLabel langKey={language} labelKey="resetPassword" />}
        open={!!resetTarget}
        onCancel={() => setResetTarget(null)}
        onOk={handleResetPassword}
        destroyOnHidden
      >
        <Form form={resetForm} layout="vertical">
          <Form.Item
            name="password"
            label={<LanguageLabel langKey={language} labelKey="newPassword" />}
            rules={[{ required: true, min: 6, message: getLabel('passwordMinLengthHint', language) }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
