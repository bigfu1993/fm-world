import type { LanguageCode } from '@/types/system'

export interface InformationItem {
  id: string
  code: string
  value?: string
  name: Record<LanguageCode, string>
}

export type LocalizedInfoText = Record<LanguageCode, string>
export type StandardSpecSupplementType = 'text' | 'label' | 'file'

export interface StandardSpecSupplementFile {
  uid: string
  name: string
  url?: string
}

export type StandardSpecSupplementContent =
  | LocalizedInfoText
  | string
  | StandardSpecSupplementFile[]

export interface ServiceInfoItem {
  id: string
  code: string
  rentCarRules: LocalizedInfoText
}

export interface StandardSpecInfoItem {
  id: string
  code: string
  type: LocalizedInfoText
  parameter: LocalizedInfoText
  parameterInfo?: {
    type: StandardSpecSupplementType
    content: StandardSpecSupplementContent
  }
  description: LocalizedInfoText
  supplement?: {
    type: StandardSpecSupplementType
    content: StandardSpecSupplementContent
  }
}

export interface SecurityRiskInfoItem {
  id: string
  code: string
  safetyOverview: LocalizedInfoText
  riskAreas: LocalizedInfoText
  nightStayTime: LocalizedInfoText
}

export interface CultureInfoItem {
  id: string
  code: string
  type: LocalizedInfoText
  name: LocalizedInfoText
  nameInfo?: {
    type: StandardSpecSupplementType
    content: StandardSpecSupplementContent
  }
  value?: string
  description: LocalizedInfoText
  supplement?: {
    type: StandardSpecSupplementType
    content: StandardSpecSupplementContent
  }
}

export interface CurrencyPaymentInfoItem {
  id: string
  code: string
  mobilePayment: LocalizedInfoText
  creditCardPayment: LocalizedInfoText
  tippingCulture: LocalizedInfoText
}

export interface CurrencyInfoItem {
  id: string
  code: string
  value: string
  name: LocalizedInfoText
}

export const TIMEZONE_INFOS: InformationItem[] = [
  {
    id: 'timezone-utc-plus-8',
    code: 'TIMEZONE_48392057164',
    value: 'UTC_PLUS_8',
    name: {
      zh: 'UTC+8',
      en: 'UTC+8',
      ja: 'UTC+8',
      ko: 'UTC+8',
      th: 'UTC+8',
    },
  },
  {
    id: 'timezone-utc-plus-9',
    code: 'TIMEZONE_75019384625',
    value: 'UTC_PLUS_9',
    name: {
      zh: 'UTC+9',
      en: 'UTC+9',
      ja: 'UTC+9',
      ko: 'UTC+9',
      th: 'UTC+9',
    },
  },
  {
    id: 'timezone-utc-zero',
    code: 'TIMEZONE_62950718340',
    value: 'UTC_ZERO',
    name: {
      zh: 'UTC+0',
      en: 'UTC+0',
      ja: 'UTC+0',
      ko: 'UTC+0',
      th: 'UTC+0',
    },
  },
  {
    id: 'timezone-utc-minus-5',
    code: 'TIMEZONE_81630492750',
    value: 'UTC_MINUS_5',
    name: {
      zh: 'UTC-5',
      en: 'UTC-5',
      ja: 'UTC-5',
      ko: 'UTC-5',
      th: 'UTC-5',
    },
  },
]

export const CLIMATE_INFOS: InformationItem[] = [
  {
    id: 'climate-temperate',
    code: 'CLIMATE_29485710638',
    value: 'TEMPERATE',
    name: {
      zh: '温带气候',
      en: 'Temperate Climate',
      ja: '温帯気候',
      ko: '온대 기후',
      th: 'ภูมิอากาศอบอุ่น',
    },
  },
  {
    id: 'climate-tropical',
    code: 'CLIMATE_57163820497',
    value: 'TROPICAL',
    name: {
      zh: '热带气候',
      en: 'Tropical Climate',
      ja: '熱帯気候',
      ko: '열대 기후',
      th: 'ภูมิอากาศเขตร้อน',
    },
  },
  {
    id: 'climate-mediterranean',
    code: 'CLIMATE_83049617250',
    value: 'MEDITERRANEAN',
    name: {
      zh: '地中海气候',
      en: 'Mediterranean Climate',
      ja: '地中海性気候',
      ko: '지중해성 기후',
      th: 'ภูมิอากาศเมดิเตอร์เรเนียน',
    },
  },
  {
    id: 'climate-arid',
    code: 'CLIMATE_46291873504',
    value: 'ARID',
    name: {
      zh: '干旱气候',
      en: 'Arid Climate',
      ja: '乾燥気候',
      ko: '건조 기후',
      th: 'ภูมิอากาศแห้งแล้ง',
    },
  },
]

export const COMMUNICATION_INFOS: InformationItem[] = [
  {
    id: 'comm-esim',
    code: 'COMM-ESIM',
    name: {
      zh: 'eSIM / 电话卡',
      en: 'eSIM / SIM Card',
      ja: 'eSIM / SIMカード',
      ko: 'eSIM / 유심 카드',
      th: 'eSIM / ซิมการ์ด',
    },
  },
  {
    id: 'comm-roaming',
    code: 'COMM-ROAMING',
    name: {
      zh: '国际漫游',
      en: 'International Roaming',
      ja: '国際ローミング',
      ko: '국제 로밍',
      th: 'โรมมิ่งระหว่างประเทศ',
    },
  },
  {
    id: 'comm-wifi',
    code: 'COMM-WIFI',
    name: {
      zh: '随身 Wi-Fi',
      en: 'Pocket Wi-Fi',
      ja: 'ポケット Wi-Fi',
      ko: '포켓 Wi-Fi',
      th: 'Pocket Wi-Fi',
    },
  },
]

export const INTERCITY_TRAFFIC_INFOS: InformationItem[] = [
  {
    id: 'traffic-airplane',
    code: 'TRAFFIC_10492837561',
    value: 'AIRPLANE',
    name: {
      zh: '飞机',
      en: 'Airplane',
      ja: '飛行機',
      ko: '비행기',
      th: 'เครื่องบิน',
    },
  },
  {
    id: 'traffic-railway',
    code: 'TRAFFIC_58392017462',
    value: 'RAILWAY',
    name: {
      zh: '铁路',
      en: 'Railway',
      ja: '鉄道',
      ko: '철도',
      th: 'รถไฟ',
    },
  },
  {
    id: 'traffic-bus',
    code: 'TRAFFIC_73104928650',
    value: 'BUS',
    name: {
      zh: '巴士',
      en: 'Bus',
      ja: 'バス',
      ko: '버스',
      th: 'รถบัส',
    },
  },
  {
    id: 'traffic-subway',
    code: 'TRAFFIC_29061473815',
    value: 'SUBWAY',
    name: {
      zh: '地铁',
      en: 'Subway',
      ja: '地下鉄',
      ko: '지하철',
      th: 'รถไฟใต้ดิน',
    },
  },
  {
    id: 'traffic-public-bus',
    code: 'TRAFFIC_64820591734',
    value: 'PUBLIC_BUS',
    name: {
      zh: '公交',
      en: 'Public Bus',
      ja: '路線バス',
      ko: '시내버스',
      th: 'รถโดยสารประจำทาง',
    },
  },
  {
    id: 'traffic-taxi',
    code: 'TRAFFIC_90517362841',
    value: 'TAXI',
    name: {
      zh: '出租',
      en: 'Taxi',
      ja: 'タクシー',
      ko: '택시',
      th: 'แท็กซี่',
    },
  },
  {
    id: 'traffic-online-taxi',
    code: 'TRAFFIC_37624850912',
    value: 'ONLINE_TAXI',
    name: {
      zh: '互联网出租',
      en: 'Ride-Hailing',
      ja: '配車サービス',
      ko: '차량 호출',
      th: 'รถเรียกผ่านแอป',
    },
  },
  {
    id: 'traffic-car-rental',
    code: 'TRAFFIC_81260495730',
    value: 'CAR_RENTAL',
    name: {
      zh: '租车',
      en: 'Car Rental',
      ja: 'レンタカー',
      ko: '렌터카',
      th: 'รถเช่า',
    },
  },
  {
    id: 'traffic-electric-bike',
    code: 'TRAFFIC_46019382751',
    value: 'ELECTRIC_BIKE',
    name: {
      zh: '电动车',
      en: 'Electric Bike',
      ja: '電動自転車',
      ko: '전기 자전거',
      th: 'จักรยานไฟฟ้า',
    },
  },
  {
    id: 'traffic-bicycle',
    code: 'TRAFFIC_21973840566',
    value: 'BICYCLE',
    name: {
      zh: '自行车',
      en: 'Bicycle',
      ja: '自転車',
      ko: '자전거',
      th: 'จักรยาน',
    },
  },
  {
    id: 'traffic-motorcycle',
    code: 'TRAFFIC_59281730468',
    value: 'MOTORCYCLE',
    name: {
      zh: '摩托车',
      en: 'Motorcycle',
      ja: 'オートバイ',
      ko: '오토바이',
      th: 'รถจักรยานยนต์',
    },
  },
  {
    id: 'traffic-private-agreement',
    code: 'TRAFFIC_73468192055',
    value: 'PRIVATE_AGREEMENT',
    name: {
      zh: '私人协议',
      en: 'Private Agreement',
      ja: 'プライベート契約',
      ko: '개인 계약',
      th: 'ข้อตกลงส่วนตัว',
    },
  },
]

export const CURRENCY_INFOS: CurrencyInfoItem[] = [
  {
    id: 'currency-cny',
    code: 'CURRENCY_73849261045',
    value: 'CNY',
    name: {
      zh: '人民币',
      en: 'Chinese Yuan',
      ja: '人民元',
      ko: '중국 위안',
      th: 'หยวนจีน',
    },
  },
  {
    id: 'currency-usd',
    code: 'CURRENCY_20594718362',
    value: 'USD',
    name: {
      zh: '美元',
      en: 'US Dollar',
      ja: '米ドル',
      ko: '미국 달러',
      th: 'ดอลลาร์สหรัฐ',
    },
  },
  {
    id: 'currency-eur',
    code: 'CURRENCY_91473620581',
    value: 'EUR',
    name: {
      zh: '欧元',
      en: 'Euro',
      ja: 'ユーロ',
      ko: '유로',
      th: 'ยูโร',
    },
  },
  {
    id: 'currency-gbp',
    code: 'CURRENCY_48261039574',
    value: 'GBP',
    name: {
      zh: '英镑',
      en: 'Pound Sterling',
      ja: '英ポンド',
      ko: '영국 파운드',
      th: 'ปอนด์สเตอร์ลิง',
    },
  },
  {
    id: 'currency-jpy',
    code: 'CURRENCY_65019384726',
    value: 'JPY',
    name: {
      zh: '日元',
      en: 'Japanese Yen',
      ja: '日本円',
      ko: '일본 엔',
      th: 'เยนญี่ปุ่น',
    },
  },
  {
    id: 'currency-krw',
    code: 'CURRENCY_39752068149',
    value: 'KRW',
    name: {
      zh: '韩元',
      en: 'South Korean Won',
      ja: '韓国ウォン',
      ko: '한국 원',
      th: 'วอนเกาหลีใต้',
    },
  },
  {
    id: 'currency-thb',
    code: 'CURRENCY_82640195730',
    value: 'THB',
    name: {
      zh: '泰铢',
      en: 'Thai Baht',
      ja: 'タイバーツ',
      ko: '태국 바트',
      th: 'บาทไทย',
    },
  },
  {
    id: 'currency-hkd',
    code: 'CURRENCY_17483926058',
    value: 'HKD',
    name: {
      zh: '港币',
      en: 'Hong Kong Dollar',
      ja: '香港ドル',
      ko: '홍콩 달러',
      th: 'ดอลลาร์ฮ่องกง',
    },
  },
  {
    id: 'currency-mop',
    code: 'CURRENCY_56391847205',
    value: 'MOP',
    name: {
      zh: '澳门元',
      en: 'Macanese Pataca',
      ja: 'マカオ・パタカ',
      ko: '마카오 파타카',
      th: 'ปาตากามาเก๊า',
    },
  },
  {
    id: 'currency-sgd',
    code: 'CURRENCY_70928461538',
    value: 'SGD',
    name: {
      zh: '新加坡元',
      en: 'Singapore Dollar',
      ja: 'シンガポールドル',
      ko: '싱가포르 달러',
      th: 'ดอลลาร์สิงคโปร์',
    },
  },
  {
    id: 'currency-myr',
    code: 'CURRENCY_34187502694',
    value: 'MYR',
    name: {
      zh: '马来西亚林吉特',
      en: 'Malaysian Ringgit',
      ja: 'マレーシアリンギット',
      ko: '말레이시아 링깃',
      th: 'ริงกิตมาเลเซีย',
    },
  },
  {
    id: 'currency-aud',
    code: 'CURRENCY_95826041736',
    value: 'AUD',
    name: {
      zh: '澳元',
      en: 'Australian Dollar',
      ja: '豪ドル',
      ko: '호주 달러',
      th: 'ดอลลาร์ออสเตรเลีย',
    },
  },
  {
    id: 'currency-cad',
    code: 'CURRENCY_62051739482',
    value: 'CAD',
    name: {
      zh: '加元',
      en: 'Canadian Dollar',
      ja: 'カナダドル',
      ko: '캐나다 달러',
      th: 'ดอลลาร์แคนาดา',
    },
  },
]

export const ENTRY_POLICY_INFOS: InformationItem[] = [
  {
    id: 'entry-policy-visa-free',
    code: 'ENTRY_POLICY_18473920561',
    value: 'VISA_FREE',
    name: {
      zh: '免签',
      en: 'Visa-Free',
      ja: 'ビザ免除',
      ko: '무비자',
      th: 'ยกเว้นวีซ่า',
    },
  },
  {
    id: 'entry-policy-e-visa',
    code: 'ENTRY_POLICY_67294051833',
    value: 'E_VISA',
    name: {
      zh: '电子签',
      en: 'E-Visa',
      ja: '電子ビザ',
      ko: '전자비자',
      th: 'วีซ่าอิเล็กทรอนิกส์',
    },
  },
  {
    id: 'entry-policy-visa-on-arrival',
    code: 'ENTRY_POLICY_50381629472',
    value: 'VISA_ON_ARRIVAL',
    name: {
      zh: '落地签',
      en: 'Visa on Arrival',
      ja: '到着ビザ',
      ko: '도착비자',
      th: 'วีซ่าเมื่อเดินทางถึง',
    },
  },
  {
    id: 'entry-policy-visa-required',
    code: 'ENTRY_POLICY_92746138054',
    value: 'VISA_REQUIRED',
    name: {
      zh: '需提前签证',
      en: 'Visa Required in Advance',
      ja: '事前ビザが必要',
      ko: '사전 비자 필요',
      th: 'ต้องขอวีซ่าล่วงหน้า',
    },
  },
]

export const CUSTOMS_RESTRICTION_INFOS: InformationItem[] = [
  {
    id: 'customs-general-restricted-items',
    code: 'CUSTOMS_18492057361',
    value: 'GENERAL_RESTRICTED_ITEMS',
    name: {
      zh: '常规禁限物品',
      en: 'General Restricted Items',
      ja: '一般的な制限品',
      ko: '일반 제한 물품',
      th: 'สิ่งของต้องห้ามทั่วไป',
    },
  },
  {
    id: 'customs-medicine-declaration',
    code: 'CUSTOMS_62947105834',
    value: 'MEDICINE_DECLARATION',
    name: {
      zh: '药品携带申报',
      en: 'Medicine Declaration',
      ja: '医薬品持ち込み申告',
      ko: '의약품 반입 신고',
      th: 'การสำแดงยา',
    },
  },
  {
    id: 'customs-cash-limit',
    code: 'CUSTOMS_80519374620',
    value: 'CASH_LIMIT',
    name: {
      zh: '现金携带额度',
      en: 'Cash Carrying Limit',
      ja: '現金持ち込み上限',
      ko: '현금 반입 한도',
      th: 'วงเงินพกพาเงินสด',
    },
  },
]

export const NETWORK_INFOS: InformationItem[] = [
  {
    id: 'network-open',
    code: 'NETWORK_51720498361',
    value: 'OPEN',
    name: {
      zh: '网络开放',
      en: 'Open Internet',
      ja: 'オープンなインターネット',
      ko: '개방형 인터넷',
      th: 'อินเทอร์เน็ตเปิด',
    },
  },
  {
    id: 'network-real-name',
    code: 'NETWORK_30492857163',
    value: 'REAL_NAME_REQUIRED',
    name: {
      zh: '上网实名制',
      en: 'Real-Name Registration Required',
      ja: '実名登録が必要',
      ko: '실명 등록 필요',
      th: 'ต้องลงทะเบียนชื่อจริง',
    },
  },
  {
    id: 'network-service-restricted',
    code: 'NETWORK_69281740531',
    value: 'SERVICE_RESTRICTED',
    name: {
      zh: '部分服务受限',
      en: 'Some Services Restricted',
      ja: '一部サービス制限あり',
      ko: '일부 서비스 제한',
      th: 'บางบริการถูกจำกัด',
    },
  },
]

export const PAYMENT_METHOD_INFOS: InformationItem[] = [
  {
    id: 'payment-method-cash',
    code: 'PAYMENT_48290517364',
    value: 'CASH',
    name: {
      zh: '现金',
      en: 'Cash',
      ja: '現金',
      ko: '현금',
      th: 'เงินสด',
    },
  },
  {
    id: 'payment-method-credit-card',
    code: 'PAYMENT_73918462057',
    value: 'CREDIT_CARD',
    name: {
      zh: '信用卡',
      en: 'Credit Card',
      ja: 'クレジットカード',
      ko: '신용카드',
      th: 'บัตรเครดิต',
    },
  },
  {
    id: 'payment-method-debit-card',
    code: 'PAYMENT_20654891370',
    value: 'DEBIT_CARD',
    name: {
      zh: '借记卡',
      en: 'Debit Card',
      ja: 'デビットカード',
      ko: '직불카드',
      th: 'บัตรเดบิต',
    },
  },
  {
    id: 'payment-method-mobile-payment',
    code: 'PAYMENT_91570638241',
    value: 'MOBILE_PAYMENT',
    name: {
      zh: '移动支付',
      en: 'Mobile Payment',
      ja: 'モバイル決済',
      ko: '모바일 결제',
      th: 'การชำระเงินมือถือ',
    },
  },
]

export const TRAFFIC_RULE_INFOS: InformationItem[] = [
  {
    id: 'traffic-rule-right-hand',
    code: 'TRAFFIC_RULE_43091857260',
    value: 'RIGHT_HAND_TRAFFIC',
    name: {
      zh: '右侧',
      en: 'Right Side',
      ja: '右側',
      ko: '우측',
      th: 'ขวา',
    },
  },
  {
    id: 'traffic-rule-left-hand',
    code: 'TRAFFIC_RULE_86720519431',
    value: 'LEFT_HAND_TRAFFIC',
    name: {
      zh: '左侧',
      en: 'Left Side',
      ja: '左側',
      ko: '좌측',
      th: 'ซ้าย',
    },
  },
]

export const DRIVING_LICENSE_INFOS: InformationItem[] = [
  {
    id: 'driving-license-idp',
    code: 'DRIVING_LICENSE_59402817360',
    value: 'IDP_OR_TRANSLATION_REQUIRED',
    name: {
      zh: '驾照翻译件/国际驾照要求',
      en: 'IDP or License Translation Required',
      ja: '国際免許証または翻訳書類が必要',
      ko: '국제운전면허증 또는 번역본 필요',
      th: 'ต้องมีใบขับขี่สากลหรือเอกสารแปล',
    },
  },
  {
    id: 'driving-license-home-license',
    code: 'DRIVING_LICENSE_72840519360',
    value: 'HOME_LICENSE_RECOGNIZED',
    name: {
      zh: '本国驾照可用',
      en: 'Home License Recognized',
      ja: '自国の運転免許証が利用可能',
      ko: '자국 운전면허증 사용 가능',
      th: 'ใช้ใบขับขี่ประเทศตนเองได้',
    },
  },
  {
    id: 'driving-license-self-drive-limited',
    code: 'DRIVING_LICENSE_31964085722',
    value: 'SELF_DRIVE_LIMITED',
    name: {
      zh: '自驾限制较多',
      en: 'Self-Drive Restrictions',
      ja: '自動車運転の制限が多い',
      ko: '자가 운전 제한 많음',
      th: 'มีข้อจำกัดในการขับรถเองมาก',
    },
  },
]

export const SERVICE_INFOS: ServiceInfoItem[] = [
  {
    id: 'service-rent-car-basic',
    code: 'SERVICE-RENT-CAR',
    rentCarRules: {
      zh: '租车前确认驾照/翻译件要求、押金规则、保险范围和异地还车费用。',
      en: 'Check license or translation requirements, deposits, insurance coverage, and one-way return fees before renting.',
      ja: 'レンタカー利用前に免許証や翻訳書類、保証金、保険範囲、乗り捨て料金を確認してください。',
      ko: '렌터카 이용 전 면허증/번역본 요건, 보증금, 보험 범위, 편도 반납 비용을 확인하세요.',
      th: 'ก่อนเช่ารถควรตรวจสอบใบขับขี่/เอกสารแปล เงินมัดจำ ประกัน และค่าคืนรถต่างเมือง',
    },
  },
]

const STANDARD_SPEC_TYPE_VOLTAGE: LocalizedInfoText = {
  zh: '电压',
  en: 'Voltage',
  ja: '電圧',
  ko: '전압',
  th: 'แรงดันไฟฟ้า',
}

const STANDARD_SPEC_TYPE_PLUG: LocalizedInfoText = {
  zh: '插头',
  en: 'Plug',
  ja: 'プラグ',
  ko: '플러그',
  th: 'ปลั๊ก',
}

const STANDARD_SPEC_TYPE_POLICE_PHONE: LocalizedInfoText = {
  zh: '警察电话',
  en: 'Police Phone',
  ja: '警察電話',
  ko: '경찰 전화',
  th: 'เบอร์ตำรวจ',
}

const STANDARD_SPEC_TYPE_FIRE_PHONE: LocalizedInfoText = {
  zh: '火警电话',
  en: 'Fire Phone',
  ja: '消防電話',
  ko: '소방 전화',
  th: 'เบอร์ดับเพลิง',
}

const STANDARD_SPEC_TYPE_HOSPITAL_PHONE: LocalizedInfoText = {
  zh: '急救电话',
  en: 'Hospital Phone',
  ja: '救急電話',
  ko: '응급 전화',
  th: 'เบอร์ฉุกเฉินทางการแพทย์',
}

const STANDARD_SPEC_TYPE_TRAFFIC_ACCIDENT_PHONE: LocalizedInfoText = {
  zh: '交通事故电话',
  en: 'Traffic Accident Phone',
  ja: '交通事故電話',
  ko: '교통사고 전화',
  th: 'เบอร์แจ้งอุบัติเหตุจราจร',
}

const createUniformSpecText = (text: string): LocalizedInfoText => ({
  zh: text,
  en: text,
  ja: text,
  ko: text,
  th: text,
})

const createPlugParameter = (letter: string): LocalizedInfoText => ({
  zh: `${letter} 型`,
  en: `Type ${letter}`,
  ja: `${letter} タイプ`,
  ko: `${letter} 타입`,
  th: `ประเภท ${letter}`,
})

const createPhoneParameter = (
  countryCallingCode: string,
  localPhoneNumber: string,
): LocalizedInfoText =>
  createUniformSpecText(`${countryCallingCode} ${localPhoneNumber}`)

const EMPTY_STANDARD_SPEC_SUPPLEMENT = createUniformSpecText('')

export const STANDARD_SPEC_INFOS: StandardSpecInfoItem[] = [
  {
    id: 'standard-voltage-100v',
    code: 'STANDARD_48102973560',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('100V'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-voltage-110v',
    code: 'STANDARD_29476105830',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('110V'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-voltage-115v',
    code: 'STANDARD_86512039470',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('115V'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-voltage-120v',
    code: 'STANDARD_50938417620',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('120V'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-voltage-127v',
    code: 'STANDARD_14726093580',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('127V'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-voltage-220v',
    code: 'STANDARD_69250381470',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('220V'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-voltage-230v',
    code: 'STANDARD_95418062730',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('230V'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-voltage-240v',
    code: 'STANDARD_80315974620',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('240V'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-a',
    code: 'STANDARD_60491827350',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('A'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-b',
    code: 'STANDARD_92740518630',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('B'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-c',
    code: 'STANDARD_31587049260',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('C'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-d',
    code: 'STANDARD_74829160530',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('D'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-e',
    code: 'STANDARD_18653097420',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('E'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-f',
    code: 'STANDARD_53970268140',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('F'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-g',
    code: 'STANDARD_27041859630',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('G'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-h',
    code: 'STANDARD_86193574020',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('H'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-i',
    code: 'STANDARD_49372015860',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('I'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-j',
    code: 'STANDARD_70816493520',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('J'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-k',
    code: 'STANDARD_14259780360',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('K'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-l',
    code: 'STANDARD_67530829140',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('L'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-m',
    code: 'STANDARD_83052614790',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('M'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-n',
    code: 'STANDARD_25974168030',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('N'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-plug-type-o',
    code: 'STANDARD_51703986240',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('O'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-police-110',
    code: 'STANDARD_10495827360',
    type: STANDARD_SPEC_TYPE_POLICE_PHONE,
    parameter: createPhoneParameter('+86', '110'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-police-112',
    code: 'STANDARD_58270419360',
    type: STANDARD_SPEC_TYPE_POLICE_PHONE,
    parameter: createPhoneParameter('+82', '112'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-police-911',
    code: 'STANDARD_73920486150',
    type: STANDARD_SPEC_TYPE_POLICE_PHONE,
    parameter: createPhoneParameter('+1', '911'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-police-999',
    code: 'STANDARD_26059381740',
    type: STANDARD_SPEC_TYPE_POLICE_PHONE,
    parameter: createPhoneParameter('+44', '999'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-police-000',
    code: 'STANDARD_68195042730',
    type: STANDARD_SPEC_TYPE_POLICE_PHONE,
    parameter: createPhoneParameter('+61', '000'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-fire-119',
    code: 'STANDARD_48261973500',
    type: STANDARD_SPEC_TYPE_FIRE_PHONE,
    parameter: createPhoneParameter('+86', '119'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-fire-112',
    code: 'STANDARD_93720518460',
    type: STANDARD_SPEC_TYPE_FIRE_PHONE,
    parameter: createPhoneParameter('+49', '112'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-fire-911',
    code: 'STANDARD_61597028430',
    type: STANDARD_SPEC_TYPE_FIRE_PHONE,
    parameter: createPhoneParameter('+1', '911'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-fire-999',
    code: 'STANDARD_20468159730',
    type: STANDARD_SPEC_TYPE_FIRE_PHONE,
    parameter: createPhoneParameter('+44', '999'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-fire-000',
    code: 'STANDARD_75823910460',
    type: STANDARD_SPEC_TYPE_FIRE_PHONE,
    parameter: createPhoneParameter('+61', '000'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-hospital-120',
    code: 'STANDARD_39582710460',
    type: STANDARD_SPEC_TYPE_HOSPITAL_PHONE,
    parameter: createPhoneParameter('+86', '120'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-hospital-119',
    code: 'STANDARD_84726190530',
    type: STANDARD_SPEC_TYPE_HOSPITAL_PHONE,
    parameter: createPhoneParameter('+81', '119'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-hospital-112',
    code: 'STANDARD_62047395810',
    type: STANDARD_SPEC_TYPE_HOSPITAL_PHONE,
    parameter: createPhoneParameter('+49', '112'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-hospital-911',
    code: 'STANDARD_15963827400',
    type: STANDARD_SPEC_TYPE_HOSPITAL_PHONE,
    parameter: createPhoneParameter('+1', '911'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-hospital-999',
    code: 'STANDARD_70492851630',
    type: STANDARD_SPEC_TYPE_HOSPITAL_PHONE,
    parameter: createPhoneParameter('+44', '999'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-hospital-000',
    code: 'STANDARD_28615094370',
    type: STANDARD_SPEC_TYPE_HOSPITAL_PHONE,
    parameter: createPhoneParameter('+61', '000'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-traffic-accident-122',
    code: 'STANDARD_51490827360',
    type: STANDARD_SPEC_TYPE_TRAFFIC_ACCIDENT_PHONE,
    parameter: createPhoneParameter('+86', '122'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-traffic-accident-110',
    code: 'STANDARD_80376194520',
    type: STANDARD_SPEC_TYPE_TRAFFIC_ACCIDENT_PHONE,
    parameter: createPhoneParameter('+86', '110'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-traffic-accident-112',
    code: 'STANDARD_24719563800',
    type: STANDARD_SPEC_TYPE_TRAFFIC_ACCIDENT_PHONE,
    parameter: createPhoneParameter('+49', '112'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-traffic-accident-911',
    code: 'STANDARD_69042715380',
    type: STANDARD_SPEC_TYPE_TRAFFIC_ACCIDENT_PHONE,
    parameter: createPhoneParameter('+1', '911'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-traffic-accident-999',
    code: 'STANDARD_13286049750',
    type: STANDARD_SPEC_TYPE_TRAFFIC_ACCIDENT_PHONE,
    parameter: createPhoneParameter('+44', '999'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
  {
    id: 'standard-tel-traffic-accident-000',
    code: 'STANDARD_97530421860',
    type: STANDARD_SPEC_TYPE_TRAFFIC_ACCIDENT_PHONE,
    parameter: createPhoneParameter('+61', '000'),
    description: EMPTY_STANDARD_SPEC_SUPPLEMENT,
  },
]

export const SECURITY_RISK_INFOS: SecurityRiskInfoItem[] = [
  {
    id: 'security-general',
    code: 'SECURITY-GENERAL',
    safetyOverview: {
      zh: '整体安全水平适合常规旅行，但应关注热门景区、交通枢纽和夜间街区风险。',
      en: 'Generally suitable for regular travel, with attention needed around attractions, transport hubs, and nightlife areas.',
      ja: '通常の旅行には概ね適していますが、観光地、交通拠点、夜間エリアでは注意が必要です。',
      ko: '일반 여행에는 대체로 적합하지만 관광지, 교통 거점, 야간 지역에서는 주의가 필요합니다.',
      th: 'โดยรวมเหมาะกับการท่องเที่ยวทั่วไป แต่ควรระวังบริเวณแหล่งท่องเที่ยว จุดขนส่ง และย่านกลางคืน',
    },
    riskAreas: {
      zh: '人流密集区、车站周边、偏僻巷道和大型活动现场需提高警惕。',
      en: 'Stay alert in crowded areas, around stations, remote alleys, and large event venues.',
      ja: '混雑エリア、駅周辺、人通りの少ない路地、大規模イベント会場では注意してください。',
      ko: '혼잡 지역, 역 주변, 외진 골목, 대형 행사장에서는 주의를 기울이세요.',
      th: 'ควรระวังพื้นที่แออัด รอบสถานี ซอยเปลี่ยว และสถานที่จัดงานขนาดใหญ่',
    },
    nightStayTime: {
      zh: '建议夜间减少单独逗留，避免深夜前往不熟悉或照明不足区域。',
      en: 'Avoid staying out alone late at night and avoid unfamiliar or poorly lit areas.',
      ja: '夜間の単独滞在を減らし、深夜に不慣れな場所や暗い場所へ行くのは避けてください。',
      ko: '야간 단독 체류를 줄이고 늦은 시간 낯설거나 조명이 부족한 지역은 피하세요.',
      th: 'ควรหลีกเลี่ยงการอยู่ลำพังตอนดึกและหลีกเลี่ยงพื้นที่ไม่คุ้นเคยหรือมีแสงสว่างน้อย',
    },
  },
]

export const CULTURE_INFOS: CultureInfoItem[] = [
  {
    id: 'culture-overview',
    code: 'CULTURE_18492057361',
    type: {
      zh: '文化',
      en: 'Culture',
      ja: '文化',
      ko: '문화',
      th: 'วัฒนธรรม',
    },
    name: {
      zh: '文化概况',
      en: 'Culture Overview',
      ja: '文化概要',
      ko: '문화 개요',
      th: 'ภาพรวมวัฒนธรรม',
    },
    description: {
      zh: '关注当地历史、价值观、公共礼仪和日常交往方式，避免以游客视角做冒犯性评价。',
      en: 'Understand local history, values, public etiquette, and daily interaction norms; avoid offensive tourist-centric judgments.',
      ja: '現地の歴史、価値観、公共マナー、日常的な交流様式を理解し、旅行者視点の失礼な評価は避けてください。',
      ko: '현지 역사, 가치관, 공공 예절, 일상 교류 방식을 이해하고 여행자 중심의 무례한 평가는 피하세요.',
      th: 'ควรเข้าใจประวัติ ค่านิยม มารยาทสาธารณะ และวิธีปฏิสัมพันธ์ในชีวิตประจำวันของท้องถิ่น และหลีกเลี่ยงการตัดสินจากมุมนักท่องเที่ยวอย่างไม่เหมาะสม',
    },
  },
  {
    id: 'culture-public-etiquette',
    code: 'CULTURE_62947105834',
    type: {
      zh: '文化',
      en: 'Culture',
      ja: '文化',
      ko: '문화',
      th: 'วัฒนธรรม',
    },
    name: {
      zh: '公共礼仪',
      en: 'Public Etiquette',
      ja: '公共マナー',
      ko: '공공 예절',
      th: 'มารยาทสาธารณะ',
    },
    description: {
      zh: '公共场所应关注排队、音量、个人空间和垃圾分类等规则，减少文化误解。',
      en: 'Pay attention to queuing, noise level, personal space, and waste-sorting rules in public places to reduce cultural misunderstandings.',
      ja: '公共の場では行列、声量、個人空間、ごみ分別などのルールに注意し、文化的な誤解を減らしてください。',
      ko: '공공장소에서는 줄서기, 소음, 개인 공간, 쓰레기 분리수거 규칙을 확인해 문화적 오해를 줄이세요.',
      th: 'ควรใส่ใจกฎเรื่องการต่อคิว ระดับเสียง พื้นที่ส่วนตัว และการแยกขยะในที่สาธารณะ เพื่อลดความเข้าใจผิดทางวัฒนธรรม',
    },
  },
  {
    id: 'culture-sensitive-topics',
    code: 'CULTURE_80519374620',
    type: {
      zh: '文化',
      en: 'Culture',
      ja: '文化',
      ko: '문화',
      th: 'วัฒนธรรม',
    },
    name: {
      zh: '敏感话题',
      en: 'Sensitive Topics',
      ja: '敏感な話題',
      ko: '민감한 주제',
      th: 'หัวข้ออ่อนไหว',
    },
    description: {
      zh: '避免在公开场合主动讨论政治冲突、历史争议、族群议题或对当地文化做冒犯性判断。',
      en: 'Avoid initiating public discussions about political conflicts, historical disputes, ethnic issues, or offensive judgments about local culture.',
      ja: '公共の場で政治的対立、歴史問題、民族的な話題、現地文化への侮辱的判断を自ら話題にすることは避けてください。',
      ko: '공개된 장소에서 정치적 갈등, 역사 논쟁, 민족 문제, 현지 문화에 대한 모욕적 판단을 먼저 꺼내지 마세요.',
      th: 'หลีกเลี่ยงการเริ่มพูดคุยในที่สาธารณะเกี่ยวกับความขัดแย้งทางการเมือง ข้อพิพาททางประวัติศาสตร์ ประเด็นชาติพันธุ์ หรือการตัดสินวัฒนธรรมท้องถิ่นอย่างไม่เหมาะสม',
    },
  },
  {
    id: 'culture-local-customs',
    code: 'CULTURE_51720498361',
    type: {
      zh: '习俗',
      en: 'Customs',
      ja: '習慣',
      ko: '관습',
      th: 'ธรรมเนียม',
    },
    name: {
      zh: '地区习俗',
      en: 'Local Customs',
      ja: '地域の習慣',
      ko: '지역 관습',
      th: 'ธรรมเนียมท้องถิ่น',
    },
    description: {
      zh: '进入宗教场所、纪念场馆或传统社区时，应遵守着装、拍照和安静礼仪。',
      en: 'Observe dress, photography, and quiet etiquette in religious sites, memorial venues, or traditional communities.',
      ja: '宗教施設、記念施設、伝統的な地域では服装、撮影、静粛マナーを守ってください。',
      ko: '종교 시설, 기념 공간, 전통 공동체에서는 복장, 촬영, 정숙 예절을 지키세요.',
      th: 'เมื่อเข้าศาสนสถาน สถานที่รำลึก หรือชุมชนดั้งเดิม ควรปฏิบัติตามมารยาทเรื่องการแต่งกาย การถ่ายภาพ และความสงบ',
    },
  },
  {
    id: 'culture-tipping-customs',
    code: 'CULTURE_30492857163',
    type: {
      zh: '习俗',
      en: 'Customs',
      ja: '習慣',
      ko: '관습',
      th: 'ธรรมเนียม',
    },
    name: {
      zh: '小费文化',
      en: 'Tipping Culture',
      ja: 'チップ文化',
      ko: '팁 문화',
      th: 'วัฒนธรรมการให้ทิป',
    },
    description: {
      zh: '小费是习俗类具体项目，应按国家和服务场景确认是否必须、建议比例和支付方式。',
      en: 'Tipping is maintained as a customs item; confirm whether it is expected, suggested rates, and payment methods by country and service type.',
      ja: 'チップは習慣カテゴリの具体項目として管理し、国やサービス別に必要性、目安、支払い方法を確認してください。',
      ko: '팁은 관습 유형의 구체 항목으로 관리하며 국가와 서비스 상황별 필요 여부, 권장 비율, 결제 방식을 확인하세요.',
      th: 'การให้ทิปเป็นรายการย่อยในหมวดธรรมเนียม ควรตรวจสอบว่าจำเป็นหรือไม่ อัตราแนะนำ และวิธีจ่ายตามประเทศและบริการ',
    },
  },
  {
    id: 'culture-photo-etiquette',
    code: 'CULTURE_69281740531',
    type: {
      zh: '习俗',
      en: 'Customs',
      ja: '習慣',
      ko: '관습',
      th: 'ธรรมเนียม',
    },
    name: {
      zh: '拍照礼仪',
      en: 'Photography Etiquette',
      ja: '撮影マナー',
      ko: '촬영 예절',
      th: 'มารยาทการถ่ายภาพ',
    },
    description: {
      zh: '人物、宗教仪式、政府设施、纪念场所和传统社区拍摄前应确认是否允许并征得同意。',
      en: 'Confirm permission before photographing people, religious ceremonies, government facilities, memorial sites, and traditional communities.',
      ja: '人物、宗教儀式、政府施設、記念施設、伝統的な地域を撮影する前に許可を確認し、同意を得てください。',
      ko: '사람, 종교 의식, 정부 시설, 기념 장소, 전통 공동체를 촬영하기 전 허용 여부를 확인하고 동의를 받으세요.',
      th: 'ควรตรวจสอบและขออนุญาตก่อนถ่ายภาพบุคคล พิธีกรรมทางศาสนา สถานที่ราชการ สถานที่รำลึก และชุมชนดั้งเดิม',
    },
  },
  {
    id: 'culture-religious-customs',
    code: 'CULTURE_43091857260',
    type: {
      zh: '宗教',
      en: 'Religion',
      ja: '宗教',
      ko: '종교',
      th: 'ศาสนา',
    },
    name: {
      zh: '宗教习俗',
      en: 'Religious Customs',
      ja: '宗教習慣',
      ko: '종교 관습',
      th: 'ธรรมเนียมทางศาสนา',
    },
    description: {
      zh: '避免公开讨论敏感宗教冲突或对当地宗教实践做冒犯性评价。',
      en: 'Avoid public discussion of sensitive religious conflict or offensive comments on local religious practices.',
      ja: '宗教的に敏感な対立や現地の宗教実践への侮辱的な発言は避けてください。',
      ko: '민감한 종교 갈등이나 현지 종교 관습에 대한 모욕적 발언은 피하세요.',
      th: 'หลีกเลี่ยงการพูดคุยเรื่องความขัดแย้งทางศาสนาอ่อนไหว หรือวิจารณ์การปฏิบัติทางศาสนาท้องถิ่นอย่างไม่เหมาะสม',
    },
  },
  {
    id: 'culture-religious-dress',
    code: 'CULTURE_86720519431',
    type: {
      zh: '宗教',
      en: 'Religion',
      ja: '宗教',
      ko: '종교',
      th: 'ศาสนา',
    },
    name: {
      zh: '宗教场所着装',
      en: 'Religious Site Dress Code',
      ja: '宗教施設の服装',
      ko: '종교 시설 복장',
      th: 'การแต่งกายในศาสนสถาน',
    },
    description: {
      zh: '进入宗教场所前应确认是否需要遮肩、遮膝、脱鞋、遮发或避免暴露服装。',
      en: 'Before entering religious sites, confirm whether shoulders, knees, hair, or shoes need specific treatment and avoid revealing clothing.',
      ja: '宗教施設に入る前に、肩や膝、髪を覆う必要、靴を脱ぐ必要、露出の多い服装の可否を確認してください。',
      ko: '종교 시설에 들어가기 전 어깨, 무릎, 머리 가림, 신발 탈의, 노출 의상 제한 여부를 확인하세요.',
      th: 'ก่อนเข้าศาสนสถานควรตรวจสอบว่าต้องคลุมไหล่ คลุมเข่า คลุมผม ถอดรองเท้า หรือหลีกเลี่ยงเสื้อผ้าที่เปิดเผยหรือไม่',
    },
  },
  {
    id: 'culture-dietary-taboos',
    code: 'CULTURE_59402817360',
    type: {
      zh: '宗教',
      en: 'Religion',
      ja: '宗教',
      ko: '종교',
      th: 'ศาสนา',
    },
    name: {
      zh: '饮食禁忌',
      en: 'Dietary Taboos',
      ja: '食事の禁忌',
      ko: '식생활 금기',
      th: 'ข้อห้ามด้านอาหาร',
    },
    description: {
      zh: '涉及宗教或传统饮食限制时，应尊重禁食、酒精、肉类、屠宰方式和餐桌礼仪差异。',
      en: 'Respect fasting, alcohol, meat, slaughtering practices, and table etiquette when religious or traditional dietary restrictions apply.',
      ja: '宗教的または伝統的な食事制限がある場合、断食、酒類、肉類、屠畜方法、食卓マナーの違いを尊重してください。',
      ko: '종교적 또는 전통적 식생활 제한이 있는 경우 금식, 주류, 육류, 도축 방식, 식사 예절 차이를 존중하세요.',
      th: 'เมื่อมีข้อจำกัดด้านอาหารจากศาสนาหรือประเพณี ควรเคารพเรื่องการถือศีลอด แอลกอฮอล์ เนื้อสัตว์ วิธีเชือด และมารยาทบนโต๊ะอาหาร',
    },
  },
]

export const CURRENCY_PAYMENT_INFOS: CurrencyPaymentInfoItem[] = [
  {
    id: 'payment-general',
    code: 'PAYMENT-GENERAL',
    mobilePayment: {
      zh: '移动支付覆盖度因国家而异，建议提前确认游客是否可注册和绑卡。',
      en: 'Mobile payment coverage varies by country; check whether tourists can register and link cards.',
      ja: 'モバイル決済の普及度は国により異なります。旅行者登録やカード連携可否を事前確認してください。',
      ko: '모바일 결제 보급률은 국가별로 다르므로 여행자 가입 및 카드 연동 가능 여부를 확인하세요.',
      th: 'การชำระเงินผ่านมือถือแตกต่างกันไปในแต่ละประเทศ ควรตรวจสอบว่านักท่องเที่ยวสมัครและผูกบัตรได้หรือไม่',
    },
    creditCardPayment: {
      zh: '酒店、商场和连锁商户通常支持信用卡，小店和交通场景可能仍需现金。',
      en: 'Hotels, malls, and chains often accept credit cards, while small shops and transit may still require cash.',
      ja: 'ホテル、商業施設、チェーン店ではカード利用が一般的ですが、小規模店舗や交通では現金が必要な場合があります。',
      ko: '호텔, 쇼핑몰, 체인점은 신용카드가 흔하지만 소규모 상점과 교통에서는 현금이 필요할 수 있습니다.',
      th: 'โรงแรม ห้าง และร้านเชนมักรับบัตรเครดิต แต่ร้านเล็กและการเดินทางบางประเภทอาจต้องใช้เงินสด',
    },
    tippingCulture: {
      zh: '小费文化差异较大，应按国家和服务场景确认是否必须、建议比例和支付方式。',
      en: 'Tipping customs vary widely; confirm whether it is expected, suggested rates, and payment methods by country and service type.',
      ja: 'チップ文化は大きく異なるため、国やサービス別に必要性、目安、支払い方法を確認してください。',
      ko: '팁 문화는 크게 다르므로 국가와 서비스 상황별 필요 여부, 권장 비율, 결제 방식을 확인하세요.',
      th: 'วัฒนธรรมการให้ทิปแตกต่างกันมาก ควรตรวจสอบว่าจำเป็นหรือไม่ อัตราแนะนำ และวิธีจ่ายตามประเทศและบริการ',
    },
  },
]
