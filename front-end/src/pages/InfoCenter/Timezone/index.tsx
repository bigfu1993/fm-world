import { TIMEZONE_INFOS } from '@/mock/information'
import SimpleInformationPage from '@/pages/InfoCenter/SimpleInformationPage'

export default function TimezoneInfoPage() {
  return (
    <SimpleInformationPage
      initialItems={TIMEZONE_INFOS}
      codePrefix="TIMEZONE"
      editTitleLabelKey="editTimezone"
    />
  )
}
