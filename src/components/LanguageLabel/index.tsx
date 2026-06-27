import type { LanguageCode } from '@/types/system';
import { labelMap, type LabelKey } from './LabelMap';

type LanguageLabelDirection = 'row' | 'col';

interface LanguageLabelProps {
  langKey?: LanguageCode;
  labelKey: LabelKey;
  fontSize?: number;
  direction?: LanguageLabelDirection;
}

export default function LanguageLabel({
  langKey,
  labelKey,
  fontSize,
  direction = 'row',
}: LanguageLabelProps) {
  const labels = labelMap[labelKey];
  const mainFontSize = fontSize ?? 12;
  const subFontSize = fontSize ? Math.max(fontSize - 2, 8) : 10;
  if (!langKey || langKey === 'en') {
    return <span style={{ fontWeight: 600, fontSize }}>{labels.en}</span>;
  }
  const isColumnDirection = direction === 'col';
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: isColumnDirection ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: isColumnDirection ? 1.1 : undefined,
        textAlign: isColumnDirection ? 'center' : undefined,
      }}
    >
      <span
        style={{
          fontWeight: 600,
          fontSize: mainFontSize,
          marginRight: isColumnDirection ? 0 : 5,
          marginBottom: isColumnDirection ? 2 : 0,
        }}
      >
        {labels[langKey]}
      </span>
      <span
        style={{
          color: 'inherit',
          fontSize: subFontSize,
          opacity: 0.7,
        }}
      >
        {labels.en}
      </span>
    </span>
  );
}
