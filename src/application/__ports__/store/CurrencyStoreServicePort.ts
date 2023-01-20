import { Currency } from '@/domain/currency/types/Currency';

export type CurrencyStoreServicePort = {
  getCurrency: () => Currency;
  setCurrency: (currency: Currency) => void;
  clearState: () => void;
};
