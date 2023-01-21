import { Currency } from '@/domain/currency/types/Currency';
import { isNil } from '@/lib/utils/isNil';
import { CURRENCIES } from '@/domain/currency/constants/currencies';

export function withCurrency(value: string | number, currency: Currency): string {
  if (isNil(value)) {
    return '';
  }

  if (currency === 'usd') {
    return `${CURRENCIES[currency].sign}${value}`;
  }

  return `${value}`;
}
