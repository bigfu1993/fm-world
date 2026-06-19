import { Button, Table, Modal, Form, Input, Checkbox, Popconfirm, message, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import {
  createRole,
  listPermissions,
  listRoles,
  removeRole,
  updateRole,
  type RoleFormData,
} from '@/api/role'
import type { Permission, Role } from '@/types/system'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

export default function RolePage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Role | null>(null)
  const [form] = Form.useForm<RoleFormData>()

  const fetchData = async () => {
    setLoading(true)
    try {
      const [roleList, permissionList] = await Promise.all([listRoles(), listPermissions()])
      setRoles(roleList)
      setPermissions(permissionList)
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

  const openEdit = (role: Role) => {
    setEditing(role)
    form.setFieldsValue(role)
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    try {
      if (editing) {
        await updateRole(editing.id, values)
        message.success(<LanguageLabel langKey={language} labelKey="roleUpdated" />)
      } else {
        await createRole(values)
        message.success(<LanguageLabel langKey={language} labelKey="roleCreated" />)
      }
      setModalOpen(false)
      fetchData()
    } catch (error) {
      message.error(error instanceof Error ? error.message : getLabel('operationFailed', language))
    }
  }

  const handleRemove = async (id: string) => {
    await removeRole(id)
    message.success(<LanguageLabel langKey={language} labelKey="roleDeleted" />)
    fetchData()
  }

  const permissionGroups = Array.from(new Set(permissions.map((p) => p.group)))

  const columns: ColumnsType<Role> = [
    { title: <LanguageLabel langKey={language} labelKey="roleName" />, dataIndex: 'name' },
    { title: <LanguageLabel langKey={language} labelKey="roleCode" />, dataIndex: 'code' },
    { title: <LanguageLabel langKey={language} labelKey="description" />, dataIndex: 'description' },
    {
      title: <LanguageLabel langKey={language} labelKey="permission" />,
      dataIndex: 'permissions',
      render: (permissionCodes: string[]) => (
        <>
          {permissionCodes.map((code) => (
            <Tag key={code}>{permissions.find((p) => p.code === code)?.label ?? code}</Tag>
          ))}
        </>
      ),
    },
    { title: <LanguageLabel langKey={language} labelKey="createdAt" />, dataIndex: 'createdAt' },
    {
      title: <LanguageLabel langKey={language} labelKey="actions" />,
      fixed: 'right',
      width: 160,
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEdit(record)}>
            <LanguageLabel langKey={language} labelKey="edit" />
          </Button>
          <Popconfirm
            title={<LanguageLabel langKey={language} labelKey="confirmDeleteRole" />}
            onConfirm={() => handleRemove(record.id)}
          >
            <Button type="link" danger>
              <LanguageLabel langKey={language} labelKey="delete" />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={openCreate} style={{ marginBottom: 16 }}>
        <LanguageLabel langKey={language} labelKey="newRole" />
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={roles}
        loading={loading}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={<LanguageLabel langKey={language} labelKey={editing ? 'editRole' : 'newRole'} />}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" size="small">
          <Form.Item
            name="name"
            label={<LanguageLabel langKey={language} labelKey="roleName" />}
            rules={[{ required: true, message: getLabel('pleaseInputRoleName', language) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label={<LanguageLabel langKey={language} labelKey="roleCode" />}
            rules={[{ required: true, message: getLabel('pleaseInputRoleCode', language) }]}
          >
            <Input disabled={!!editing} />
          </Form.Item>
          <Form.Item name="description" label={<LanguageLabel langKey={language} labelKey="description" />}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="permissions" label={<LanguageLabel langKey={language} labelKey="permission" />}>
            <Checkbox.Group style={{ width: '100%' }}>
              {permissionGroups.map((group) => (
                <div key={group} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>{group}</div>
                  {permissions
                    .filter((p) => p.group === group)
                    .map((p) => (
                      <Checkbox key={p.code} value={p.code} style={{ marginBottom: 4 }}>
                        {p.label}
                      </Checkbox>
                    ))}
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
