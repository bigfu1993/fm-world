import { COMMUNICATION_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function CommunicationInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={COMMUNICATION_INFOS}
      codePrefix="COMMUNICATION"
      editTitleLabelKey="editCommunicationInformation"
    />
  )
}
