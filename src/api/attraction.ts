import { attractions, delay, genId } from '@/mock/db'
import type { Attraction } from '@/types/attraction'
import type { LocalizedText } from '@/types/destination'

export function listAttractions(): Promise<Attraction[]> {
  return delay([...attractions])
}

export interface AttractionFormData {
  cityCode: string
  name: LocalizedText
  coordinates: [number, number]
  website: string
  ticketUrl: string
}

export function createAttraction(data: AttractionFormData): Promise<Attraction> {
  const attraction: Attraction = {
    id: genId('attraction'),
    ...data,
    createdAt: new Date().toLocaleString('zh-CN'),
  }
  attractions.push(attraction)
  return delay(attraction)
}

export function updateAttraction(id: string, data: AttractionFormData): Promise<Attraction> {
  const attraction = attractions.find((a) => a.id === id)
  if (!attraction) return Promise.reject(new Error('景区不存在'))
  Object.assign(attraction, data)
  return delay(attraction)
}

export function removeAttraction(id: string): Promise<void> {
  const index = attractions.findIndex((a) => a.id === id)
  if (index === -1) return Promise.reject(new Error('景区不存在'))
  attractions.splice(index, 1)
  return delay(undefined)
}
