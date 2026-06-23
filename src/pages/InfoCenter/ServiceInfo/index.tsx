import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { SERVICE_INFOS, type ServiceInfoItem } from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'

export default function ServiceInfoPage() {
  const language = useAuthStore(selectCurrentLanguage)

  const columns: ColumnsType<ServiceInfoItem> = [
    {
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      title: <LanguageLabel langKey={language} labelKey="rentCarRules" />,
      dataIndex: 'rentCarRules',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.rentCarRules} />
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={SERVICE_INFOS}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
