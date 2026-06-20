export interface PointType {
  code: string
  [languageCode: string]: string
}

export const POINT_TYPES: PointType[] = [
  { code: 'stay', zh: '住', en: 'Accommodation', ja: '宿泊', ko: '숙박', th: 'ที่พัก' },
  { code: 'transport', zh: '行', en: 'Transport', ja: '交通', ko: '교통', th: 'การเดินทาง' },
  { code: 'food', zh: '食', en: 'Food', ja: '食事', ko: '음식', th: 'อาหาร' },
  { code: 'shopping', zh: '商', en: 'Shopping', ja: 'ショッピング', ko: '쇼핑', th: 'ช็อปปิ้ง' },
  { code: 'attraction', zh: '景点', en: 'Attraction', ja: '観光地', ko: '관광지', th: 'สถานที่ท่องเที่ยว' },
]
