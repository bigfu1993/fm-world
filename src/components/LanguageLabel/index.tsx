import type { LanguageCode } from '@/types/system';
import { labelMap, type LabelKey } from './LabelMap';

interface LanguageLabelProps {
  langKey?: LanguageCode;
  labelKey: LabelKey;
}

export default function LanguageLabel({
  langKey,
  labelKey,
}: LanguageLabelProps) {
  const labels = labelMap[labelKey];
  if (!langKey || langKey === 'en') {
    return <span style={{ fontWeight: 600 }}>{labels.en}</span>;
  }
  return (
    <span>
      <span style={{ fontWeight: 600, fontSize: 12, marginRight: '5px' }}>
        {labels[langKey]}
      </span>
      <span
        style={{
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: 10,
        }}
      >
        {labels.en}
      </span>
    </span>
  );
}
