import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { FlightOrderDetailsStoreServicePort } from '@/application/__ports__/store/FlightOrderDetailsStoreServicePort';
import { FlightOrderDetails } from '@/domain/order/types/FlightOrderDetails';
import { FlightOrderDetailsState } from './types';

const defaultState: FlightOrderDetailsState = null;

const store = atom<FlightOrderDetailsState>({
  key: 'FlightOrderDetails',
  default: defaultState,
});

export const useFlightOrderDetailsStoreService = (): FlightOrderDetailsStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getOrder = useCallback(() => state, [state]);

  const setOrder = useCallback((order: FlightOrderDetails) => setState(order), [setState]);

  const clearState = useCallback(() => setState(defaultState), [setState]);

  return {
    getOrder,
    setOrder,
    clearState,
  };
};
