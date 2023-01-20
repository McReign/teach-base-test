import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { HotelOrderDetailsStoreServicePort } from '@/application/__ports__/store/HotelOrderDetailsStoreServicePort';
import { HotelOrderDetails } from '@/domain/order/types/HotelOrderDetails';
import { HotelOrderDetailsState } from './types';

const defaultState: HotelOrderDetailsState = null;

const store = atom<HotelOrderDetailsState>({
  key: 'HotelOrderDetails',
  default: defaultState,
});

export const useHotelOrderDetailsStoreService = (): HotelOrderDetailsStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getOrder = useCallback(() => state, [state]);

  const setOrder = useCallback((order: HotelOrderDetails) => setState(order), [setState]);

  const clearState = useCallback(() => setState(defaultState), [setState]);

  return {
    getOrder,
    setOrder,
    clearState,
  };
};
