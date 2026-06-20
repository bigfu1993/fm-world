import type { LocalizedText } from './destination'

export interface Point {
  id: string
  cityCode: string
  name: LocalizedText
  pointType: string
  coordinates: [number, number]
  website: string
  ticketUrl: string
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
