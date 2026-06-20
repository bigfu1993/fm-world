import type { LanguageCode } from '@/types/system';
import { labelMap, type LabelKey } from './LabelMap';

interface LanguageLabelProps {
  langKey?: LanguageCode;
  labelKey: LabelKey;
  fontSize?: number;
}

export default function LanguageLabel({
  langKey,
  labelKey,
  fontSize,
}: LanguageLabelProps) {
  const labels = labelMap[labelKey];
  const mainFontSize = fontSize ?? 12;
  const subFontSize = fontSize ? Math.max(fontSize - 2, 8) : 10;
  if (!langKey || langKey === 'en') {
    return <span style={{ fontWeight: 600, fontSize }}>{labels.en}</span>;
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ fontWeight: 600, fontSize: mainFontSize, marginRight: '5px' }}>
        {labels[langKey]}
      </span>
      <span
        style={{
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: subFontSize,
        }}
      >
        {labels.en}
      </span>
    </span>
  );
}
