import { NETWORK_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function NetworkInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={NETWORK_INFOS}
      codePrefix="NETWORK"
      editTitleLabelKey="editNetworkInformation"
    />
  )
}
