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
  plugStandard: LocalizedInfoText
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

export const STANDARD_SPEC_INFOS: StandardSpecInfoItem[] = [
  {
    id: 'standard-plug-basic',
    code: 'STANDARD-PLUG',
    plugStandard: {
      zh: '维护目的地常用插头类型、电压频率和是否需要转换插头。',
      en: 'Maintain common plug types, voltage/frequency, and whether a travel adapter is required.',
      ja: '目的地で一般的なプラグ形状、電圧・周波数、変換プラグ要否を管理します。',
      ko: '목적지의 일반적인 플러그 유형, 전압/주파수, 변환 플러그 필요 여부를 관리합니다.',
      th: 'บันทึกประเภทปลั๊กที่ใช้ทั่วไป แรงดัน/ความถี่ และความจำเป็นในการใช้อะแดปเตอร์',
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
