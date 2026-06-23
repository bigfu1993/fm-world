import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { STANDARD_SPEC_INFOS, type StandardSpecInfoItem } from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'

export default function StandardSpecPage() {
  const language = useAuthStore(selectCurrentLanguage)

  const columns: ColumnsType<StandardSpecInfoItem> = [
    {
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      title: <LanguageLabel langKey={language} labelKey="plugStandard" />,
      dataIndex: 'plugStandard',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.plugStandard} />
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={STANDARD_SPEC_INFOS}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
