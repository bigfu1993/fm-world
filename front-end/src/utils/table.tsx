import type { ReactNode } from 'react';

export const TABLE_EMPTY_PLACEHOLDER = '-';

export function renderTableEmptyPlaceholder(value: ReactNode): ReactNode {
  if (value === null || value === undefined) return TABLE_EMPTY_PLACEHOLDER;
  if (typeof value === 'string' && !value.trim()) {
    return TABLE_EMPTY_PLACEHOLDER;
  }
  if (Array.isArray(value) && value.length === 0) {
    return TABLE_EMPTY_PLACEHOLDER;
  }
  return value;
}
