export interface CityData {
  code: string
  countryCode: string
  provinceCode: string
  [languageCode: string]: string
}

export const CITIES: CityData[] = [
  { code: 'JP-TYO', countryCode: 'JP', provinceCode: 'JP-13', zh: '东京', en: 'Tokyo', ja: '東京', ko: '도쿄', th: 'โตเกียว' },
  { code: 'JP-OSA', countryCode: 'JP', provinceCode: 'JP-27', zh: '大阪', en: 'Osaka', ja: '大阪', ko: '오사카', th: 'โอซาก้า' },
  { code: 'JP-KYO', countryCode: 'JP', provinceCode: 'JP-26', zh: '京都', en: 'Kyoto', ja: '京都', ko: '교토', th: 'เกียวโต' },
  { code: 'JP-SPK', countryCode: 'JP', provinceCode: 'JP-01', zh: '札幌', en: 'Sapporo', ja: '札幌', ko: '삿포로', th: 'ซัปโปโร' },
  { code: 'JP-OKA', countryCode: 'JP', provinceCode: 'JP-47', zh: '冲绳', en: 'Okinawa', ja: '沖縄', ko: '오키나와', th: 'โอกินาว่า' },
  { code: 'KR-SEL', countryCode: 'KR', provinceCode: 'KR-11', zh: '首尔', en: 'Seoul', ja: 'ソウル', ko: '서울', th: 'โซล' },
  { code: 'KR-PUS', countryCode: 'KR', provinceCode: 'KR-26', zh: '釜山', en: 'Busan', ja: '釜山', ko: '부산', th: 'ปูซาน' },
  { code: 'KR-JEJ', countryCode: 'KR', provinceCode: 'KR-49', zh: '济州', en: 'Jeju', ja: '済州', ko: '제주', th: 'เกาะเชจู' },
  { code: 'TH-BKK', countryCode: 'TH', provinceCode: 'TH-10', zh: '曼谷', en: 'Bangkok', ja: 'バンコク', ko: '방콕', th: 'กรุงเทพมหานคร' },
  { code: 'TH-HKT', countryCode: 'TH', provinceCode: 'TH-83', zh: '普吉', en: 'Phuket', ja: 'プーケット', ko: '푸켓', th: 'ภูเก็ต' },
  { code: 'TH-CNX', countryCode: 'TH', provinceCode: 'TH-50', zh: '清迈', en: 'Chiang Mai', ja: 'チェンマイ', ko: '치앙마이', th: 'เชียงใหม่' },
  { code: 'TH-PYX', countryCode: 'TH', provinceCode: 'TH-20', zh: '芭提雅', en: 'Pattaya', ja: 'パタヤ', ko: '파타야', th: 'พัทยา' },
  { code: 'SG-SIN', countryCode: 'SG', provinceCode: 'SG-01', zh: '新加坡', en: 'Singapore', ja: 'シンガポール', ko: '싱가포르', th: 'สิงคโปร์' },
  { code: 'MY-KUL', countryCode: 'MY', provinceCode: 'MY-14', zh: '吉隆坡', en: 'Kuala Lumpur', ja: 'クアラルンプール', ko: '쿠알라룸푸르', th: 'กัวลาลัมเปอร์' },
  { code: 'MY-PEN', countryCode: 'MY', provinceCode: 'MY-07', zh: '槟城', en: 'Penang', ja: 'ペナン', ko: '페낭', th: 'ปีนัง' },
  { code: 'MY-LGK', countryCode: 'MY', provinceCode: 'MY-02', zh: '兰卡威', en: 'Langkawi', ja: 'ランカウイ', ko: '랑카위', th: 'ลังกาวี' },
  { code: 'MY-JHB', countryCode: 'MY', provinceCode: 'MY-01', zh: '新山', en: 'Johor Bahru', ja: 'ジョホールバル', ko: '조호바루', th: 'ยะโฮร์บาห์รู' },
]
