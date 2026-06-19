import type { LanguageCode } from '@/types/system';

interface LanguageTextProps {
  langKey?: LanguageCode;
  map: Record<string, string>;
}

export default function LanguageText({ langKey, map }: LanguageTextProps) {
  if (!langKey || langKey === 'en') {
    return <span style={{ fontWeight: 600 }}>{map.en}</span>;
  }
  return (
    <span>
      <span style={{ fontWeight: 600, fontSize: 12, marginRight: '5px' }}>
        {map[langKey]}
      </span>
      <span
        style={{
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: 10,
        }}
      >
        {map.en}
      </span>
    </span>
  );
}
