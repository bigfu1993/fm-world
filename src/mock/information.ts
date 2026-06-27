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

export interface CultureCustomInfoItem {
  id: string
  code: string
  regionalTaboos: LocalizedInfoText
  sensitiveBehaviors: LocalizedInfoText
}

export interface ReligionInfoItem {
  id: string
  code: string
  name: LocalizedInfoText
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
  name: LocalizedInfoText
}

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

export const CULTURE_CUSTOM_INFOS: CultureCustomInfoItem[] = [
  {
    id: 'culture-general',
    code: 'CULTURE-GENERAL',
    regionalTaboos: {
      zh: '进入宗教场所、纪念场馆或传统社区时，应遵守着装、拍照和安静礼仪。',
      en: 'Observe dress, photography, and quiet etiquette in religious sites, memorial venues, or traditional communities.',
      ja: '宗教施設、記念施設、伝統的な地域では服装、撮影、静粛マナーを守ってください。',
      ko: '종교 시설, 기념 공간, 전통 공동체에서는 복장, 촬영, 정숙 예절을 지키세요.',
      th: 'เมื่อเข้าศาสนสถาน สถานที่รำลึก หรือชุมชนดั้งเดิม ควรปฏิบัติตามมารยาทเรื่องการแต่งกาย การถ่ายภาพ และความสงบ',
    },
    sensitiveBehaviors: {
      zh: '避免公开讨论敏感政治、宗教冲突或对当地习俗做冒犯性评价。',
      en: 'Avoid public discussion of sensitive politics, religious conflict, or offensive comments on local customs.',
      ja: '政治的に敏感な話題、宗教対立、現地習慣への侮辱的な発言は避けてください。',
      ko: '민감한 정치, 종교 갈등, 현지 관습에 대한 모욕적 발언은 피하세요.',
      th: 'หลีกเลี่ยงการพูดคุยประเด็นการเมืองอ่อนไหว ความขัดแย้งทางศาสนา หรือวิจารณ์วัฒนธรรมท้องถิ่นอย่างไม่เหมาะสม',
    },
  },
]

export const RELIGION_INFOS: ReligionInfoItem[] = [
  {
    id: 'religion-general',
    code: 'RELIGION_48290517364',
    name: {
      zh: '宗教习俗',
      en: 'Religious Customs',
      ja: '宗教習慣',
      ko: '종교 관습',
      th: 'ธรรมเนียมทางศาสนา',
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
