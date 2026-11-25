import { ENTRY_POLICY_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function EntryPolicyInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={ENTRY_POLICY_INFOS}
      codePrefix="ENTRY_POLICY"
      editTitleLabelKey="editEntryPolicy"
    />
  )
}
