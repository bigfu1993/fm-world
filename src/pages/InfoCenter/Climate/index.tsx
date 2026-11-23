import { CLIMATE_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function ClimateInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={CLIMATE_INFOS}
      codePrefix="CLIMATE"
      editTitleLabelKey="editClimate"
    />
  )
}
