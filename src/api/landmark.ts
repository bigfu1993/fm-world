import { landmarks, delay, genId } from '@/mock/db'
import type { Landmark } from '@/types/point'
import type { LocalizedText } from '@/types/destination'

export function listLandmarks(): Promise<Landmark[]> {
  return delay([...landmarks])
}

export interface LandmarkFormData {
  pointId: string
  name: LocalizedText
  landmarkType: string
  description: string
  cultureExtension: string
}

export function createLandmark(data: LandmarkFormData): Promise<Landmark> {
  const landmark: Landmark = {
    id: genId('landmark'),
    ...data,
    createdAt: new Date().toLocaleString('zh-CN'),
  }
  landmarks.push(landmark)
  return delay(landmark)
}

export function updateLandmark(id: string, data: LandmarkFormData): Promise<Landmark> {
  const landmark = landmarks.find((l) => l.id === id)
  if (!landmark) return Promise.reject(new Error('地标不存在'))
  Object.assign(landmark, data)
  return delay(landmark)
}

export function removeLandmark(id: string): Promise<void> {
  const index = landmarks.findIndex((l) => l.id === id)
  if (index === -1) return Promise.reject(new Error('地标不存在'))
  landmarks.splice(index, 1)
  return delay(undefined)
}
