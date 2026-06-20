import { Input, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { POINT_TYPES, type PointType } from '@/mock/pointTypes'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

export default function PointTypePage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')

  const columns: ColumnsType<PointType> = [
    { title: <LanguageLabel langKey={language} labelKey="pointTypeCode" />, dataIndex: 'code' },
    {
      title: <LanguageLabel langKey={language} labelKey="pointTypeName" />,
      dataIndex: 'code',
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
  ]

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? POINT_TYPES.filter((item) =>
        Object.values(item).some((value) => value.toLowerCase().includes(keywordLower)),
      )
    : POINT_TYPES

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder={getLabel('searchByPointTypeName', language)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>
      <Table rowKey="code" columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
    </>
  )
}
