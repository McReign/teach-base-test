import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { CurrencyStoreServicePort } from '@/application/__ports__/store/CurrencyStoreServicePort';
import { Currency } from '@/domain/currency/types/Currency';
import { CurrencyState } from './types';

const defaultState: CurrencyState = 'usd';

const store = atom<CurrencyState>({
  key: 'Currency',
  default: defaultState,
});

export const useCurrencyStoreService = (): CurrencyStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getCurrency = useCallback(() => state, [state]);

  const setCurrency = useCallback((currency: Currency) => setState(currency), [setState]);

  const clearState = useCallback(() => setState(defaultState), [setState]);

  return {
    getCurrency,
    setCurrency,
    clearState,
  };
};
