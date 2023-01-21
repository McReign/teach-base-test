import format from 'date-fns/format';

export function toDisplayDateTime(date: Date | number | string): string {
  return format(new Date(date), 'MMM dd, HH:mm');
}
