import { Input, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { LANDMARK_TYPES, type LandmarkType } from '@/mock/landmarkTypes'
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore'
import LanguageLabel from '@/components/LanguageLabel'
import LanguageText from '@/components/LanguageText'
import { getLabel } from '@/components/LanguageLabel/LabelMap'

export default function LandmarkTypePage() {
  const language = useAuthStore(selectCurrentLanguage)
  const [keyword, setKeyword] = useState('')

  const columns: ColumnsType<LandmarkType> = [
    { title: <LanguageLabel langKey={language} labelKey="landmarkTypeCode" />, dataIndex: 'code' },
    {
      title: <LanguageLabel langKey={language} labelKey="landmarkTypeName" />,
      dataIndex: 'code',
      render: (_, record) => <LanguageText langKey={language} map={record} />,
    },
  ]

  const keywordLower = keyword.trim().toLowerCase()
  const dataSource = keywordLower
    ? LANDMARK_TYPES.filter((item) =>
        Object.values(item).some((value) => value.toLowerCase().includes(keywordLower)),
      )
    : LANDMARK_TYPES

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder={getLabel('searchByLandmarkTypeName', language)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>
      <Table rowKey="code" columns={columns} dataSource={dataSource} scroll={{ x: 'max-content' }} />
    </>
  )
}
