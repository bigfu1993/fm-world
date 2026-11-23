import { DRIVING_LICENSE_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function DrivingLicenseInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={DRIVING_LICENSE_INFOS}
      codePrefix="DRIVING_LICENSE"
      editTitleLabelKey="editDrivingLicense"
    />
  )
}
