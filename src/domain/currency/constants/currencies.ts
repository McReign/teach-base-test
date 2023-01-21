import { Currency } from '@/domain/currency/types/Currency';
import { CurrencyRecord } from '@/domain/currency/types/CurrencyRecord';

export const CURRENCIES: Record<Currency, CurrencyRecord> = {
  usd: {
    label: 'USD',
    sign: '$',
  },
};
