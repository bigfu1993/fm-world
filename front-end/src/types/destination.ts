import type { LanguageCode } from './system'

export type LocalizedText = Record<LanguageCode, string>

export interface Country {
  id: string
  code: string
  names: LocalizedText
  status: 'enabled' | 'disabled'
  createdAt: string
}

export interface City {
  id: string
  countryId: string
  names: LocalizedText
  status: 'enabled' | 'disabled'
  createdAt: string
}
