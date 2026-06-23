import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import {
  COMMUNICATION_INFOS,
  type InformationItem,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'

export default function CommunicationInfoPage() {
  const language = useAuthStore(selectCurrentLanguage)

  const columns: ColumnsType<InformationItem> = [
    {
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      title: (
        <LanguageLabel langKey={language} labelKey="communicationInformation" />
      ),
      dataIndex: 'name',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.name} />
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={COMMUNICATION_INFOS}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
