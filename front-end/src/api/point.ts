import { points, delay, genId } from '@/mock/db'
import type { Point, BusinessHoursRange } from '@/types/point'
import type { LocalizedText } from '@/types/destination'

export function listPoints(): Promise<Point[]> {
  return delay([...points])
}

export interface PointFormData {
  cityCode: string
  name: LocalizedText
  pointType: string
  coordinates: [number, number]
  businessHours?: BusinessHoursRange[]
  supportsService: boolean
  needsReservation: boolean
  website?: string
  ticketUrl?: string
  checkInTime?: string
  checkOutTime?: string
  starRating?: number
  scheduleInfo?: string
  routeInfo?: string
  avgCost?: number
  brandIntro?: string
}

const TYPE_SPECIFIC_FIELDS = [
  'website',
  'ticketUrl',
  'checkInTime',
  'checkOutTime',
  'starRating',
  'scheduleInfo',
  'routeInfo',
  'avgCost',
  'brandIntro',
] as const

export function createPoint(data: PointFormData): Promise<Point> {
  const point: Point = {
    id: genId('point'),
    ...data,
    createdAt: new Date().toLocaleString('zh-CN'),
  }
  points.push(point)
  return delay(point)
}

export function updatePoint(id: string, data: PointFormData): Promise<Point> {
  const point = points.find((p) => p.id === id)
  if (!point) return Promise.reject(new Error('点位不存在'))
  TYPE_SPECIFIC_FIELDS.forEach((field) => delete point[field])
  Object.assign(point, data)
  return delay(point)
}

export function removePoint(id: string): Promise<void> {
  const index = points.findIndex((p) => p.id === id)
  if (index === -1) return Promise.reject(new Error('点位不存在'))
  points.splice(index, 1)
  return delay(undefined)
}
