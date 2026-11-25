import { countries, delay, genId } from '@/mock/db'
import type { Country, LocalizedText } from '@/types/destination'

export function listCountries(): Promise<Country[]> {
  return delay([...countries])
}

export interface CountryFormData {
  code: string
  names: LocalizedText
}

export function createCountry(data: CountryFormData): Promise<Country> {
  if (countries.some((c) => c.code === data.code)) {
    return Promise.reject(new Error('国家代码已存在'))
  }
  const country: Country = {
    id: genId('country'),
    ...data,
    status: 'enabled',
    createdAt: new Date().toLocaleString('zh-CN'),
  }
  countries.push(country)
  return delay(country)
}

export function updateCountry(id: string, data: CountryFormData): Promise<Country> {
  const country = countries.find((c) => c.id === id)
  if (!country) return Promise.reject(new Error('国家不存在'))
  Object.assign(country, data)
  return delay(country)
}

export function removeCountry(id: string): Promise<void> {
  const index = countries.findIndex((c) => c.id === id)
  if (index === -1) return Promise.reject(new Error('国家不存在'))
  countries.splice(index, 1)
  return delay(undefined)
}

export function toggleCountryStatus(id: string): Promise<Country> {
  const country = countries.find((c) => c.id === id)
  if (!country) return Promise.reject(new Error('国家不存在'))
  country.status = country.status === 'enabled' ? 'disabled' : 'enabled'
  return delay(country)
}
