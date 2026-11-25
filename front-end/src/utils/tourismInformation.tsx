import LanguageText from '@/components/LanguageText'
import type {
  TourismInfoItem,
  TourismInfoLevel,
} from '@/mock/information'
import type { LanguageCode } from '@/types/system'

export function createTourismInfoOptions(
  items: TourismInfoItem[],
  language: LanguageCode,
  level: TourismInfoLevel,
  typeValue: string,
) {
  return items
    .filter((item) => item.level === level && item.typeValue === typeValue)
    .map((item) => ({
      value: item.id,
      label: <LanguageText langKey={language} map={item.name} />,
    }))
}

export function hasSelectedTourismInfo(value?: string | string[]) {
  if (Array.isArray(value)) return value.length > 0
  return !!value
}

export function hasAnySelectedTourismInfo(
  values: Array<string | string[] | undefined>,
) {
  return values.some(hasSelectedTourismInfo)
}
