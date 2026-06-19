import type { AdminUser, Permission, Role } from '@/types/system'
import type { City, Country } from '@/types/destination'

export const PERMISSIONS: Permission[] = [
  { code: 'dashboard:view', label: '查看首页', group: '仪表盘' },
  { code: 'geo:manage', label: '地理信息', group: '信息中心' },
  { code: 'traffic:manage', label: '交通信息', group: '信息中心' },
  { code: 'communication:manage', label: '通讯信息', group: '信息中心' },
  { code: 'admin:manage', label: '账号管理', group: '系统管理' },
  { code: 'role:manage', label: '角色管理', group: '系统管理' },
  { code: 'country:manage', label: '国家管理', group: '基础数据' },
  { code: 'city:manage', label: '城市管理', group: '基础数据' },
  { code: 'language:manage', label: '语言管理', group: '基础数据' },
  { code: 'province:manage', label: '省份管理', group: '基础数据' },
  { code: 'attraction:manage', label: '景点信息管理', group: '内容管理' },
  { code: 'transport:manage', label: '交通信息管理', group: '内容管理' },
  { code: 'culture:manage', label: '文化信息管理', group: '内容管理' },
]

export const roles: Role[] = [
  {
    id: 'role-super',
    name: '超级管理员',
    code: 'super',
    description: '拥有全部权限',
    permissions: PERMISSIONS.map((p) => p.code),
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'role-operator',
    name: '内容运营',
    code: 'operator',
    description: '负责景点/交通/文化信息的日常维护',
    permissions: [
      'dashboard:view',
      'country:manage',
      'city:manage',
      'attraction:manage',
      'transport:manage',
      'culture:manage',
    ],
    createdAt: '2026-06-01 10:00:00',
  },
]

export const adminUsers: (AdminUser & { password: string })[] = [
  {
    id: 'user-admin',
    username: 'admin',
    password: 'admin123',
    displayName: '系统管理员',
    email: 'admin@finger-more.com',
    roleIds: ['role-super'],
    languages: ['zh', 'en', 'ja', 'ko', 'th'],
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'user-operator',
    username: 'operator',
    password: 'operator123',
    displayName: '内容运营',
    email: 'operator@finger-more.com',
    roleIds: ['role-operator'],
    languages: ['en', 'ja'],
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
]

export const countries: Country[] = [
  {
    id: 'country-jp',
    code: 'JP',
    names: { zh: '日本', en: 'Japan', ja: '日本', ko: '일본', th: 'ญี่ปุ่น' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'country-kr',
    code: 'KR',
    names: { zh: '韩国', en: 'South Korea', ja: '韓国', ko: '대한민국', th: 'เกาหลีใต้' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'country-th',
    code: 'TH',
    names: { zh: '泰国', en: 'Thailand', ja: 'タイ', ko: '태국', th: 'ประเทศไทย' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'country-sg',
    code: 'SG',
    names: { zh: '新加坡', en: 'Singapore', ja: 'シンガポール', ko: '싱가포르', th: 'สิงคโปร์' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'country-my',
    code: 'MY',
    names: { zh: '马来西亚', en: 'Malaysia', ja: 'マレーシア', ko: '말레이시아', th: 'มาเลเซีย' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
]

export const cities: City[] = [
  {
    id: 'city-tokyo',
    countryId: 'country-jp',
    names: { zh: '东京', en: 'Tokyo', ja: '東京', ko: '도쿄', th: 'โตเกียว' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'city-osaka',
    countryId: 'country-jp',
    names: { zh: '大阪', en: 'Osaka', ja: '大阪', ko: '오사카', th: 'โอซาก้า' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'city-seoul',
    countryId: 'country-kr',
    names: { zh: '首尔', en: 'Seoul', ja: 'ソウル', ko: '서울', th: 'โซล' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'city-busan',
    countryId: 'country-kr',
    names: { zh: '釜山', en: 'Busan', ja: '釜山', ko: '부산', th: 'ปูซาน' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'city-bangkok',
    countryId: 'country-th',
    names: { zh: '曼谷', en: 'Bangkok', ja: 'バンコク', ko: '방콕', th: 'กรุงเทพมหานคร' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'city-phuket',
    countryId: 'country-th',
    names: { zh: '普吉', en: 'Phuket', ja: 'プーケット', ko: '푸켓', th: 'ภูเก็ต' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'city-singapore',
    countryId: 'country-sg',
    names: { zh: '新加坡', en: 'Singapore', ja: 'シンガポール', ko: '싱가포르', th: 'สิงคโปร์' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'city-kualalumpur',
    countryId: 'country-my',
    names: { zh: '吉隆坡', en: 'Kuala Lumpur', ja: 'クアラルンプール', ko: '쿠알라룸푸르', th: 'กัวลาลัมเปอร์' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'city-langkawi',
    countryId: 'country-my',
    names: { zh: '兰卡威', en: 'Langkawi', ja: 'ランカウイ', ko: '랑카위', th: 'ลังกาวี' },
    status: 'enabled',
    createdAt: '2026-06-01 10:00:00',
  },
]

export function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}
