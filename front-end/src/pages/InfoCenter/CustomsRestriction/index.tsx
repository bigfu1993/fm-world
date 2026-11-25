import { CUSTOMS_RESTRICTION_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function CustomsRestrictionInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={CUSTOMS_RESTRICTION_INFOS}
      codePrefix="CUSTOMS"
      editTitleLabelKey="editCustomsRestriction"
    />
  )
}
