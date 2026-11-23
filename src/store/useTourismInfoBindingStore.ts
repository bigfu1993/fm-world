import { create } from 'zustand'
import type { CustomSupplementInfo } from '@/types/infoBinding'

export interface ProvinceTourismInfoBindingState {
  customSupplement?: CustomSupplementInfo
  regionalLandscapeInfoIds?: string[]
  regionalCultureBeltInfoIds?: string[]
  regionalHeritageClusterInfoIds?: string[]
  regionalCuisineSystemInfoIds?: string[]
  regionalSeasonalEventInfoIds?: string[]
  regionalTrafficInfoIds?: string[]
  recommendedStayDays?: number | null
}

export interface CityTourismInfoBindingState {
  customSupplement?: CustomSupplementInfo
  urbanDistrictInfoIds?: string[]
  cityLifestyleInfoIds?: string[]
  cityFoodSceneInfoIds?: string[]
  cityHeritageInfoIds?: string[]
  cityEventInfoIds?: string[]
  cityTransportInfoIds?: string[]
  suggestedStayDays?: number | null
}

export interface PointTourismInfoBindingState {
  customSupplement?: CustomSupplementInfo
  openingInfoId?: string
  ticketInfoId?: string
  reservationInfoId?: string
  facilityInfoIds?: string[]
  arrivalInfoIds?: string[]
  accessibilityInfoId?: string
  crowdInfoId?: string
  suggestedVisitMinutes?: number | null
}

export interface LandmarkTourismInfoBindingState {
  customSupplement?: CustomSupplementInfo
  guideInfoIds?: string[]
  visitRouteInfoIds?: string[]
  photoInfoIds?: string[]
  queueInfoId?: string
  bestVisitTimeInfoId?: string
  cultureInterpretationInfoIds?: string[]
  suggestedVisitMinutes?: number | null
}

interface TourismInfoBindingStore {
  provinceDisplayZoomByCode: Record<string, number>
  cityDisplayZoomByCode: Record<string, number>
  pointDisplayZoomById: Record<string, number>
  landmarkDisplayZoomById: Record<string, number>
  provinceInfoBindingByCode: Record<string, ProvinceTourismInfoBindingState>
  cityInfoBindingByCode: Record<string, CityTourismInfoBindingState>
  pointInfoBindingById: Record<string, PointTourismInfoBindingState>
  landmarkInfoBindingById: Record<string, LandmarkTourismInfoBindingState>
  setProvinceDisplayZoom: (provinceCode: string, value: number) => void
  setCityDisplayZoom: (cityCode: string, value: number) => void
  setPointDisplayZoom: (pointId: string, value: number) => void
  setLandmarkDisplayZoom: (landmarkId: string, value: number) => void
  setProvinceInfoBinding: (
    provinceCode: string,
    value: ProvinceTourismInfoBindingState,
  ) => void
  setCityInfoBinding: (
    cityCode: string,
    value: CityTourismInfoBindingState,
  ) => void
  setPointInfoBinding: (
    pointId: string,
    value: PointTourismInfoBindingState,
  ) => void
  setLandmarkInfoBinding: (
    landmarkId: string,
    value: LandmarkTourismInfoBindingState,
  ) => void
}

export const useTourismInfoBindingStore = create<TourismInfoBindingStore>(
  (set) => ({
    provinceDisplayZoomByCode: {},
    cityDisplayZoomByCode: {},
    pointDisplayZoomById: {},
    landmarkDisplayZoomById: {},
    provinceInfoBindingByCode: {},
    cityInfoBindingByCode: {},
    pointInfoBindingById: {},
    landmarkInfoBindingById: {},
    setProvinceDisplayZoom: (provinceCode, value) =>
      set((state) => ({
        provinceDisplayZoomByCode: {
          ...state.provinceDisplayZoomByCode,
          [provinceCode]: value,
        },
      })),
    setCityDisplayZoom: (cityCode, value) =>
      set((state) => ({
        cityDisplayZoomByCode: {
          ...state.cityDisplayZoomByCode,
          [cityCode]: value,
        },
      })),
    setPointDisplayZoom: (pointId, value) =>
      set((state) => ({
        pointDisplayZoomById: {
          ...state.pointDisplayZoomById,
          [pointId]: value,
        },
      })),
    setLandmarkDisplayZoom: (landmarkId, value) =>
      set((state) => ({
        landmarkDisplayZoomById: {
          ...state.landmarkDisplayZoomById,
          [landmarkId]: value,
        },
      })),
    setProvinceInfoBinding: (provinceCode, value) =>
      set((state) => ({
        provinceInfoBindingByCode: {
          ...state.provinceInfoBindingByCode,
          [provinceCode]: value,
        },
      })),
    setCityInfoBinding: (cityCode, value) =>
      set((state) => ({
        cityInfoBindingByCode: {
          ...state.cityInfoBindingByCode,
          [cityCode]: value,
        },
      })),
    setPointInfoBinding: (pointId, value) =>
      set((state) => ({
        pointInfoBindingById: {
          ...state.pointInfoBindingById,
          [pointId]: value,
        },
      })),
    setLandmarkInfoBinding: (landmarkId, value) =>
      set((state) => ({
        landmarkInfoBindingById: {
          ...state.landmarkInfoBindingById,
          [landmarkId]: value,
        },
      })),
  }),
)
