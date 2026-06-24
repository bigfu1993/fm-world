import type { LanguageCode } from '@/types/system'

export interface InformationItem {
  id: string
  code: string
  name: Record<LanguageCode, string>
}

type LocalizedInfoText = Record<LanguageCode, string>

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
  description: LocalizedInfoText
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

export interface CurrencyPaymentInfoItem {
  id: string
  code: string
  mobilePayment: LocalizedInfoText
  creditCardPayment: LocalizedInfoText
  tippingCulture: LocalizedInfoText
}

export interface EmergencyHandlingInfoItem {
  id: string
  code: string
  policeEmergency: LocalizedInfoText
  fireEmergency: LocalizedInfoText
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
    id: 'traffic-rail',
    code: 'TRAFFIC-RAIL',
    name: {
      zh: '铁路 / 高铁',
      en: 'Rail / High-Speed Rail',
      ja: '鉄道 / 高速鉄道',
      ko: '철도 / 고속철도',
      th: 'รถไฟ / รถไฟความเร็วสูง',
    },
  },
  {
    id: 'traffic-flight',
    code: 'TRAFFIC-FLIGHT',
    name: {
      zh: '国内航班',
      en: 'Domestic Flight',
      ja: '国内線',
      ko: '국내선 항공',
      th: 'เที่ยวบินภายในประเทศ',
    },
  },
  {
    id: 'traffic-bus',
    code: 'TRAFFIC-BUS',
    name: {
      zh: '城际巴士',
      en: 'Intercity Bus',
      ja: '都市間バス',
      ko: '시외버스',
      th: 'รถบัสระหว่างเมือง',
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

export const STANDARD_SPEC_INFOS: StandardSpecInfoItem[] = [
  {
    id: 'standard-voltage-100v-50hz',
    code: 'VOLTAGE4810297356',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('100V / 50Hz'),
    description: {
      zh: '日本东部等地区常见的低压制式，单电压设备需确认兼容性。',
      en: 'Low-voltage standard seen in eastern Japan and similar areas; single-voltage devices should be checked for compatibility.',
      ja: '東日本などで見られる低電圧規格です。単一電圧機器は互換性を確認してください。',
      ko: '일본 동부 등에서 볼 수 있는 저전압 규격으로 단일 전압 기기는 호환성을 확인해야 합니다.',
      th: 'มาตรฐานแรงดันต่ำที่พบในญี่ปุ่นตะวันออกและพื้นที่ใกล้เคียง ควรตรวจสอบอุปกรณ์แรงดันเดียวก่อนใช้งาน',
    },
  },
  {
    id: 'standard-voltage-100v-60hz',
    code: 'VOLTAGE7306159842',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('100V / 60Hz'),
    description: {
      zh: '日本西部等地区常见的低压制式，频率相关设备需额外关注。',
      en: 'Low-voltage standard seen in western Japan and similar areas; frequency-sensitive devices need extra attention.',
      ja: '西日本などで見られる低電圧規格です。周波数に敏感な機器は注意が必要です。',
      ko: '일본 서부 등에서 볼 수 있는 저전압 규격으로 주파수 민감 기기는 추가 확인이 필요합니다.',
      th: 'มาตรฐานแรงดันต่ำที่พบในญี่ปุ่นตะวันตกและพื้นที่ใกล้เคียง อุปกรณ์ที่ไวต่อความถี่ควรตรวจสอบเป็นพิเศษ',
    },
  },
  {
    id: 'standard-voltage-110v-60hz',
    code: 'VOLTAGE2947610583',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('110V / 60Hz'),
    description: {
      zh: '北美、加勒比及部分亚洲目的地常见，可能需要电压转换器。',
      en: 'Common in North America, the Caribbean, and parts of Asia; a voltage converter may be required.',
      ja: '北米、カリブ海地域、アジアの一部で一般的です。電圧変換器が必要な場合があります。',
      ko: '북미, 카리브해 및 아시아 일부 지역에서 일반적이며 전압 변환기가 필요할 수 있습니다.',
      th: 'พบได้ในอเมริกาเหนือ แคริบเบียน และบางพื้นที่ของเอเชีย อาจต้องใช้อุปกรณ์แปลงแรงดัน',
    },
  },
  {
    id: 'standard-voltage-115v-60hz',
    code: 'VOLTAGE8651203947',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('115V / 60Hz'),
    description: {
      zh: '部分美洲、加勒比及岛屿地区可见，按目的地实际供电确认。',
      en: 'Seen in parts of the Americas, Caribbean, and island destinations; confirm against the destination supply.',
      ja: '米州、カリブ海地域、島しょ部の一部で見られます。目的地の実際の供給を確認してください。',
      ko: '미주, 카리브해 및 섬 지역 일부에서 볼 수 있으며 목적지 실제 공급 기준을 확인하세요.',
      th: 'พบได้ในบางพื้นที่ของอเมริกา แคริบเบียน และเกาะต่าง ๆ ควรตรวจสอบไฟฟ้าจริงของปลายทาง',
    },
  },
  {
    id: 'standard-voltage-120v-60hz',
    code: 'VOLTAGE5093841762',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('120V / 60Hz'),
    description: {
      zh: '美国、加拿大、墨西哥等目的地常见，常与 A/B 型插头搭配。',
      en: 'Common in the United States, Canada, Mexico, and similar destinations; often paired with Type A/B plugs.',
      ja: '米国、カナダ、メキシコなどで一般的で、A/B タイプのプラグと組み合わせられます。',
      ko: '미국, 캐나다, 멕시코 등에서 일반적이며 A/B 타입 플러그와 함께 사용됩니다.',
      th: 'พบได้ทั่วไปในสหรัฐอเมริกา แคนาดา เม็กซิโก และพื้นที่ใกล้เคียง มักใช้กับปลั๊กประเภท A/B',
    },
  },
  {
    id: 'standard-voltage-127v-60hz',
    code: 'VOLTAGE1472609358',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('127V / 60Hz'),
    description: {
      zh: '巴西、墨西哥等部分地区可见，需与当地城市供电标准核对。',
      en: 'Seen in parts of Brazil, Mexico, and similar regions; verify against the city-level supply standard.',
      ja: 'ブラジル、メキシコなどの一部地域で見られます。都市単位の供給規格を確認してください。',
      ko: '브라질, 멕시코 등 일부 지역에서 볼 수 있으며 도시별 공급 기준을 확인해야 합니다.',
      th: 'พบได้ในบางพื้นที่ของบราซิล เม็กซิโก และภูมิภาคใกล้เคียง ควรตรวจสอบมาตรฐานไฟฟ้าระดับเมือง',
    },
  },
  {
    id: 'standard-voltage-220v-50hz',
    code: 'VOLTAGE6925038147',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('220V / 50Hz'),
    description: {
      zh: '中国、欧洲、东南亚及多地常见，游客需确认设备是否支持 220V 输入。',
      en: 'Common in China, Europe, Southeast Asia, and many regions; travelers should confirm 220V input support.',
      ja: '中国、欧州、東南アジアなど多くの地域で一般的です。220V 入力対応を確認してください。',
      ko: '중국, 유럽, 동남아 등 여러 지역에서 일반적이며 220V 입력 지원 여부를 확인해야 합니다.',
      th: 'พบได้ทั่วไปในจีน ยุโรป เอเชียตะวันออกเฉียงใต้ และหลายภูมิภาค ควรตรวจสอบว่าอุปกรณ์รองรับ 220V หรือไม่',
    },
  },
  {
    id: 'standard-voltage-220v-60hz',
    code: 'VOLTAGE3187462059',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('220V / 60Hz'),
    description: {
      zh: '韩国、菲律宾、秘鲁等目的地可见，频率敏感设备需确认兼容。',
      en: 'Seen in South Korea, the Philippines, Peru, and similar destinations; frequency-sensitive devices should be checked.',
      ja: '韓国、フィリピン、ペルーなどで見られます。周波数に敏感な機器は互換性を確認してください。',
      ko: '한국, 필리핀, 페루 등에서 볼 수 있으며 주파수 민감 기기는 호환성을 확인해야 합니다.',
      th: 'พบได้ในเกาหลีใต้ ฟิลิปปินส์ เปรู และปลายทางใกล้เคียง อุปกรณ์ที่ไวต่อความถี่ควรตรวจสอบความเข้ากันได้',
    },
  },
  {
    id: 'standard-voltage-230v-50hz',
    code: 'VOLTAGE9541806273',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('230V / 50Hz'),
    description: {
      zh: '欧洲、非洲、大洋洲及多数 230V 国家常见，是全球高压制式主流之一。',
      en: 'Common across Europe, Africa, Oceania, and many 230V countries; one of the dominant higher-voltage systems.',
      ja: '欧州、アフリカ、オセアニア、多くの 230V 採用国で一般的な高電圧系統です。',
      ko: '유럽, 아프리카, 오세아니아 및 다수의 230V 국가에서 일반적인 고전압 체계입니다.',
      th: 'พบได้ทั่วไปในยุโรป แอฟริกา โอเชียเนีย และหลายประเทศที่ใช้ 230V เป็นระบบแรงดันสูงหลัก',
    },
  },
  {
    id: 'standard-voltage-230v-60hz',
    code: 'VOLTAGE2768490315',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('230V / 60Hz'),
    description: {
      zh: '少数 230V 地区采用 60Hz，建议按国家和城市明细确认。',
      en: 'Used by a smaller set of 230V regions with 60Hz; confirm by country and city details.',
      ja: '一部の 230V 地域で 60Hz が使われます。国・都市別の詳細を確認してください。',
      ko: '일부 230V 지역에서 60Hz를 사용하므로 국가 및 도시별 세부 정보를 확인하세요.',
      th: 'ใช้ในบางพื้นที่ที่เป็น 230V และ 60Hz ควรตรวจสอบรายละเอียดตามประเทศและเมือง',
    },
  },
  {
    id: 'standard-voltage-240v-50hz',
    code: 'VOLTAGE8031597462',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('240V / 50Hz'),
    description: {
      zh: '英国、澳大利亚、新西兰及相关地区常见，常与 G/I 型插头搭配。',
      en: 'Common in the United Kingdom, Australia, New Zealand, and related regions; often paired with Type G/I plugs.',
      ja: '英国、オーストラリア、ニュージーランドなどで一般的で、G/I タイプのプラグと組み合わせられます。',
      ko: '영국, 호주, 뉴질랜드 등에서 일반적이며 G/I 타입 플러그와 함께 사용되는 경우가 많습니다.',
      th: 'พบได้ทั่วไปในสหราชอาณาจักร ออสเตรเลีย นิวซีแลนด์ และพื้นที่เกี่ยวข้อง มักใช้กับปลั๊กประเภท G/I',
    },
  },
  {
    id: 'standard-voltage-240v-60hz',
    code: 'VOLTAGE4217063985',
    type: STANDARD_SPEC_TYPE_VOLTAGE,
    parameter: createUniformSpecText('240V / 60Hz'),
    description: {
      zh: '少数美洲和加勒比地区可见，需结合目的地插头和设备输入范围确认。',
      en: 'Seen in a small number of Americas and Caribbean destinations; confirm with plug type and device input range.',
      ja: '米州やカリブ海地域の一部で見られます。プラグ形状と機器入力範囲を合わせて確認してください。',
      ko: '미주 및 카리브해 일부 지역에서 볼 수 있으며 플러그 유형과 기기 입력 범위를 함께 확인하세요.',
      th: 'พบได้ในบางปลายทางในอเมริกาและแคริบเบียน ควรตรวจสอบร่วมกับประเภทปลั๊กและช่วงอินพุตของอุปกรณ์',
    },
  },
  {
    id: 'standard-plug-type-a',
    code: 'PLUG6049182735',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('A'),
    description: {
      zh: '两扁脚无接地插头，常见于北美、日本、中国台湾等目的地。',
      en: 'Two flat pins without grounding, common in North America, Japan, Taiwan, and similar destinations.',
      ja: '接地なしの平行2本ピンで、北米、日本、台湾などで一般的です。',
      ko: '접지가 없는 납작한 2핀 플러그로 북미, 일본, 대만 등에서 일반적입니다.',
      th: 'ปลั๊กขาแบนสองขาไม่มีสายดิน พบได้ทั่วไปในอเมริกาเหนือ ญี่ปุ่น ไต้หวัน และปลายทางใกล้เคียง',
    },
  },
  {
    id: 'standard-plug-type-b',
    code: 'PLUG9274051863',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('B'),
    description: {
      zh: '两扁脚加圆形接地脚，常见于北美、日本部分接地插座。',
      en: 'Two flat pins plus a round grounding pin, common in North America and grounded Japanese outlets.',
      ja: '平行2本ピンに丸型接地ピンを加えた形で、北米や日本の接地付きコンセントで一般的です。',
      ko: '납작한 2핀과 원형 접지 핀이 있는 형태로 북미와 일본의 접지 콘센트에서 일반적입니다.',
      th: 'ปลั๊กขาแบนสองขาพร้อมขากราวด์กลม พบได้ทั่วไปในอเมริกาเหนือและเต้ารับมีกราวด์ของญี่ปุ่น',
    },
  },
  {
    id: 'standard-plug-type-c',
    code: 'PLUG3158704926',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('C'),
    description: {
      zh: '两圆脚欧规插头，广泛用于欧洲、亚洲、非洲和南美多地。',
      en: 'Two round pins, widely used across Europe, Asia, Africa, and parts of South America.',
      ja: '丸型2本ピンの欧州系プラグで、欧州、アジア、アフリカ、南米の一部で広く使われます。',
      ko: '둥근 2핀 유럽식 플러그로 유럽, 아시아, 아프리카, 남미 일부에서 널리 사용됩니다.',
      th: 'ปลั๊กขากลมสองขาแบบยุโรป ใช้แพร่หลายในยุโรป เอเชีย แอฟริกา และบางพื้นที่ของอเมริกาใต้',
    },
  },
  {
    id: 'standard-plug-type-d',
    code: 'PLUG7482916053',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('D'),
    description: {
      zh: '三圆脚大三角布局，常见于印度、尼泊尔、斯里兰卡等地区。',
      en: 'Three round pins in a large triangular layout, common in India, Nepal, Sri Lanka, and similar regions.',
      ja: '大きな三角配置の丸型3本ピンで、インド、ネパール、スリランカなどで一般的です。',
      ko: '큰 삼각형 배열의 둥근 3핀 플러그로 인도, 네팔, 스리랑카 등에서 일반적입니다.',
      th: 'ปลั๊กขากลมสามขาแบบสามเหลี่ยมขนาดใหญ่ พบได้ทั่วไปในอินเดีย เนปาล ศรีลังกา และพื้นที่ใกล้เคียง',
    },
  },
  {
    id: 'standard-plug-type-e',
    code: 'PLUG1865309742',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('E'),
    description: {
      zh: '法式接地插座系统，两圆脚并使用插座接地针。',
      en: 'French-style grounded socket system with two round pins and a socket earth pin.',
      ja: '丸型2本ピンとコンセント側の接地ピンを使うフランス式接地システムです。',
      ko: '둥근 2핀과 콘센트 접지 핀을 사용하는 프랑스식 접지 시스템입니다.',
      th: 'ระบบเต้ารับมีกราวด์แบบฝรั่งเศส ใช้ขากลมสองขาและขากราวด์ที่เต้ารับ',
    },
  },
  {
    id: 'standard-plug-type-f',
    code: 'PLUG5397026814',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('F'),
    description: {
      zh: 'Schuko 侧边接地夹系统，常见于德国、西班牙、荷兰等欧洲国家。',
      en: 'Schuko side-grounding system, common in Germany, Spain, the Netherlands, and other European countries.',
      ja: '側面接地クリップを持つ Schuko 系で、ドイツ、スペイン、オランダなどで一般的です。',
      ko: '측면 접지 클립을 사용하는 Schuko 방식으로 독일, 스페인, 네덜란드 등에서 일반적입니다.',
      th: 'ระบบ Schuko ที่มีคลิปกราวด์ด้านข้าง พบได้ทั่วไปในเยอรมนี สเปน เนเธอร์แลนด์ และยุโรปหลายประเทศ',
    },
  },
  {
    id: 'standard-plug-type-g',
    code: 'PLUG2704185963',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('G'),
    description: {
      zh: '三矩形脚英规插头，常见于英国、爱尔兰、新加坡、马来西亚等地。',
      en: 'British three rectangular pins, common in the United Kingdom, Ireland, Singapore, Malaysia, and similar destinations.',
      ja: '英国式の長方形3本ピンで、英国、アイルランド、シンガポール、マレーシアなどで一般的です。',
      ko: '영국식 직사각형 3핀 플러그로 영국, 아일랜드, 싱가포르, 말레이시아 등에서 일반적입니다.',
      th: 'ปลั๊กอังกฤษขาสี่เหลี่ยมสามขา พบได้ทั่วไปในสหราชอาณาจักร ไอร์แลนด์ สิงคโปร์ มาเลเซีย และพื้นที่ใกล้เคียง',
    },
  },
  {
    id: 'standard-plug-type-h',
    code: 'PLUG8619357402',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('H'),
    description: {
      zh: '以色列标准插头，现代版本为三圆脚布局。',
      en: 'Israeli standard plug, with the modern version using three round pins.',
      ja: 'イスラエル標準のプラグで、現行型は丸型3本ピンです。',
      ko: '이스라엘 표준 플러그로 현대식은 둥근 3핀 구조입니다.',
      th: 'ปลั๊กมาตรฐานอิสราเอล รุ่นปัจจุบันใช้ขากลมสามขา',
    },
  },
  {
    id: 'standard-plug-type-i',
    code: 'PLUG4937201586',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('I'),
    description: {
      zh: '两斜扁脚或三脚布局，常见于澳大利亚、新西兰、中国、阿根廷等地。',
      en: 'Two angled flat pins or grounded three-pin layout, common in Australia, New Zealand, China, Argentina, and similar destinations.',
      ja: '斜めの平型2本ピンまたは接地付き3本ピンで、オーストラリア、ニュージーランド、中国、アルゼンチンなどで一般的です。',
      ko: '비스듬한 납작 2핀 또는 접지형 3핀 구조로 호주, 뉴질랜드, 중국, 아르헨티나 등에서 일반적입니다.',
      th: 'ปลั๊กขาแบนเอียงสองขาหรือสามขาพร้อมกราวด์ พบได้ทั่วไปในออสเตรเลีย นิวซีแลนด์ จีน อาร์เจนตินา และพื้นที่ใกล้เคียง',
    },
  },
  {
    id: 'standard-plug-type-j',
    code: 'PLUG7081649352',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('J'),
    description: {
      zh: '瑞士标准三圆脚插头，接地脚偏移。',
      en: 'Swiss three round-pin standard with an offset grounding pin.',
      ja: 'スイス標準の丸型3本ピンで、接地ピンがオフセットされています。',
      ko: '스위스 표준 둥근 3핀 플러그로 접지 핀이 어긋나 있습니다.',
      th: 'ปลั๊กมาตรฐานสวิตเซอร์แลนด์แบบขากลมสามขา โดยขากราวด์เยื้องตำแหน่ง',
    },
  },
  {
    id: 'standard-plug-type-k',
    code: 'PLUG1425978036',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('K'),
    description: {
      zh: '丹麦标准插头，两圆脚并带独立接地脚。',
      en: 'Danish standard with two round pins and a separate grounding pin.',
      ja: 'デンマーク標準で、丸型2本ピンと独立した接地ピンを持ちます。',
      ko: '덴마크 표준으로 둥근 2핀과 별도 접지 핀이 있습니다.',
      th: 'ปลั๊กมาตรฐานเดนมาร์ก มีขากลมสองขาและขากราวด์แยกต่างหาก',
    },
  },
  {
    id: 'standard-plug-type-l',
    code: 'PLUG6753082914',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('L'),
    description: {
      zh: '意大利标准三圆脚直线布局，常见 10A 与 16A 两种规格。',
      en: 'Italian three round pins in a straight line, commonly available in 10A and 16A variants.',
      ja: 'イタリア標準の直線配置の丸型3本ピンで、10A と 16A の仕様があります。',
      ko: '이탈리아 표준 일렬 둥근 3핀 플러그로 10A와 16A 변형이 일반적입니다.',
      th: 'ปลั๊กมาตรฐานอิตาลีแบบขากลมสามขาเรียงตรง มีรุ่น 10A และ 16A ใช้ทั่วไป',
    },
  },
  {
    id: 'standard-plug-type-m',
    code: 'PLUG8305261479',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('M'),
    description: {
      zh: '大型三圆脚插头，常见于南非、印度部分高功率场景。',
      en: 'Large three round-pin plug, common in South Africa and some high-power use cases in India.',
      ja: '大型の丸型3本ピンで、南アフリカやインドの一部高出力用途で使われます。',
      ko: '큰 둥근 3핀 플러그로 남아프리카와 인도 일부 고출력 용도에서 사용됩니다.',
      th: 'ปลั๊กขากลมสามขาขนาดใหญ่ พบในแอฟริกาใต้และงานกำลังไฟสูงบางกรณีในอินเดีย',
    },
  },
  {
    id: 'standard-plug-type-n',
    code: 'PLUG2597416803',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('N'),
    description: {
      zh: '巴西及 IEC 60906-1 相关三圆脚标准，亦用于南非新标准场景。',
      en: 'Brazilian and IEC 60906-1-related three round-pin standard, also used in newer South African installations.',
      ja: 'ブラジルおよび IEC 60906-1 系の丸型3本ピン規格で、南アフリカの新しい設備でも使われます。',
      ko: '브라질 및 IEC 60906-1 관련 둥근 3핀 표준으로 남아프리카의 신규 설비에서도 사용됩니다.',
      th: 'มาตรฐานขากลมสามขาของบราซิลและกลุ่ม IEC 60906-1 ใช้ในระบบใหม่บางส่วนของแอฟริกาใต้ด้วย',
    },
  },
  {
    id: 'standard-plug-type-o',
    code: 'PLUG5170398624',
    type: STANDARD_SPEC_TYPE_PLUG,
    parameter: createPlugParameter('O'),
    description: {
      zh: '泰国 TIS 166-2549 标准，兼容两脚或三脚使用场景需按插座确认。',
      en: 'Thai TIS 166-2549 standard; two-pin and three-pin compatibility should be confirmed by socket.',
      ja: 'タイの TIS 166-2549 規格です。2ピン/3ピンの互換性はコンセントで確認してください。',
      ko: '태국 TIS 166-2549 표준으로 2핀 및 3핀 호환성은 콘센트 기준으로 확인해야 합니다.',
      th: 'มาตรฐานไทย TIS 166-2549 ความเข้ากันได้ของปลั๊กสองขาและสามขาควรตรวจสอบตามเต้ารับ',
    },
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

export const EMERGENCY_HANDLING_INFOS: EmergencyHandlingInfoItem[] = [
  {
    id: 'emergency-general',
    code: 'EMERGENCY-GENERAL',
    policeEmergency: {
      zh: '遇到盗抢、人身威胁或证件遗失，应立即联系当地警方并保留报案记录。',
      en: 'For theft, personal threats, or lost documents, contact local police immediately and keep the police report.',
      ja: '盗難、身の危険、証明書紛失時は直ちに現地警察へ連絡し、届出記録を保管してください。',
      ko: '절도, 신변 위협, 서류 분실 시 즉시 현지 경찰에 연락하고 신고 기록을 보관하세요.',
      th: 'หากถูกโจรกรรม ถูกคุกคาม หรือเอกสารหาย ควรติดต่อ ตำรวจ ทันทีและเก็บบันทึกการแจ้งความไว้',
    },
    fireEmergency: {
      zh: '遇到火情、爆炸或建筑疏散，应优先离开危险区域，再联系消防或酒店/场馆工作人员。',
      en: 'For fire, explosion, or building evacuation, leave the danger area first, then contact fire services or venue staff.',
      ja: '火災、爆発、建物避難時はまず危険区域から離れ、消防または施設スタッフへ連絡してください。',
      ko: '화재, 폭발, 건물 대피 상황에서는 먼저 위험 지역을 벗어난 뒤 소방 또는 시설 직원에게 연락하세요.',
      th: 'เมื่อเกิดเหตุไฟไหม้ ระเบิด หรืออพยพอาคาร ให้ออกจากพื้นที่เสี่ยงก่อน แล้วติดต่อดับเพลิงหรือเจ้าหน้าที่สถานที่',
    },
  },
]
