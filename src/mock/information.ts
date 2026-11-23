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

export interface CurrencyInfoItem {
  id: string
  code: string
  value: string
  name: LocalizedInfoText
}

export type TourismInfoLevel = 'province' | 'city' | 'point' | 'landmark'

export interface TourismInfoTypeItem {
  code: string
  level: TourismInfoLevel
  value: string
  name: LocalizedInfoText
}

export interface TourismInfoItem {
  id: string
  code: string
  level: TourismInfoLevel
  typeValue: string
  type: LocalizedInfoText
  value?: string
  name: LocalizedInfoText
  description: LocalizedInfoText
  supplement?: {
    type: StandardSpecSupplementType
    content: StandardSpecSupplementContent
  }
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
    code: 'COMMUNICATION_18492057361',
    value: 'ESIM_SIM_CARD',
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
    code: 'COMMUNICATION_62947105834',
    value: 'INTERNATIONAL_ROAMING',
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
    code: 'COMMUNICATION_80519374620',
    value: 'POCKET_WIFI',
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

export const TOURISM_INFO_TYPES: TourismInfoTypeItem[] = [
  {
    code: 'TOURISM_TYPE_10492837561',
    level: 'province',
    value: 'REGIONAL_LANDSCAPE',
    name: { zh: '区域地貌', en: 'Regional Landscape', ja: '地域地形', ko: '지역 지형', th: 'ภูมิประเทศภูมิภาค' },
  },
  {
    code: 'TOURISM_TYPE_58392017462',
    level: 'province',
    value: 'REGIONAL_CULTURE_BELT',
    name: { zh: '文化圈层', en: 'Cultural Belt', ja: '文化圏', ko: '문화권', th: 'เขตวัฒนธรรม' },
  },
  {
    code: 'TOURISM_TYPE_73104928650',
    level: 'province',
    value: 'REGIONAL_HERITAGE_CLUSTER',
    name: { zh: '遗产集群', en: 'Heritage Cluster', ja: '遺産群', ko: '유산 군집', th: 'กลุ่มมรดก' },
  },
  {
    code: 'TOURISM_TYPE_29061473815',
    level: 'province',
    value: 'REGIONAL_CUISINE_SYSTEM',
    name: { zh: '风味体系', en: 'Cuisine System', ja: '食文化体系', ko: '음식 체계', th: 'ระบบอาหารท้องถิ่น' },
  },
  {
    code: 'TOURISM_TYPE_64820591734',
    level: 'province',
    value: 'REGIONAL_SEASONAL_EVENT',
    name: { zh: '季节活动', en: 'Seasonal Events', ja: '季節行事', ko: '계절 행사', th: 'กิจกรรมตามฤดูกาล' },
  },
  {
    code: 'TOURISM_TYPE_80519374620',
    level: 'city',
    value: 'CITY_DISTRICT',
    name: { zh: '城市街区', en: 'Urban Districts', ja: '都市地区', ko: '도시 지구', th: 'ย่านเมือง' },
  },
  {
    code: 'TOURISM_TYPE_91350728461',
    level: 'city',
    value: 'CITY_LIFESTYLE',
    name: { zh: '城市生活', en: 'City Lifestyle', ja: '都市生活', ko: '도시 생활', th: 'วิถีชีวิตเมือง' },
  },
  {
    code: 'TOURISM_TYPE_47281960350',
    level: 'city',
    value: 'CITY_FOOD_SCENE',
    name: { zh: '餐饮场景', en: 'Dining Scene', ja: '飲食シーン', ko: '식도락 장면', th: 'ฉากอาหารเมือง' },
  },
  {
    code: 'TOURISM_TYPE_63902817452',
    level: 'city',
    value: 'CITY_HERITAGE_SCENE',
    name: { zh: '城市遗产', en: 'Urban Heritage', ja: '都市遺産', ko: '도시 유산', th: 'มรดกเมือง' },
  },
  {
    code: 'TOURISM_TYPE_81726394058',
    level: 'city',
    value: 'CITY_EVENT_SCENE',
    name: { zh: '城市活动', en: 'City Events', ja: '都市イベント', ko: '도시 행사', th: 'กิจกรรมเมือง' },
  },
  {
    code: 'TOURISM_TYPE_50183726490',
    level: 'point',
    value: 'OPENING_NOTICE',
    name: { zh: '开放提示', en: 'Opening Notice', ja: '営業案内', ko: '운영 안내', th: 'ข้อมูลเวลาเปิด' },
  },
  {
    code: 'TOURISM_TYPE_62819475036',
    level: 'point',
    value: 'TICKET_NOTICE',
    name: { zh: '票务提示', en: 'Ticket Notice', ja: 'チケット案内', ko: '티켓 안내', th: 'ข้อมูลตั๋ว' },
  },
  {
    code: 'TOURISM_TYPE_71938502641',
    level: 'point',
    value: 'RESERVATION_NOTICE',
    name: { zh: '预约提示', en: 'Reservation Notice', ja: '予約案内', ko: '예약 안내', th: 'ข้อมูลการจอง' },
  },
  {
    code: 'TOURISM_TYPE_38274910658',
    level: 'point',
    value: 'FACILITY_NOTICE',
    name: { zh: '设施服务', en: 'Facilities', ja: '施設サービス', ko: '시설 서비스', th: 'สิ่งอำนวยความสะดวก' },
  },
  {
    code: 'TOURISM_TYPE_94620581734',
    level: 'point',
    value: 'ARRIVAL_GUIDE',
    name: { zh: '到达方式', en: 'Arrival Guide', ja: 'アクセス方法', ko: '도착 방법', th: 'วิธีเดินทางไปถึง' },
  },
  {
    code: 'TOURISM_TYPE_27059481635',
    level: 'point',
    value: 'ACCESSIBILITY',
    name: { zh: '无障碍', en: 'Accessibility', ja: 'バリアフリー', ko: '접근성', th: 'การเข้าถึง' },
  },
  {
    code: 'TOURISM_TYPE_61384902755',
    level: 'point',
    value: 'CROWD_NOTICE',
    name: { zh: '拥挤提示', en: 'Crowd Notice', ja: '混雑案内', ko: '혼잡 안내', th: 'ข้อมูลความแออัด' },
  },
  {
    code: 'TOURISM_TYPE_75492068133',
    level: 'landmark',
    value: 'GUIDE_INFO',
    name: { zh: '讲解信息', en: 'Guide Info', ja: 'ガイド情報', ko: '해설 정보', th: 'ข้อมูลไกด์' },
  },
  {
    code: 'TOURISM_TYPE_49281630754',
    level: 'landmark',
    value: 'VISIT_ROUTE',
    name: { zh: '参观动线', en: 'Visit Route', ja: '見学ルート', ko: '관람 동선', th: 'เส้นทางเข้าชม' },
  },
  {
    code: 'TOURISM_TYPE_83620491750',
    level: 'landmark',
    value: 'PHOTO_TIP',
    name: { zh: '拍摄提示', en: 'Photo Tips', ja: '撮影のヒント', ko: '촬영 팁', th: 'เคล็ดลับถ่ายภาพ' },
  },
  {
    code: 'TOURISM_TYPE_19573840627',
    level: 'landmark',
    value: 'QUEUE_NOTICE',
    name: { zh: '排队提示', en: 'Queue Notice', ja: '待ち時間案内', ko: '대기 안내', th: 'ข้อมูลการรอคิว' },
  },
  {
    code: 'TOURISM_TYPE_68031594722',
    level: 'landmark',
    value: 'BEST_VISIT_TIME',
    name: { zh: '最佳时段', en: 'Best Time', ja: 'おすすめ時間帯', ko: '추천 시간대', th: 'ช่วงเวลาที่แนะนำ' },
  },
  {
    code: 'TOURISM_TYPE_52740918366',
    level: 'landmark',
    value: 'CULTURE_INTERPRETATION',
    name: { zh: '文化解读', en: 'Culture Interpretation', ja: '文化解説', ko: '문화 해설', th: 'คำอธิบายวัฒนธรรม' },
  },
]

export const TOURISM_INFOS: TourismInfoItem[] = [
  {
    id: 'tourism-region-geography-mountain-coast',
    code: 'TOURISM_10492837561',
    level: 'province',
    typeValue: 'REGIONAL_LANDSCAPE',
    type: TOURISM_INFO_TYPES[0].name,
    value: 'MOUNTAIN_COAST',
    name: { zh: '山海地貌', en: 'Mountain and Coast Terrain', ja: '山と海の地形', ko: '산과 해안 지형', th: 'ภูมิประเทศภูเขาและชายฝั่ง' },
    description: { zh: '用于描述省域内山脉、海岸、湖泊、河谷等地理形态对旅行体验的影响。', en: 'Describes how mountains, coasts, lakes, valleys, and other geography shape regional travel.', ja: '山脈、海岸、湖、渓谷などの地理が地域旅行に与える影響を示します。', ko: '산맥, 해안, 호수, 계곡 등 지형이 지역 여행 경험에 미치는 영향을 설명합니다.', th: 'ใช้อธิบายภูเขา ชายฝั่ง ทะเลสาบ หุบเขา และภูมิศาสตร์ที่ส่งผลต่อการท่องเที่ยวระดับภูมิภาค' },
  },
  {
    id: 'tourism-region-humanity-festival',
    code: 'TOURISM_58392017462',
    level: 'province',
    typeValue: 'REGIONAL_CULTURE_BELT',
    type: TOURISM_INFO_TYPES[1].name,
    value: 'LOCAL_FESTIVAL',
    name: { zh: '地方节庆与手作', en: 'Local Festivals and Crafts', ja: '地域祭りと手仕事', ko: '지역 축제와 수공예', th: 'เทศกาลและงานฝีมือท้องถิ่น' },
    description: { zh: '用于维护跨城市共享的地方节庆、非遗手作、民俗活动和区域性人文体验。', en: 'Covers province-wide festivals, crafts, folk activities, and cultural experiences shared across cities.', ja: '都市をまたいで共有される祭り、工芸、民俗活動、地域文化体験を扱います。', ko: '여러 도시에 걸친 축제, 공예, 민속 활동, 지역 인문 경험을 관리합니다.', th: 'ใช้กับเทศกาล งานฝีมือ กิจกรรมพื้นบ้าน และประสบการณ์วัฒนธรรมที่พบได้หลายเมืองในภูมิภาค' },
  },
  {
    id: 'tourism-region-religion-heritage',
    code: 'TOURISM_73104928650',
    level: 'province',
    typeValue: 'REGIONAL_HERITAGE_CLUSTER',
    type: TOURISM_INFO_TYPES[2].name,
    value: 'RELIGIOUS_HERITAGE',
    name: { zh: '宗教遗产带', en: 'Religious Heritage Belt', ja: '宗教遺産地帯', ko: '종교 유산권', th: 'แนวมรดกศาสนา' },
    description: { zh: '用于描述省域内寺院、教堂、圣地、朝圣路线等宗教文化资源。', en: 'Describes temples, churches, sacred places, pilgrimage routes, and other religious resources in the region.', ja: '寺院、教会、聖地、巡礼路など地域内の宗教文化資源を説明します。', ko: '사찰, 교회, 성지, 순례길 등 지역 내 종교 문화 자원을 설명합니다.', th: 'ใช้อธิบายวัด โบสถ์ สถานที่ศักดิ์สิทธิ์ เส้นทางแสวงบุญ และทรัพยากรศาสนาในภูมิภาค' },
  },
  {
    id: 'tourism-region-food-local-cuisine',
    code: 'TOURISM_29061473815',
    level: 'province',
    typeValue: 'REGIONAL_CUISINE_SYSTEM',
    type: TOURISM_INFO_TYPES[3].name,
    value: 'LOCAL_CUISINE',
    name: { zh: '区域风味菜系', en: 'Regional Cuisine', ja: '地域料理', ko: '지역 요리', th: 'อาหารประจำภูมิภาค' },
    description: { zh: '用于维护省域通行的代表菜系、食材产地、饮食禁忌和跨城市美食主题。', en: 'Maintains regional cuisines, ingredient origins, dietary notes, and food themes shared across cities.', ja: '地域料理、食材産地、食事上の注意、都市をまたぐ食文化テーマを扱います。', ko: '지역 요리, 식재료 산지, 식사 주의사항, 여러 도시의 미식 주제를 관리합니다.', th: 'ใช้กับอาหารประจำภูมิภาค แหล่งวัตถุดิบ ข้อควรระวังด้านอาหาร และธีมอาหารหลายเมือง' },
  },
  {
    id: 'tourism-region-history-heritage',
    code: 'TOURISM_64820591734',
    level: 'province',
    typeValue: 'REGIONAL_SEASONAL_EVENT',
    type: TOURISM_INFO_TYPES[4].name,
    value: 'SEASONAL_EVENT_BELT',
    name: { zh: '花期与节庆窗口', en: 'Bloom and Festival Window', ja: '花期と祭りの時期', ko: '개화와 축제 시즌', th: 'ช่วงดอกไม้และเทศกาล' },
    description: { zh: '用于维护省域尺度的花期、雪季、丰收季、节庆季和跨城市活动窗口。', en: 'Maintains bloom periods, snow seasons, harvest seasons, festival seasons, and cross-city event windows.', ja: '地域規模の花期、雪の季節、収穫期、祭りの季節、都市横断イベント期間を扱います。', ko: '지역 단위의 개화기, 설경 시즌, 수확철, 축제철, 도시 간 행사 기간을 관리합니다.', th: 'ใช้กับช่วงดอกไม้ ฤดูหิมะ ฤดูเก็บเกี่ยว เทศกาล และช่วงกิจกรรมหลายเมืองในภูมิภาค' },
  },
  {
    id: 'tourism-city-geography-waterfront',
    code: 'TOURISM_80519374620',
    level: 'city',
    typeValue: 'CITY_DISTRICT',
    type: TOURISM_INFO_TYPES[5].name,
    value: 'WATERFRONT_CITY',
    name: { zh: '滨水核心街区', en: 'Waterfront Core District', ja: '水辺中心地区', ko: '수변 핵심 지구', th: 'ย่านริมน้ำหลัก' },
    description: { zh: '用于维护城市内适合游客停留、步行、购物和观景的核心街区或片区。', en: 'Maintains core districts suitable for staying, walking, shopping, and city views.', ja: '滞在、街歩き、買物、景観に適した都市内中心地区を扱います。', ko: '체류, 도보 관광, 쇼핑, 전망에 적합한 도시 핵심 지구를 관리합니다.', th: 'ใช้กับย่านหลักในเมืองที่เหมาะกับการพัก เดินเที่ยว ช้อปปิ้ง และชมวิว' },
  },
  {
    id: 'tourism-city-humanity-neighborhood',
    code: 'TOURISM_91350728461',
    level: 'city',
    typeValue: 'CITY_LIFESTYLE',
    type: TOURISM_INFO_TYPES[6].name,
    value: 'LOCAL_NEIGHBORHOOD',
    name: { zh: '在地生活街区', en: 'Local Lifestyle Neighborhood', ja: 'ローカル生活街区', ko: '현지 생활 동네', th: 'ย่านวิถีชีวิตท้องถิ่น' },
    description: { zh: '用于维护城市街区气质、市集、社区活动、手作店和本地生活方式。', en: 'Maintains neighborhood character, markets, community events, craft shops, and local lifestyles.', ja: '街区の雰囲気、市場、地域イベント、手仕事店、ローカルな暮らしを扱います。', ko: '동네 분위기, 시장, 지역 행사, 공방, 현지 생활 방식을 관리합니다.', th: 'ใช้กับบรรยากาศย่าน ตลาด กิจกรรมชุมชน ร้านงานฝีมือ และวิถีชีวิตท้องถิ่น' },
  },
  {
    id: 'tourism-city-religion-district',
    code: 'TOURISM_47281960350',
    level: 'city',
    typeValue: 'CITY_FOOD_SCENE',
    type: TOURISM_INFO_TYPES[7].name,
    value: 'SIGNATURE_DINING_BLOCK',
    name: { zh: '代表餐饮街区', en: 'Signature Dining Block', ja: '代表的な飲食地区', ko: '대표 미식 거리', th: 'ย่านอาหารเด่น' },
    description: { zh: '用于维护城市内代表餐饮街区、餐厅聚集区、夜宵区域和游客餐饮提示。', en: 'Maintains signature dining blocks, restaurant clusters, late-night dining areas, and visitor food notes.', ja: '代表的な飲食地区、飲食店集積地、夜食エリア、旅行者向け食事案内を扱います。', ko: '대표 음식 거리, 식당 밀집 지역, 야식 구역, 관광객 식사 안내를 관리합니다.', th: 'ใช้กับย่านอาหารเด่น กลุ่มร้านอาหาร พื้นที่อาหารกลางคืน และคำแนะนำด้านอาหารสำหรับนักท่องเที่ยว' },
  },
  {
    id: 'tourism-city-food-night-market',
    code: 'TOURISM_63902817452',
    level: 'city',
    typeValue: 'CITY_HERITAGE_SCENE',
    type: TOURISM_INFO_TYPES[8].name,
    value: 'OLD_TOWN_HERITAGE',
    name: { zh: '老城与建筑遗产', en: 'Old Town and Built Heritage', ja: '旧市街と建築遺産', ko: '구시가지와 건축 유산', th: 'เมืองเก่าและมรดกสถาปัตยกรรม' },
    description: { zh: '用于维护城市旧城、历史建筑、工业遗产、殖民街区和城市更新背景。', en: 'Maintains old towns, historic buildings, industrial heritage, colonial districts, and urban renewal context.', ja: '旧市街、歴史的建築、産業遺産、植民地時代の街区、都市再生の背景を扱います。', ko: '구시가지, 역사 건축, 산업 유산, 식민지 지구, 도시 재생 배경을 관리합니다.', th: 'ใช้กับเมืองเก่า อาคารประวัติศาสตร์ มรดกอุตสาหกรรม ย่านยุคอาณานิคม และบริบทการฟื้นฟูเมือง' },
  },
  {
    id: 'tourism-city-history-old-town',
    code: 'TOURISM_81726394058',
    level: 'city',
    typeValue: 'CITY_EVENT_SCENE',
    type: TOURISM_INFO_TYPES[9].name,
    value: 'CITY_EVENT_CALENDAR',
    name: { zh: '展演与城市活动', en: 'Performances and City Events', ja: '公演と都市イベント', ko: '공연과 도시 행사', th: 'การแสดงและกิจกรรมเมือง' },
    description: { zh: '用于维护城市展演、夜间活动、市集、体育赛事和临时城市活动。', en: 'Maintains performances, nightlife events, markets, sports events, and temporary city happenings.', ja: '公演、夜間イベント、市場、スポーツイベント、期間限定都市イベントを扱います。', ko: '공연, 야간 행사, 시장, 스포츠 이벤트, 임시 도시 행사를 관리합니다.', th: 'ใช้กับการแสดง กิจกรรมกลางคืน ตลาด งานกีฬา และกิจกรรมเมืองชั่วคราว' },
  },
  {
    id: 'tourism-point-opening-seasonal',
    code: 'TOURISM_50183726490',
    level: 'point',
    typeValue: 'OPENING_NOTICE',
    type: TOURISM_INFO_TYPES[10].name,
    value: 'SEASONAL_HOURS',
    name: { zh: '季节性开放时间', en: 'Seasonal Opening Hours', ja: '季節営業時間', ko: '계절별 운영시간', th: 'เวลาเปิดตามฤดูกาล' },
    description: { zh: '点位开放时间随季节、天气或活动调整，发布前需核对当天开放状态。', en: 'Opening hours may change by season, weather, or events; verify same-day status before publishing.', ja: '季節、天候、イベントにより営業時間が変わるため、公開前に当日状況を確認します。', ko: '계절, 날씨, 행사에 따라 운영시간이 달라질 수 있어 게시 전 당일 상태 확인이 필요합니다.', th: 'เวลาเปิดอาจเปลี่ยนตามฤดูกาล อากาศ หรือกิจกรรม ควรตรวจสอบสถานะวันจริงก่อนเผยแพร่' },
  },
  {
    id: 'tourism-point-ticket-timed',
    code: 'TOURISM_62819475036',
    level: 'point',
    typeValue: 'TICKET_NOTICE',
    type: TOURISM_INFO_TYPES[11].name,
    value: 'TIMED_TICKET',
    name: { zh: '分时预约票', en: 'Timed Ticket', ja: '時間指定チケット', ko: '시간 지정 티켓', th: 'ตั๋วตามช่วงเวลา' },
    description: { zh: '热门点位可能需要分时段购票或实名预约，建议提前确认退改规则。', en: 'Popular points may require timed or real-name tickets; check cancellation and change rules in advance.', ja: '人気スポットでは時間指定や実名予約が必要な場合があり、変更・取消規定も確認します。', ko: '인기 지점은 시간 지정 또는 실명 예약이 필요할 수 있어 변경 및 취소 규정을 확인해야 합니다.', th: 'จุดยอดนิยมอาจต้องจองเป็นช่วงเวลาหรือใช้ชื่อจริง ควรตรวจสอบกฎเปลี่ยน/ยกเลิกก่อน' },
  },
  {
    id: 'tourism-point-reservation-required',
    code: 'TOURISM_71938502641',
    level: 'point',
    typeValue: 'RESERVATION_NOTICE',
    type: TOURISM_INFO_TYPES[12].name,
    value: 'ADVANCE_RESERVATION',
    name: { zh: '建议提前预约', en: 'Advance Reservation Suggested', ja: '事前予約推奨', ko: '사전 예약 권장', th: 'แนะนำจองล่วงหน้า' },
    description: { zh: '适用于容量有限、体验项目或热门餐厅等需要提前锁定名额的点位。', en: 'For limited-capacity points, experiences, or popular restaurants that should be reserved in advance.', ja: '定員制、体験型、人気レストランなど事前に枠を確保すべき地点向けです。', ko: '정원 제한, 체험형, 인기 식당 등 사전 예약이 필요한 지점에 적합합니다.', th: 'เหมาะกับจุดที่จำกัดจำนวน กิจกรรม体验 หรือร้านยอดนิยมที่ควรจองล่วงหน้า' },
  },
  {
    id: 'tourism-point-facility-family',
    code: 'TOURISM_38274910658',
    level: 'point',
    typeValue: 'FACILITY_NOTICE',
    type: TOURISM_INFO_TYPES[13].name,
    value: 'FAMILY_FACILITIES',
    name: { zh: '亲子与基础设施', en: 'Family Facilities', ja: 'ファミリー設備', ko: '가족 편의시설', th: 'สิ่งอำนวยความสะดวกสำหรับครอบครัว' },
    description: { zh: '适合维护卫生间、母婴室、储物、休息区、无障碍入口等具体设施信息。', en: 'Use for restrooms, baby rooms, lockers, rest areas, accessible entrances, and similar facilities.', ja: 'トイレ、授乳室、ロッカー、休憩所、バリアフリー入口などの施設情報向けです。', ko: '화장실, 수유실, 보관함, 휴식 공간, 무장애 입구 등 시설 정보에 적합합니다.', th: 'ใช้กับข้อมูลห้องน้ำ ห้องแม่และเด็ก ล็อกเกอร์ จุดพัก และทางเข้าสำหรับผู้พิการ' },
  },
  {
    id: 'tourism-point-arrival-last-mile',
    code: 'TOURISM_94620581734',
    level: 'point',
    typeValue: 'ARRIVAL_GUIDE',
    type: TOURISM_INFO_TYPES[14].name,
    value: 'LAST_MILE_WALK',
    name: { zh: '最后一公里步行', en: 'Last-mile Walk', ja: 'ラストワンマイル徒歩', ko: '마지막 구간 도보', th: 'เดินช่วงสุดท้าย' },
    description: { zh: '点位距离公共交通仍需步行，适合提示坡道、楼梯、夜间照明和雨天替代方案。', en: 'For points requiring a walk from transit; note slopes, stairs, lighting, and rainy-day alternatives.', ja: '公共交通から徒歩が必要な地点向けで、坂道、階段、夜間照明、雨天代替を示します。', ko: '대중교통 하차 후 도보가 필요한 지점에 적합하며 경사, 계단, 야간 조명, 우천 대안을 안내합니다.', th: 'เหมาะกับจุดที่ต้องเดินต่อจากขนส่งสาธารณะ ระบุทางลาด บันได ไฟกลางคืน และทางเลือกเมื่อฝนตก' },
  },
  {
    id: 'tourism-point-accessibility-step-free',
    code: 'TOURISM_27059481635',
    level: 'point',
    typeValue: 'ACCESSIBILITY',
    type: TOURISM_INFO_TYPES[15].name,
    value: 'STEP_FREE_ROUTE',
    name: { zh: '无台阶路线', en: 'Step-free Route', ja: '段差なしルート', ko: '무단차 경로', th: 'เส้นทางไม่มีขั้นบันได' },
    description: { zh: '适用于轮椅、婴儿车或携带大件行李游客，需要标注入口、电梯和替代路线。', en: 'For wheelchair, stroller, or large-luggage visitors; note entrances, elevators, and alternate routes.', ja: '車椅子、ベビーカー、大型荷物の旅行者向けに入口、エレベーター、代替経路を示します。', ko: '휠체어, 유모차, 큰 짐이 있는 여행자를 위해 입구, 엘리베이터, 대체 경로를 표시합니다.', th: 'สำหรับผู้ใช้รถเข็น รถเข็นเด็ก หรือสัมภาระใหญ่ ควรระบุทางเข้า ลิฟต์ และเส้นทางสำรอง' },
  },
  {
    id: 'tourism-point-crowd-peak',
    code: 'TOURISM_61384902755',
    level: 'point',
    typeValue: 'CROWD_NOTICE',
    type: TOURISM_INFO_TYPES[16].name,
    value: 'PEAK_QUEUE',
    name: { zh: '高峰排队明显', en: 'Peak Queue Expected', ja: 'ピーク時待ち時間あり', ko: '피크 시간 대기 예상', th: 'คาดว่าคิวหนาแน่นช่วงพีค' },
    description: { zh: '适合热门点位，建议游客避开周末、节假日或固定演出前后的高峰时段。', en: 'For popular points; visitors should avoid weekends, holidays, or peaks around scheduled shows.', ja: '人気スポット向けで、週末、祝日、定時公演前後のピークを避ける案内です。', ko: '인기 지점에 적합하며 주말, 공휴일, 정기 공연 전후 피크를 피하도록 안내합니다.', th: 'เหมาะกับจุดยอดนิยม แนะนำหลีกเลี่ยงวันหยุดหรือช่วงก่อนหลังรอบการแสดง' },
  },
  {
    id: 'tourism-landmark-guide-audio',
    code: 'TOURISM_75492068133',
    level: 'landmark',
    typeValue: 'GUIDE_INFO',
    type: TOURISM_INFO_TYPES[17].name,
    value: 'AUDIO_GUIDE',
    name: { zh: '多语言语音讲解', en: 'Multilingual Audio Guide', ja: '多言語音声ガイド', ko: '다국어 오디오 가이드', th: 'ออดิโอไกด์หลายภาษา' },
    description: { zh: '地标支持语音讲解、导览器或 App 导览时绑定，用于提示游客获取方式和语言覆盖。', en: 'Bind when a landmark supports audio devices or app guides, including access method and language coverage.', ja: '名所が音声ガイドやアプリ導覽に対応する場合、利用方法と言語対応を案内します。', ko: '랜드마크가 오디오 장치나 앱 안내를 지원할 때 이용 방법과 언어 지원을 안내합니다.', th: 'ใช้เมื่อแลนด์มาร์กรองรับออดิโอไกด์หรือแอปนำชม พร้อมวิธีรับและภาษาที่รองรับ' },
  },
  {
    id: 'tourism-landmark-route-one-way',
    code: 'TOURISM_49281630754',
    level: 'landmark',
    typeValue: 'VISIT_ROUTE',
    type: TOURISM_INFO_TYPES[18].name,
    value: 'ONE_WAY_FLOW',
    name: { zh: '单向参观动线', en: 'One-way Visitor Flow', ja: '一方通行見学動線', ko: '일방향 관람 동선', th: 'เส้นทางเข้าชมทางเดียว' },
    description: { zh: '适用于入口、出口、观景台或展厅存在固定单向参观顺序的地标。', en: 'For landmarks with fixed one-way order across entrance, exit, viewpoints, or exhibition halls.', ja: '入口、出口、展望台、展示室などに固定の一方通行順路がある名所向けです。', ko: '입구, 출구, 전망대, 전시실 등에 고정 일방향 순서가 있는 랜드마크에 적합합니다.', th: 'เหมาะกับแลนด์มาร์กที่มีลำดับเดินชมทางเดียวผ่านทางเข้า ทางออก จุดชมวิว หรือห้องจัดแสดง' },
  },
  {
    id: 'tourism-landmark-photo-sunrise',
    code: 'TOURISM_83620491750',
    level: 'landmark',
    typeValue: 'PHOTO_TIP',
    type: TOURISM_INFO_TYPES[19].name,
    value: 'SUNRISE_SUNSET',
    name: { zh: '日出日落机位', en: 'Sunrise and Sunset Spots', ja: '日の出・夕景撮影位置', ko: '일출·일몰 촬영 포인트', th: 'จุดถ่ายภาพพระอาทิตย์ขึ้นและตก' },
    description: { zh: '用于维护地标拍摄角度、最佳光线、禁拍区域和人流避让建议。', en: 'Use for photo angles, best light, restricted areas, and crowd-avoidance suggestions.', ja: '撮影角度、最適な光、撮影禁止エリア、混雑回避の案内に使います。', ko: '촬영 각도, 최적의 빛, 촬영 금지 구역, 혼잡 회피 안내에 사용합니다.', th: 'ใช้ระบุมุมถ่ายภาพ แสงที่ดีที่สุด พื้นที่ห้ามถ่าย และคำแนะนำเลี่ยงคนเยอะ' },
  },
  {
    id: 'tourism-landmark-queue-security',
    code: 'TOURISM_19573840627',
    level: 'landmark',
    typeValue: 'QUEUE_NOTICE',
    type: TOURISM_INFO_TYPES[20].name,
    value: 'SECURITY_CHECK_QUEUE',
    name: { zh: '安检排队', en: 'Security Check Queue', ja: '保安検査待ち', ko: '보안 검색 대기', th: 'คิวตรวจความปลอดภัย' },
    description: { zh: '地标入口存在安检或实名核验时使用，适合提示禁止携带物和预留排队时间。', en: 'Use when entry includes security or identity checks; note prohibited items and buffer time.', ja: '入口で保安検査や本人確認がある場合、持込禁止物と待ち時間余裕を案内します。', ko: '입구에서 보안 검색 또는 신원 확인이 있는 경우 반입 금지 물품과 대기 시간을 안내합니다.', th: 'ใช้เมื่อทางเข้ามีการตรวจความปลอดภัยหรือยืนยันตัวตน ระบุของต้องห้ามและเวลารอ' },
  },
  {
    id: 'tourism-landmark-best-time-golden-hour',
    code: 'TOURISM_68031594722',
    level: 'landmark',
    typeValue: 'BEST_VISIT_TIME',
    type: TOURISM_INFO_TYPES[21].name,
    value: 'GOLDEN_HOUR',
    name: { zh: '黄金时段到访', en: 'Golden Hour Visit', ja: 'ゴールデンアワー訪問', ko: '골든아워 방문', th: 'เข้าชมช่วงแสงทอง' },
    description: { zh: '适合观景、拍摄或夜景地标，用于提示最佳光线、开灯时间和人流峰值。', en: 'For viewpoints, photo spots, or night-view landmarks; note light, illumination time, and crowd peaks.', ja: '展望、撮影、夜景名所向けに、光、点灯時間、混雑ピークを示します。', ko: '전망, 촬영, 야경 랜드마크에 적합하며 빛, 점등 시간, 혼잡 피크를 안내합니다.', th: 'เหมาะกับจุดชมวิว ถ่ายภาพ หรือแลนด์มาร์กกลางคืน ระบุแสง เวลาเปิดไฟ และช่วงคนเยอะ' },
  },
  {
    id: 'tourism-landmark-culture-symbol',
    code: 'TOURISM_52740918366',
    level: 'landmark',
    typeValue: 'CULTURE_INTERPRETATION',
    type: TOURISM_INFO_TYPES[22].name,
    value: 'SYMBOL_STORY',
    name: { zh: '地标象征故事', en: 'Symbolic Landmark Story', ja: '象徴的な物語', ko: '상징적 이야기', th: 'เรื่องราวสัญลักษณ์ของแลนด์มาร์ก' },
    description: { zh: '用于解释地标背后的历史、宗教、城市记忆或建筑象征。', en: 'Explains the history, religion, city memory, or architectural symbolism behind a landmark.', ja: '名所の背景にある歴史、宗教、都市記憶、建築的象徴を説明します。', ko: '랜드마크 뒤의 역사, 종교, 도시 기억, 건축 상징을 설명합니다.', th: 'ใช้อธิบายประวัติ ศาสนา ความทรงจำเมือง หรือสัญลักษณ์ทางสถาปัตยกรรมของแลนด์มาร์ก' },
  },
]
