import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import {
  CULTURE_CUSTOM_INFOS,
  type CultureCustomInfoItem,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'

export default function CultureCustomsPage() {
  const language = useAuthStore(selectCurrentLanguage)

  const columns: ColumnsType<CultureCustomInfoItem> = [
    {
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      title: <LanguageLabel langKey={language} labelKey="regionalTaboos" />,
      dataIndex: 'regionalTaboos',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.regionalTaboos} />
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="sensitiveBehaviors" />,
      dataIndex: 'sensitiveBehaviors',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.sensitiveBehaviors} />
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={CULTURE_CUSTOM_INFOS}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
