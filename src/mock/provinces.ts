export interface Province {
  code: string
  countryCode: string
  [languageCode: string]: string
}

export const PROVINCES: Province[] = [
  { code: 'JP-13', countryCode: 'JP', zh: '东京都', en: 'Tokyo', ja: '東京都', ko: '도쿄도', th: 'โตเกียว' },
  { code: 'JP-27', countryCode: 'JP', zh: '大阪府', en: 'Osaka', ja: '大阪府', ko: '오사카부', th: 'โอซาก้า' },
  { code: 'JP-26', countryCode: 'JP', zh: '京都府', en: 'Kyoto', ja: '京都府', ko: '교토부', th: 'เกียวโต' },
  { code: 'JP-01', countryCode: 'JP', zh: '北海道', en: 'Hokkaido', ja: '北海道', ko: '홋카이도', th: 'ฮอกไกโด' },
  { code: 'JP-47', countryCode: 'JP', zh: '冲绳县', en: 'Okinawa', ja: '沖縄県', ko: '오키나와현', th: 'โอกินาว่า' },
  { code: 'KR-11', countryCode: 'KR', zh: '首尔特别市', en: 'Seoul', ja: 'ソウル特別市', ko: '서울특별시', th: 'โซล' },
  { code: 'KR-26', countryCode: 'KR', zh: '釜山广域市', en: 'Busan', ja: '釜山広域市', ko: '부산광역시', th: 'ปูซาน' },
  { code: 'KR-49', countryCode: 'KR', zh: '济州特别自治道', en: 'Jeju', ja: '済州特別自治道', ko: '제주특별자치도', th: 'เกาะเชจู' },
  { code: 'TH-10', countryCode: 'TH', zh: '曼谷', en: 'Bangkok', ja: 'バンコク', ko: '방콕', th: 'กรุงเทพมหานคร' },
  { code: 'TH-83', countryCode: 'TH', zh: '普吉府', en: 'Phuket', ja: 'プーケット', ko: '푸켓', th: 'ภูเก็ต' },
  { code: 'TH-50', countryCode: 'TH', zh: '清迈府', en: 'Chiang Mai', ja: 'チェンマイ', ko: '치앙마이', th: 'เชียงใหม่' },
  { code: 'TH-20', countryCode: 'TH', zh: '春武里府', en: 'Chonburi', ja: 'チョンブリー', ko: '촌부리', th: 'ชลบุรี' },
  { code: 'SG-01', countryCode: 'SG', zh: '新加坡', en: 'Singapore', ja: 'シンガポール', ko: '싱가포르', th: 'สิงคโปร์' },
  { code: 'MY-14', countryCode: 'MY', zh: '吉隆坡', en: 'Kuala Lumpur', ja: 'クアラルンプール', ko: '쿠알라룸푸르', th: 'กัวลาลัมเปอร์' },
  { code: 'MY-07', countryCode: 'MY', zh: '槟城', en: 'Penang', ja: 'ペナン', ko: '페낭', th: 'ปีนัง' },
  { code: 'MY-01', countryCode: 'MY', zh: '柔佛', en: 'Johor', ja: 'ジョホール', ko: '조호르', th: 'ยะโฮร์' },
  { code: 'MY-02', countryCode: 'MY', zh: '吉打', en: 'Kedah', ja: 'クダ州', ko: '케다', th: 'เกอดะฮ์' },
]
