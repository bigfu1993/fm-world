import type { AdminUser, Permission, Role } from '@/types/system'
import type { City, Country } from '@/types/destination'
import type { Point, Landmark } from '@/types/point'

export const PERMISSIONS: Permission[] = [
  { code: 'dashboard:view', label: '查看首页', group: '仪表盘' },
  { code: 'publish:manage', label: '发布中心', group: '发布中心' },
  { code: 'geo:manage', label: '地理信息', group: '信息中心' },
  { code: 'traffic:manage', label: '交通信息', group: '信息中心' },
  { code: 'communication:manage', label: '通讯信息', group: '信息中心' },
  { code: 'food:manage', label: '美食推荐', group: '信息中心' },
  { code: 'accommodation:manage', label: '住宿推荐', group: '信息中心' },
  { code: 'admin:manage', label: '账号管理', group: '系统管理' },
  { code: 'role:manage', label: '角色管理', group: '系统管理' },
  { code: 'country:manage', label: '国家管理', group: '基础数据' },
  { code: 'city:manage', label: '城市管理', group: '基础数据' },
  { code: 'language:manage', label: '语言管理', group: '基础数据' },
  { code: 'province:manage', label: '省份管理', group: '基础数据' },
  { code: 'point:manage', label: '点位管理', group: '基础数据' },
  { code: 'landmark:manage', label: '地标管理', group: '基础数据' },
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
      'point:manage',
      'landmark:manage',
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

export const points: Point[] = [
  {
    id: 'point-tokyo-tower',
    cityCode: 'JP-TYO',
    name: { zh: '东京塔', en: 'Tokyo Tower', ja: '東京タワー', ko: '도쿄 타워', th: 'หอคอยโตเกียว' },
    pointType: 'attraction',
    coordinates: [35.6586, 139.7454],
    website: 'https://www.tokyotower.co.jp/',
    ticketUrl: 'https://www.tokyotower.co.jp/ticket',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'point-gyeongbokgung',
    cityCode: 'KR-SEL',
    name: { zh: '景福宫', en: 'Gyeongbokgung Palace', ja: '景福宮', ko: '경복궁', th: 'พระราชวังเคียงบกกุง' },
    pointType: 'attraction',
    coordinates: [37.5796, 126.977],
    website: 'https://www.royalpalace.go.kr/',
    ticketUrl: 'https://www.royalpalace.go.kr/ticket',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'point-grand-palace',
    cityCode: 'TH-BKK',
    name: { zh: '大皇宫', en: 'Grand Palace', ja: '王宮', ko: '왕궁', th: 'พระบรมมหาราชวัง' },
    pointType: 'attraction',
    coordinates: [13.75, 100.4913],
    website: 'https://www.royalgrandpalace.th/',
    ticketUrl: 'https://www.royalgrandpalace.th/ticket',
    createdAt: '2026-06-01 10:00:00',
  },
]

export const landmarks: Landmark[] = [
  {
    id: 'landmark-tokyo-tower-observatory',
    pointId: 'point-tokyo-tower',
    name: { zh: '主展望台', en: 'Main Observatory', ja: 'メインデッキ', ko: '메인 전망대', th: 'จุดชมวิวหลัก' },
    landmarkType: 'viewpoint',
    description: '位于150米高度的主展望台，可俯瞰东京市区全景。',
    cultureExtension: '东京塔建于1958年，曾是日本最高建筑，象征战后日本的复兴。',
    createdAt: '2026-06-01 10:00:00',
  },
  {
    id: 'landmark-gyeongbokgung-geunjeongjeon',
    pointId: 'point-gyeongbokgung',
    name: { zh: '勤政殿', en: 'Geunjeongjeon Hall', ja: '勤政殿', ko: '근정전', th: 'พระที่นั่งกึนจองจอน' },
    landmarkType: 'landmark',
    description: '景福宫的正殿，是国王举行正式仪式和接见外国使臣的场所。',
    cultureExtension: '勤政殿名称取自“勤于政事”之意，体现儒家治国理念。',
    createdAt: '2026-06-01 10:00:00',
  },
]

export function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}
