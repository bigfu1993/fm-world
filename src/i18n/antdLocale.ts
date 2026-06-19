import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import koKR from 'antd/locale/ko_KR'
import thTH from 'antd/locale/th_TH'
import type { Locale } from 'antd/es/locale'
import type { LanguageCode } from '@/types/system'

export const ANTD_LOCALES: Record<LanguageCode, Locale> = {
  zh: zhCN,
  en: enUS,
  ja: jaJP,
  ko: koKR,
  th: thTH,
}
