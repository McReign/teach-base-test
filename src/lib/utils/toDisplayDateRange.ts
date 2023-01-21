import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';

export function toDisplayDateRange(startDate: Date | number | string, endDate: Date | number | string): string {
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);

  if (isSameMonth(startDateObject, endDateObject)) {
    return `${format(startDateObject, 'dd')} - ${format(endDateObject, 'dd MMM')}`;
  }

  return `${format(startDateObject, 'dd MMM')} - ${format(endDateObject, 'dd MMM')}`;
}
