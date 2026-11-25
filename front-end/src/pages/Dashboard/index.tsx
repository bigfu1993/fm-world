import { Card } from 'antd';
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore';
import type { LanguageCode } from '@/types/system';
import LanguageLabel from '@/components/LanguageLabel';

const GREETINGS: Record<LanguageCode, { title: string; desc: string }> = {
  zh: {
    title: '欢迎使用 finger-more-admin',
    desc: '这里是后台首页，按需替换为实际的统计卡片、图表等内容。',
  },
  en: {
    title: 'Welcome to finger-more-admin',
    desc: 'This is the admin home page, replace with real dashboard widgets as needed.',
  },
  ja: {
    title: 'finger-more-admin へようこそ',
    desc: 'ここは管理画面のホームです。必要に応じて実際の統計カードに置き換えてください。',
  },
  ko: {
    title: 'finger-more-admin에 오신 것을 환영합니다',
    desc: '여기는 관리자 홈 화면입니다. 필요에 따라 실제 통계 카드로 교체하세요.',
  },
  th: {
    title: 'ยินดีต้อนรับสู่ finger-more-admin',
    desc: 'นี่คือหน้าหลักของระบบหลังบ้าน สามารถแทนที่ด้วยการ์ดสถิติจริงได้ตามต้องการ',
  },
};

export default function Dashboard() {
  const language = useAuthStore(selectCurrentLanguage);
  const { title, desc } = GREETINGS[language];

  return (
    <Card
      title={title}
      extra={<LanguageLabel langKey={language} labelKey="dashboard" />}
    >
      <p>{desc}</p>
      <LanguageLabel labelKey="logout" />
    </Card>
  );
}
