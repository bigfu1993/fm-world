import { cities, delay, genId } from '@/mock/db'
import type { City, LocalizedText } from '@/types/destination'

export function listCities(countryId?: string): Promise<City[]> {
  const filtered = countryId ? cities.filter((c) => c.countryId === countryId) : cities
  return delay([...filtered])
}

export interface CityFormData {
  countryId: string
  names: LocalizedText
}

export function createCity(data: CityFormData): Promise<City> {
  const city: City = {
    id: genId('city'),
    ...data,
    status: 'enabled',
    createdAt: new Date().toLocaleString('zh-CN'),
  }
  cities.push(city)
  return delay(city)
}

export function updateCity(id: string, data: CityFormData): Promise<City> {
  const city = cities.find((c) => c.id === id)
  if (!city) return Promise.reject(new Error('城市不存在'))
  Object.assign(city, data)
  return delay(city)
}

export function removeCity(id: string): Promise<void> {
  const index = cities.findIndex((c) => c.id === id)
  if (index === -1) return Promise.reject(new Error('城市不存在'))
  cities.splice(index, 1)
  return delay(undefined)
}

export function toggleCityStatus(id: string): Promise<City> {
  const city = cities.find((c) => c.id === id)
  if (!city) return Promise.reject(new Error('城市不存在'))
  city.status = city.status === 'enabled' ? 'disabled' : 'enabled'
  return delay(city)
}
