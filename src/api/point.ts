import { points, delay, genId } from '@/mock/db'
import type { Point } from '@/types/point'
import type { LocalizedText } from '@/types/destination'

export function listPoints(): Promise<Point[]> {
  return delay([...points])
}

export interface PointFormData {
  cityCode: string
  name: LocalizedText
  pointType: string
  coordinates: [number, number]
  website: string
  ticketUrl: string
}

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
  Object.assign(point, data)
  return delay(point)
}

export function removePoint(id: string): Promise<void> {
  const index = points.findIndex((p) => p.id === id)
  if (index === -1) return Promise.reject(new Error('点位不存在'))
  points.splice(index, 1)
  return delay(undefined)
}
