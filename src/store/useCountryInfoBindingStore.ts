import { create } from 'zustand'
import type { CustomSupplementInfo } from '@/types/infoBinding'

export interface CountryInfoBindingState {
  customSupplement?: CustomSupplementInfo
  foodSafetyLevel?: number
  waterSafetyLevel?: number
  publicSecurityLevel?: number
  communicationInfoId?: string
  currencyInfoId?: string
  timezoneInfoId?: string
  climateInfoId?: string
  standardSpecInfoIds?: Record<string, string | undefined>
  officialLanguageCodes?: string[]
  entryPolicyInfoId?: string
  customsRestrictionInfoId?: string
  networkInfoId?: string
  paymentMethodInfoIds?: string[]
  trafficRuleInfoId?: string
  drivingLicenseInfoId?: string
  securityRiskInfoId?: string
  cultureInfoIds?: Record<string, string[] | undefined>
}

interface CountryInfoBindingStore {
  displayZoomByCode: Record<string, number>
  infoBindingByCode: Record<string, CountryInfoBindingState>
  setDisplayZoom: (countryCode: string, value: number) => void
  setInfoBinding: (countryCode: string, value: CountryInfoBindingState) => void
}

export const useCountryInfoBindingStore = create<CountryInfoBindingStore>(
  (set) => ({
    displayZoomByCode: {},
    infoBindingByCode: {},
    setDisplayZoom: (countryCode, value) =>
      set((state) => ({
        displayZoomByCode: {
          ...state.displayZoomByCode,
          [countryCode]: value,
        },
      })),
    setInfoBinding: (countryCode, value) =>
      set((state) => ({
        infoBindingByCode: {
          ...state.infoBindingByCode,
          [countryCode]: value,
        },
      })),
  }),
)
