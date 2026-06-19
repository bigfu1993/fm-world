import type { LocalizedText } from './destination'

export interface Attraction {
  id: string
  cityCode: string
  name: LocalizedText
  coordinates: [number, number]
  website: string
  ticketUrl: string
  createdAt: string
}

export interface Point {
  id: string
  attractionId: string
  name: string
  description: string
  cultureExtension: string
  createdAt: string
}
