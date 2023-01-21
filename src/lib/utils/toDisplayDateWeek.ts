import format from 'date-fns/format';

export function toDisplayDateWeek(date: Date | number | string): string {
  return format(new Date(date), 'MMM dd, EEE');
}
