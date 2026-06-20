export interface LandmarkType {
  code: string
  [languageCode: string]: string
}

export const LANDMARK_TYPES: LandmarkType[] = [
  { code: 'landmark', zh: '地标', en: 'Landmark', ja: 'ランドマーク', ko: '랜드마크', th: 'แลนด์มาร์ก' },
  { code: 'viewpoint', zh: '观景点', en: 'Viewpoint', ja: '展望スポット', ko: '전망 포인트', th: 'จุดชมวิว' },
  { code: 'museum', zh: '博物馆', en: 'Museum', ja: '博物館', ko: '박물관', th: 'พิพิธภัณฑ์' },
  { code: 'temple', zh: '寺庙/神社', en: 'Temple / Shrine', ja: '寺社', ko: '사찰/신사', th: 'วัด/ศาลเจ้า' },
  { code: 'shopping', zh: '购物点', en: 'Shopping', ja: 'ショッピング', ko: '쇼핑', th: 'แหล่งช็อปปิ้ง' },
  { code: 'restaurant', zh: '餐饮点', en: 'Restaurant', ja: 'レストラン', ko: '레스토랑', th: 'ร้านอาหาร' },
]
