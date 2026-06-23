import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import {
  EMERGENCY_HANDLING_INFOS,
  type EmergencyHandlingInfoItem,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'

export default function EmergencyHandlingPage() {
  const language = useAuthStore(selectCurrentLanguage)

  const columns: ColumnsType<EmergencyHandlingInfoItem> = [
    {
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      title: <LanguageLabel langKey={language} labelKey="policeEmergency" />,
      dataIndex: 'policeEmergency',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.policeEmergency} />
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="fireEmergency" />,
      dataIndex: 'fireEmergency',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.fireEmergency} />
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={EMERGENCY_HANDLING_INFOS}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
