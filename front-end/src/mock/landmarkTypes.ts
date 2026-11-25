export interface LandmarkType {
  code: string
  value: string
  [languageCode: string]: string
}

export const LANDMARK_TYPES: LandmarkType[] = [
  { code: 'LANDMARK_TYPE_10492837561', value: 'landmark', zh: '地标', en: 'Landmark', ja: 'ランドマーク', ko: '랜드마크', th: 'แลนด์มาร์ก' },
  { code: 'LANDMARK_TYPE_58392017462', value: 'viewpoint', zh: '观景点', en: 'Viewpoint', ja: '展望スポット', ko: '전망 포인트', th: 'จุดชมวิว' },
  { code: 'LANDMARK_TYPE_73104928650', value: 'museum', zh: '博物馆', en: 'Museum', ja: '博物館', ko: '박물관', th: 'พิพิธภัณฑ์' },
  { code: 'LANDMARK_TYPE_29061473815', value: 'temple', zh: '寺庙/神社', en: 'Temple / Shrine', ja: '寺社', ko: '사찰/신사', th: 'วัด/ศาลเจ้า' },
  { code: 'LANDMARK_TYPE_64820591734', value: 'shopping', zh: '购物点', en: 'Shopping', ja: 'ショッピング', ko: '쇼핑', th: 'แหล่งช็อปปิ้ง' },
  { code: 'LANDMARK_TYPE_90517362841', value: 'restaurant', zh: '餐饮点', en: 'Restaurant', ja: 'レストラン', ko: '레스토랑', th: 'ร้านอาหาร' },
]
