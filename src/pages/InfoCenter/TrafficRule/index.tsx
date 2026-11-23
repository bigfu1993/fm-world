import { TRAFFIC_RULE_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function TrafficRuleInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={TRAFFIC_RULE_INFOS}
      codePrefix="TRAFFIC_RULE"
      editTitleLabelKey="editTrafficRules"
    />
  )
}
