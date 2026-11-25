import { INTERCITY_TRAFFIC_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function TrafficInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={INTERCITY_TRAFFIC_INFOS}
      codePrefix="TRAFFIC"
      editTitleLabelKey="editTrafficInformation"
    />
  )
}
