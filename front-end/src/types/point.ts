import type { LocalizedText } from './destination'

export interface BusinessHoursRange {
  start: string
  end: string
}

export interface Point {
  id: string
  cityCode: string
  name: LocalizedText
  pointType: string
  coordinates: [number, number]
  businessHours?: BusinessHoursRange[]
  supportsService: boolean
  needsReservation: boolean
  // attraction
  website?: string
  ticketUrl?: string
  // stay
  checkInTime?: string
  checkOutTime?: string
  starRating?: number
  // transport
  scheduleInfo?: string
  routeInfo?: string
  // food
  avgCost?: number
  // shopping
  brandIntro?: string
  createdAt: string
}

export interface Landmark {
  id: string
  pointId: string
  name: LocalizedText
  landmarkType: string
  description: string
  cultureExtension: string
  createdAt: string
}
