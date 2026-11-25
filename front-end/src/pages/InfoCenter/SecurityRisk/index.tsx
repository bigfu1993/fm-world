import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import {
  SECURITY_RISK_INFOS,
  type SecurityRiskInfoItem,
} from '@/mock/information'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'

export default function SecurityRiskPage() {
  const language = useAuthStore(selectCurrentLanguage)

  const columns: ColumnsType<SecurityRiskInfoItem> = [
    {
      title: <LanguageLabel langKey={language} labelKey="informationCode" />,
      dataIndex: 'code',
      width: 180,
    },
    {
      title: <LanguageLabel langKey={language} labelKey="safetyOverview" />,
      dataIndex: 'safetyOverview',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.safetyOverview} />
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="riskAreas" />,
      dataIndex: 'riskAreas',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.riskAreas} />
      ),
    },
    {
      title: <LanguageLabel langKey={language} labelKey="nightStayTime" />,
      dataIndex: 'nightStayTime',
      render: (_, record) => (
        <LanguageText langKey={language} map={record.nightStayTime} />
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={SECURITY_RISK_INFOS}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
