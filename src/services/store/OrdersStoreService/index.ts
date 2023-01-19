import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { OrdersStoreServicePort } from '@/application/__ports__/store/OrdersStoreServicePort';
import { Order } from '@/domain/order/types/Order';
import { OrdersState } from './types';

const defaultState: OrdersState = {
  orders: null,
  search: '',
};

const store = atom<OrdersState>({
  key: 'Orders',
  default: defaultState,
});

export const useOrdersStoreService = (): OrdersStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getOrders = useCallback(() => state.orders, [state]);

  const setOrders = useCallback((orders: Order[]) => setState((prev) => ({ ...prev, orders })), [setState]);

  const getSearch = useCallback(() => state.search, [state]);

  const setSearch = useCallback((search: string) => setState((prev) => ({ ...prev, search })), [setState]);

  const clearState = useCallback(() => setState(defaultState), [setState]);

  return {
    getOrders,
    setOrders,
    getSearch,
    setSearch,
    clearState,
  };
};
